import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID } from '$env/static/private';
import admin from 'firebase-admin';

try {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: FIREBASE_PROJECT_ID,
            clientEmail: FIREBASE_CLIENT_EMAIL,
            privateKey: FIREBASE_PRIVATE_KEY
        }),
        // databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`
    })
} catch (err: any) {
    if (!/already exists/u.test(err.message)) {
        console.error('Firebase Admin Error: ', err.statck);
    }
}

export const adminDB = getFirestore();
export const adminAuth = getAuth();