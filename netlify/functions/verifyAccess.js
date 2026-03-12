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

    // Define 1-Year Codes (Product ID or Secret Code)
    const yearCodes = ["45156537", process.env.AI_SECRET_CODE, "YDS2026"];
    
    if (yearCodes.includes(code)) {
      const usersRef = db.collection('users');
      const q = usersRef.where('email', '==', email).limit(1);
      const snapshot = await q.get();

      if (!snapshot.empty) {
        const userId = snapshot.docs[0].id;
        const premiumUntil = new Date();
        premiumUntil.setFullYear(premiumUntil.getFullYear() + 1); // 1 Year

        await db.collection('users').doc(userId).update({
          role: 'premium',
          isVip: true,
          premiumUntil: admin.firestore.Timestamp.fromDate(premiumUntil),
          activationMethod: "code_" + code
        });

        return { 
          statusCode: 200, 
          headers, 
          body: JSON.stringify({ success: true, message: "1 Year Premium Activated" }) 
        };
      } else {
        return { statusCode: 404, headers, body: "User not found in Firestore" };
      }
    }

    return { statusCode: 403, headers, body: "Invalid code" };
  } catch (err) {
    console.error("VerifyAccess Error:", err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};

