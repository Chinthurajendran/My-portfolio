import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyDJPq9a0YPoQYkpQ-Uaw7aXQRXzzqOKzFA",
//     authDomain: "web-kelas-tes.firebaseapp.com",
//     projectId: "web-kelas-tes",
//     storageBucket: "web-kelas-tes.appspot.com",
//     messagingSenderId: "890817433268",
//     appId: "1:890817433268:web:11e5258f8864a6174c11e1"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAz9PnBy_lUKNKfxduUTQ8mDLIcQVXJYwo",
  authDomain: "portfolio-ed140.firebaseapp.com",
  projectId: "portfolio-ed140",
  storageBucket: "portfolio-ed140.firebasestorage.app",
  messagingSenderId: "234867882835",
  appId: "1:234867882835:web:58d612f510a411a6c47fa6"
};


// Initialize with a unique name
const app = initializeApp(firebaseConfig, 'comments-app');
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };