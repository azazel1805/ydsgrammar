import admin from 'firebase-admin';

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

function generateSimpleCode(prefix = 'YDS') {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; 
    let code = `${prefix}-`;
    for(let i=0; i<4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    code += '-';
    for(let i=0; i<4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    return code;
}

export const handler = async (event, context) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
    };

    if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };

    try {
        const body = event.body ? JSON.parse(event.body) : {};
        const { email, action } = body;

        const admins = ["onurtosuner@gmail.com", "hasanonurtosuner@gmail.com"];
        if (!email || !admins.includes(email)) {
            return { statusCode: 403, headers, body: "Unauthorized" };
        }

        // ACTION: SEED
        if (action === "seed") {
            const types = [
                { name: 'monthly', days: 30, prefix: 'MON' },
                { name: 'seasonal', days: 90, prefix: 'SEA' },
                { name: 'yearly', days: 365, prefix: 'YDS' }
            ];

            const batch = db.batch();
            for (const type of types) {
                for (let i = 0; i < 5; i++) {
                    const code = generateSimpleCode(type.prefix);
                    const ref = db.collection('promo_codes').doc(code);
                    batch.set(ref, {
                        used: false,
                        days: type.days,
                        package: type.name,
                        createdAt: admin.firestore.FieldValue.serverTimestamp()
                    });
                }
            }
            await batch.commit();
            return { statusCode: 200, headers, body: JSON.stringify({ success: true, message: "15 yeni kod üretildi." }) };
        }

        // ACTION: MARK SENT (Used manually)
        if (action === "mark_sent") {
            const { codeId } = body;
            if (!codeId) return { statusCode: 400, headers, body: "Missing codeId" };
            
            await db.collection('promo_codes').doc(codeId).update({
                used: true,
                usedAt: admin.firestore.FieldValue.serverTimestamp(),
                usedBy: "ADMIN_SENT",
                isSent: true
            });
            
            return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
        }

        // ACTION: ACTIVATE USER (Manual Premium Activation)
        if (action === "activate_user") {
            const { targetEmail, packageType } = body;
            if (!targetEmail || !packageType) {
                return { statusCode: 400, headers, body: "Email ve paket tipi gerekli." };
            }

            const daysMap = { 'monthly': 30, 'seasonal': 90, 'yearly': 365 };
            const daysToAdd = daysMap[packageType] || 365;

            const usersRef = db.collection('users');
            const q = usersRef.where('email', 'in', [
                targetEmail.trim().toLowerCase(),
                targetEmail.trim().toUpperCase(),
                targetEmail.trim()
            ]).limit(1);
            
            const snapshot = await q.get();

            if (snapshot.empty) {
                return { statusCode: 404, headers, body: "Kullanıcı bulunamadı. Lütfen kullanıcının sisteme kayıtlı olduğundan emin olun." };
            }

            const userDoc = snapshot.docs[0];
            const userData = userDoc.data();
            const userId = userDoc.id;

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
                lastManualActivation: {
                    activatedBy: email,
                    date: admin.firestore.FieldValue.serverTimestamp(),
                    packageType,
                    daysAdded: daysToAdd
                }
            });

            return { 
                statusCode: 200, 
                headers, 
                body: JSON.stringify({ 
                    success: true, 
                    message: `${targetEmail} için ${daysToAdd} günlük premium aktif edildi.` 
                }) 
            };
        }

        // ACTION: FETCH (Default)
        const codesRef = db.collection('promo_codes');
        const snapshot = await codesRef.where('used', '==', false).get();
        const codes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return { statusCode: 200, headers, body: JSON.stringify(codes) };

    } catch (err) {
        console.error("Admin API Error:", err);
        return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
    }
};
