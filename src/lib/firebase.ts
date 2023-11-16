import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBxF1kyjaqg7d1FTqWfz3pUdUFJVKbqP_4',
  authDomain: 'notlinktree-a5979.firebaseapp.com',
  projectId: 'notlinktree-a5979',
  storageBucket: 'notlinktree-a5979.appspot.com',
  messagingSenderId: '823722147199',
  appId: '1:823722147199:web:dc3ec3e693422f74a06e4a'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
