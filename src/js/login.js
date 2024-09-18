import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  // collection,
  // addDoc,
  // serverTimestamp,
  getFirestore,
} from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore();

// Fonction pour ajouter une tâche à Firestore
// async function addTask(userId, title, description) {
//   try {
//     const tasksRef = collection(db, "users", userId, "tasks");
//     await addDoc(tasksRef, {
//       title,
//       description,
//       status: "incomplete",
//       createdAt: serverTimestamp(),
//     });
//     console.log("Task added to Firestore");
//   } catch (error) {
//     console.error("Error adding task to Firestore:", error);
//   }
// }

// const logout = () => {
//   signOut(auth)
//     .then(() => {
//       console.log("User signed out");
//       window.location.href = "login.html"; // Rediriger vers la page de connexion
//     })
//     .catch((error) => {
//       console.error("Error signing out:", error);
//     });
// };

function handleSubmitLogin(event) {
  event.preventDefault();
  const email = document.getElementById("mail-input").value;
  const password = document.getElementById("password-input").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      alert("Connexion...");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

const handleClickLogin = () => {
  const submitLogin = document.getElementById("login-submit");
  submitLogin.addEventListener("click", handleSubmitLogin);
};

export { handleClickLogin };
