import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBeMcM8VKM0rruvXUy7GKl216JyoGELQwA",
  authDoMain: "golfvisor-4bc98.firebaseapp.com",
  projectId: "golfvisor-4bc98",
  storageBucket: "golfvisor-4bc98.appspot.com",
  messagingSenderId: "156514639463",
  appId: "1:156514639463:web:7207c602d563d80e38fec2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
