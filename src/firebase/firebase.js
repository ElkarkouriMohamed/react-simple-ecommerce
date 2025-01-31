// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyZbD1uGr90qqfbL7YNTTsQvC5lBbMo6c",
  authDomain: "ecommerce-website-react-c9e3c.firebaseapp.com",
  projectId: "ecommerce-website-react-c9e3c",
  storageBucket: "ecommerce-website-react-c9e3c.firebasestorage.app",
  messagingSenderId: "837102138340",
  appId: "1:837102138340:web:c3fcc15d85c98afb6acdf1",
  measurementId: "G-N17MQ7LKEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const signWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        // Handle successful sign-in
        //console.log("User Info:", result.user);
        return result.user; // Return the signed-in user
    } catch (error) {
        console.error("Error signing in with Google:", error);
        throw error; // Throw the error to handle it in the calling function
    }
};

export const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
}