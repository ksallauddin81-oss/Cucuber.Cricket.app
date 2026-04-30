import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBE8T0ODCf2NGbiyDmgJpWUcLdHGlsRH5A",
  authDomain: "cucuber-e1a94.firebaseapp.com",
  projectId: "cucuber-e1a94",
  storageBucket: "cucuber-e1a94.firebasestorage.app",
  messagingSenderId: "580993233354",
  appId: "1:580993233354:web:9981e79e1dca472b625f33",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;