import * as admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

if (!admin.apps.length) {
	try {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		});
	} catch (error) {
		console.log('Firebase admin initialization error', error.stack);
	}
}

const firestore = admin.firestore();
const auth = admin.auth();

export { firestore, auth };
