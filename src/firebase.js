import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs } from "@firebase/firestore"; // Perbarui ini


// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB-lfUt1adpQ0KYcFFW_oAWTJVfHDOOZy8",
//   authDomain: "portofolio-web-3e8e8.firebaseapp.com",
//   projectId: "portofolio-web-3e8e8",
//   storageBucket: "portofolio-web-3e8e8.appspot.com",
//   messagingSenderId: "25195509306",
//   appId: "1:25195509306:web:2b635dcf997137bf612703"
// };


const firebaseConfig = {
  apiKey: "AIzaSyAz9PnBy_lUKNKfxduUTQ8mDLIcQVXJYwo",
  authDomain: "portfolio-ed140.firebaseapp.com",
  projectId: "portfolio-ed140",
  storageBucket: "portfolio-ed140.firebasestorage.app",
  messagingSenderId: "234867882835",
  appId: "1:234867882835:web:58d612f510a411a6c47fa6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };