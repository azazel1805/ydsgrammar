import admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
        projectId: 'ydsgrammar'
    });
}

const db = admin.firestore();
const targetEmail = 'hasanonurtosuner@gmail.com';

async function fixPremium() {
    try {
        console.log(`Checking for user: ${targetEmail}`);
        const userSnap = await db.collection('users').where('email', '==', targetEmail).limit(1).get();
        
        if (userSnap.empty) {
            console.log("User not found in Firestore yet. Make sure you logged in at least once.");
            return;
        }

        const userDoc = userSnap.docs[0];
        const userId = userDoc.id;

        // Force update to Premium (1 Year)
        const premiumUntil = new Date();
        premiumUntil.setFullYear(premiumUntil.getFullYear() + 1);

        await db.collection('users').doc(userId).update({
            role: 'premium',
            isVip: true,
            premiumUntil: admin.firestore.Timestamp.fromDate(premiumUntil),
            lastPayment: {
                orderId: "MANUAL_FIX_TEST",
                amount: 1,
                date: new Date(),
                packageDays: 365
            }
        });

        console.log(`SUCCESS: ${targetEmail} is now Premium until ${premiumUntil.toLocaleDateString()}`);
        
        // Clean up pending fixes if any
        const pendingSnap = await db.collection('pending_premium_fixes').where('email', '==', targetEmail).get();
        for (const doc of pendingSnap.docs) {
            await doc.ref.delete();
            console.log(`Cleaned up pending fix: ${doc.id}`);
        }

    } catch (error) {
        console.error("Fix Error:", error);
    }
}

fixPremium();
