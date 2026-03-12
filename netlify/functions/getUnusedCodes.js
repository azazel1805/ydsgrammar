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
    const { email } = body;

    const admins = ["onurtosuner@gmail.com", "hasanonurtosuner@gmail.com"];
    if (!email || !admins.includes(email)) {
      return { statusCode: 403, headers, body: "Unauthorized" };
    }

    const codesRef = db.collection('promo_codes');
    const snapshot = await codesRef.where('used', '==', false).get();
    
    const codes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return { 
      statusCode: 200, 
      headers, 
      body: JSON.stringify(codes) 
    };

  } catch (err) {
    console.error("GetUnusedCodes Error:", err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
