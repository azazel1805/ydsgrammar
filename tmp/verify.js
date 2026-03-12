import admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
        projectId: 'ydsgrammar'
    });
}

const db = admin.firestore();

async function check() {
    const snapshot = await db.collection('promo_codes').where('used', '==', false).get();
    console.log('Total Unused:', snapshot.size);
    snapshot.docs.slice(0, 5).forEach(doc => {
        console.log(doc.id, doc.data());
    });
    process.exit(0);
}

check();
