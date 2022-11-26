import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6M86NgnE4QdwbF8sLIG_KjCfw2ka8-b8",
  authDomain: "ibm-heart-disease.firebaseapp.com",
  projectId: "ibm-heart-disease",
  storageBucket: "ibm-heart-disease.appspot.com",
  messagingSenderId: "595386967638",
  appId: "1:595386967638:web:0484191311a8b3af6d7df7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);