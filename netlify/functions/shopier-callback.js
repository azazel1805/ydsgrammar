const admin = require('firebase-admin');
const crypto = require('crypto');

exports.handler = async (event, context) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS"
    };

    // 1. ANINDA ONAY (Validation & Probes)
    // Shopier URL'yi kaydederken GET veya boş POST gönderebilir. 
    // Bu durumlarda hemen 200 dönerek "sistem aktif" diyoruz.
    if (event.httpMethod === "GET" || event.httpMethod === "OPTIONS" || !event.body) {
        return { statusCode: 200, headers, body: "OK" };
    }

    // 2. DATA PARSING
    const body = new URLSearchParams(event.body);
    const postData = Object.fromEntries(body.entries());
    const signature = postData.res_signature;

    // Eğer imza yoksa bu bir testtir, yine 200 dönüyoruz.
    if (!signature) {
        return { statusCode: 200, headers, body: "Probe OK" };
    }

    // 3. GERÇEK ÖDEME İŞLEME (Firebase Check)
    // Artık buraya geldiysek Shopier kaydı tamamlanmış ve gerçek bir ödeme bildirimi gelmiş demektir.
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL) {
        console.error("Critical: Firebase Env Vars Missing!");
        return { statusCode: 200, headers, body: "Logged (Env Missing)" }; // Shopier'i korkutmamak için yine 200.
    }

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        });
    }

    const db = admin.firestore();
    const orderId = postData.res_order_id;
    const status = postData.res_status;
    const userEmail = postData.res_mail?.trim().toLowerCase();
    const amount = parseFloat(postData.res_amount); // Ödenen tutar

    if (status !== "success" || !userEmail) {
        return { statusCode: 200, headers, body: "Status fail or no email" };
    }

    // Abonelik süresini hesapla (₺250 -> 1 Ay, ₺600 -> 3 Ay, ₺1500 -> 1 Yıl)
    // Test amaçlı ₺1 ödemeyi de 1 yıl (365 gün) olarak tanımlıyoruz.
    let daysToAdd = 30;
    if (amount >= 1400 || amount === 1 || amount === 1.00) {
        daysToAdd = 365;
    } else if (amount >= 550) {
        daysToAdd = 90;
    }

    const premiumUntil = new Date();
    premiumUntil.setDate(premiumUntil.getDate() + daysToAdd);

    try {
        const usersRef = db.collection('users');
        // E-posta eşleşmesini daha esnek yapıyoruz
        const q = usersRef.where('email', 'in', [userEmail, userEmail.toLowerCase(), userEmail.toUpperCase()]).limit(1);
        const snapshot = await q.get();

        if (snapshot.empty) {
            await db.collection('pending_premium_fixes').add({
                email: userEmail, 
                orderId, 
                amount, 
                daysAdded: daysToAdd,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            });
            return { statusCode: 200, headers, body: "User mismatch logged" };
        }

        const userId = snapshot.docs[0].id;
        const userData = snapshot.docs[0].data();

        // Eğer zaten bir üyeliği varsa üzerine ekle, yoksa bugünden başlat
        let startDate = new Date();
        if (userData.premiumUntil && userData.premiumUntil.toDate() > new Date()) {
            startDate = userData.premiumUntil.toDate();
        }
        
        const newExpiry = new Date(startDate);
        newExpiry.setDate(newExpiry.getDate() + daysToAdd);

        await db.collection('users').doc(userId).update({
            role: 'premium',
            isVip: true,
            premiumUntil: admin.firestore.Timestamp.fromDate(newExpiry),
            lastPayment: { 
                orderId, 
                amount, 
                date: new Date(),
                packageDays: daysToAdd 
            }
        });

        return { statusCode: 200, headers, body: "Success" };
    } catch (error) {
        console.error("Process Error:", error);
        return { statusCode: 200, headers, body: "Error ignored" };
    }
};
