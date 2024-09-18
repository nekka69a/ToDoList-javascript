import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB92aB5qbpvWvspekRpwHKikSz_OtDfh3M",
  authDomain: "todolist-8477d.firebaseapp.com",
  projectId: "todolist-8477d",
  storageBucket: "todolist-8477d.appspot.com",
  messagingSenderId: "354239530601",
  appId: "1:354239530601:web:a914aa1eb43c87bbfb44f8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { firebaseConfig, auth, db, app };
