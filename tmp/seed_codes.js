import admin from 'firebase-admin';

// Google Cloud / Firebase credentials is best but we can use projectId if ADC is set
if (!admin.apps.length) {
    admin.initializeApp({
        projectId: 'ydsgrammar'
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

async function seedCodes(packageType, count) {
    let days = 30;
    let prefix = 'MON'; // Monthly

    if (packageType === 'seasonal') {
        days = 90;
        prefix = 'SEA';
    } else if (packageType === 'yearly') {
        days = 365;
        prefix = 'YDS';
    }

    try {
        console.log(`Generating ${count} news codes for ${packageType} (${days} days)...`);
        const batch = db.batch();
        const generatedList = [];

        for(let i=0; i<count; i++) {
            const code = generateSimpleCode(prefix);
            const ref = db.collection('promo_codes').doc(code);
            batch.set(ref, {
                used: false,
                days: days,
                package: packageType,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });
            generatedList.push(code);
        }

        await batch.commit();
        console.log(`\n--- ${packageType.toUpperCase()} CODES ---`);
        console.log(generatedList.join('\n'));
        console.log("-----------------------------------------------\n");
    } catch (err) {
        console.error("Seed error:", err);
    }
}

async function run() {
    // Generate some for each
    await seedCodes('monthly', 10);
    await seedCodes('seasonal', 10);
    await seedCodes('yearly', 10);
    console.log("Successfully uploaded to Firestore.");
    process.exit(0);
}

run();
