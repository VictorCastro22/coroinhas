import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCa7K2r2UTBQd_1sZYOSFpIh5uHH99alRo",
  authDomain: "calendariopadres-92043.firebaseapp.com",
  projectId: "calendariopadres-92043",
  storageBucket: "calendariopadres-92043.firebasestorage.app",
  messagingSenderId: "80031346338",
  appId: "1:80031346338:web:e04ee23ea29262cb81b1fb",
  measurementId: "G-P3ZDNF7CCL"
};


const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
