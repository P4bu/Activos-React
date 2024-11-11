import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD7Q3dcBztcoZ6RNLINmGHTaJ4o0V0XLIw",
  authDomain: "gestion-activos-90505.firebaseapp.com",
  projectId: "gestion-activos-90505",
  storageBucket: "gestion-activos-90505.firebasestorage.app",
  messagingSenderId: "566606843573",
  appId: "1:566606843573:web:a021671637a22488d1b8fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)