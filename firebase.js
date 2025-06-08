import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCjGP_AD60Cv9eT0KhwenUi_mPCQksNIaU",
    authDomain: "qazaq-air.firebaseapp.com",
    projectId: "qazaq-air",
    storageBucket: "qazaq-air.appspot.com",
    messagingSenderId: "532232471385",
    appId: "1:532232471385:web:f13a5718ae6bf5738bc248",
    measurementId: "G-BWKRMH8NQ2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);