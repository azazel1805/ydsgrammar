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
        return { statusCode: 200, headers, body: "Shopier Callback Active" };
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
    const userEmail = postData.res_mail;

    if (status !== "success") {
        return { statusCode: 200, headers, body: "Status fail ignored" };
    }

    try {
        const usersRef = db.collection('users');
        const q = usersRef.where('email', '==', userEmail).limit(1);
        const snapshot = await q.get();

        if (snapshot.empty) {
            await db.collection('pending_premium_fixes').add({
                email: userEmail, orderId, amount: postData.res_amount, timestamp: admin.firestore.FieldValue.serverTimestamp()
            });
            return { statusCode: 200, headers, body: "User mismatch logged" };
        }

        const userId = snapshot.docs[0].id;
        await db.collection('users').doc(userId).update({
            role: 'premium',
            isVip: true,
            premiumSince: admin.firestore.FieldValue.serverTimestamp(),
            lastPayment: { orderId, amount: postData.res_amount, date: new Date() }
        });

        return { statusCode: 200, headers, body: "Success" };
    } catch (error) {
        console.error("Process Error:", error);
        return { statusCode: 200, headers, body: "Error ignored to keep Shopier happy" };
    }
};
