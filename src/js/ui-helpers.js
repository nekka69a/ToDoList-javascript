import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Fonction pour ajouter une tâche à Firestore
async function addTask(userId, title, description) {
  try {
    const tasksRef = collection(db, "users", userId, "tasks");
    await addDoc(tasksRef, {
      title,
      description,
      status: "incomplete",
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

        // Ajouter la tâche à Firestore
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
export { generateDoingTask, generateDoneTask, generateToDoTask };
