import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJPXdcUE-aVrX1I5YQEjoDdJd97hEHn00",
  authDomain: "media-djinn.firebaseapp.com",
  projectId: "media-djinn",
  storageBucket: "media-djinn.appspot.com",
  messagingSenderId: "570379597123",
  appId: "1:570379597123:web:f78c035935d493d116ebf6"
};

// Initialize Firebase
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

const db = getFirestore(app);

export { db };
