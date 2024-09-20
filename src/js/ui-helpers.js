import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { firebaseConfig } from "./firebase-config.js";
import { logout } from "./login.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Fonction pour ajouter une tâche à Firestore
async function addTask(userId, description) {
  try {
    const tasksRef = collection(db, "users", userId, "tasks");
    await addDoc(tasksRef, {
      description,
      createdAt: serverTimestamp(),
    });
    console.log("Task added to Firestore");
  } catch (error) {
    console.error("Error adding task to Firestore:", error);
  }
}

// Fonction pour générer une nouvelle tâche
const generateNewTask = (buttonSelector, taskListSelector, status) => {
  const button = document.querySelector(buttonSelector);
  const taskList = document.querySelector(taskListSelector);

  if (button && taskList) {
    button.addEventListener("click", () => {
      const task = window.prompt("Quel est le contenu de votre tâche ?");

      if (task) {
        console.log("Tâche créée :", task);
        const paragraph = document.createElement("p");
        paragraph.innerText = task;
        taskList.appendChild(paragraph);

        // check le statut de user et ajoute la tâche à Firestore
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const userId = user.uid;
            addTask(userId, task, "", status);
          } else {
            console.log("User is not signed in");
          }
        });
      }
    });
  }
};

const generateToDoTask = () => {
  generateNewTask(".todo-button", ".todo-list", "todo");
};

const generateDoingTask = () => {
  generateNewTask(".doing-button", ".doing-list", "doing");
};

const generateDoneTask = () => {
  generateNewTask(".done-button", ".done-list", "done");
};

// Fonction pour afficher le bouton de deconexion lorsque l'utilisateur est connecté

const generateLogoutButton = () => {
  onAuthStateChanged(auth, (user) => {
    const divLogout = document.querySelector(".div-logout");
    if (user) {
      // L'utilisateur est connecté
      const logoutButton = document.createElement("button");
      logoutButton.innerText = "Se deconnecter";
      logoutButton.addEventListener("click", logout);
      divLogout.appendChild(logoutButton);
    } else {
      // L'utilisateur n'est pas connecté
      const loginMessage = document.createElement("p");
      loginMessage.innerText = "Please login to access the dashboard.";
      divLogout.appendChild(loginMessage);
    }
  });
};

export {
  generateDoingTask,
  generateDoneTask,
  generateToDoTask,
  generateLogoutButton,
};
