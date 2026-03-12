import admin from 'firebase-admin';

// Check if already initialized to avoid errors
if (!admin.apps.length) {
    admin.initializeApp({
        projectId: 'ydsgrammar'
    });
}

const uid = 'FoQH0Qlb2wfrk7PLe6pT8yv1LTL2';

try {
    await admin.auth().deleteUser(uid);
    console.log(`Successfully deleted user with UID: ${uid}`);
} catch (error) {
    console.error('Error deleting user:', error);
}
