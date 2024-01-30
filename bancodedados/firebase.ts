// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firestore from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDaaHS9vzkl3kPAU0PKrTOIXmnwCyBSVo",
  authDomain: "meubancodedados-bcd06.firebaseapp.com",
  projectId: "meubancodedados-bcd06",
  storageBucket: "meubancodedados-bcd06.appspot.com",
  messagingSenderId: "244663773839",
  appId: "1:244663773839:web:f9d8d1ef008f96c2ab5efa"
};

// Initialize Firebase
console.log("Conectado ao Firebase!");
const Firebase = initializeApp(firebaseConfig);
export const db = firestore.getFirestore(Firebase);

export { firestore };