import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALNV1hSQS9BfTA2DA8cs-wSeg1SvoDJ5o",
  authDomain: "escala-f7987.firebaseapp.com",
  projectId: "escala-f7987",
  storageBucket: "escala-f7987.firebasestorage.app",
  messagingSenderId: "866021060082",
  appId: "1:866021060082:web:38b1d8ab5e67d889468f6b",
  measurementId: "G-6HG367XQ2R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
