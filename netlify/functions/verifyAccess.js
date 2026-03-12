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

export const handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const { code, email } = body;

    if (!code || !email) {
      return { statusCode: 400, headers, body: "Missing code or email" };
    }

    const promoRef = db.collection('promo_codes').doc(code);
    const promoDoc = await promoRef.get();

    if (promoDoc.exists) {
      const promoData = promoDoc.data();
      
      if (promoData.used) {
        return { statusCode: 403, headers, body: "Bu kod zaten kullanılmış." };
      }

      const usersRef = db.collection('users');
      const q = usersRef.where('email', '==', email).limit(1);
      const snapshot = await q.get();

      if (!snapshot.empty) {
        const userId = snapshot.docs[0].id;
        const days = promoData.days || 365; // Varsayılan 365 gün
        
        const premiumUntil = new Date();
        premiumUntil.setDate(premiumUntil.getDate() + days);

        await db.runTransaction(async (transaction) => {
          transaction.update(db.collection('users').doc(userId), {
            role: 'premium',
            isVip: true,
            premiumUntil: admin.firestore.Timestamp.fromDate(premiumUntil),
            activationMethod: "promo_" + code
          });
          transaction.update(promoRef, {
            used: true,
            usedBy: email,
            usedAt: admin.firestore.FieldValue.serverTimestamp()
          });
        });

        return { 
          statusCode: 200, 
          headers, 
          body: JSON.stringify({ success: true, message: `${days} Günlük VIP Tanımlandı` }) 
        };
      } else {
        return { statusCode: 404, headers, body: "Kullanıcı kaydı bulunamadı." };
      }
    }

    // Geriye dönük uyumluluk için eski yöntemleri de bırakabilirsiniz veya sadece yeni sisteme geçebilirsiniz.
    if (code === process.env.AI_SECRET_CODE) {
        // ... eski manuel kod logic'i devam edebilir
    }

    return { statusCode: 403, headers, body: "Geçersiz kod." };

  } catch (err) {
    console.error("VerifyAccess Error:", err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};

