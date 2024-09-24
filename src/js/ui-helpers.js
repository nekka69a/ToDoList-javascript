import Sortable from "sortablejs";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { firebaseConfig } from "./firebase-config.js";
import { logout } from "./login.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Fonction pour ajouter une tâche à Firestore
async function addTaskToFirestore(title, status, user) {
  try {
    const tasksRef = collection(db, "tasks");
    await addDoc(tasksRef, {
      title,
      status,
      user,
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

        // Ajoute la tâche à Firestore
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const userId = user.uid;
            addTaskToFirestore(task, status, userId);
          } else {
            console.log("User is not signed in");
          }
        });
      }
    });
  }
};

const dragAndDrop = () => {
  const todoList = document.querySelector(".todo-list");
  const doingList = document.querySelector(".doing-list");
  const doneList = document.querySelector(".done-list");

  const handleDragEnd = (event) => {
    const taskId = event.item.getAttribute("data-id");
    let newStatus;
    if (event.to.classList.contains("todo-list")) {
      newStatus = "todo";
    } else if (event.to.classList.contains("doing-list")) {
      newStatus = "doing";
    } else if (event.to.classList.contains("done-list")) {
      newStatus = "done";
    } else {
      newStatus = "unknown";
    }
    updateTaskStatus(taskId, newStatus);
  };

  if (todoList) {
    Sortable.create(todoList, {
      group: "shared",
      animation: 150,
      onEnd: handleDragEnd,
    });
  }

  if (doingList) {
    Sortable.create(doingList, {
      group: "shared",
      animation: 150,
      onEnd: handleDragEnd,
    });
  }

  if (doneList) {
    Sortable.create(doneList, {
      group: "shared",
      animation: 150,
      onEnd: handleDragEnd,
    });
  }
};

// Fonction pour mettre à jour le statut de la tâche dans la base de données
const updateTaskStatus = async (taskId, newStatus) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, {
      status: newStatus,
    });
  } catch (error) {
    console.error("Error updating task status in Firestore:", error);
  }
};

// Fonction pour faire persister les données même après la déconnection
const getUserTasksFromDatabase = (userId) => {
  const q = query(collection(db, "tasks"), where("user", "==", userId));
  const tasksRef = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        // Afficher la tâche sur le dashboard
        const task = change.doc.data();
        let taskElement = document.querySelector(
          `p[data-id="${change.doc.id}"]`,
        );
        if (!taskElement) {
          taskElement = document.createElement("p");
          taskElement.setAttribute("data-id", change.doc.id);
          // Ajouter la tâche à la liste appropriée en fonction de son statut
          if (task.status === "todo") {
            document.querySelector(".todo-list").appendChild(taskElement);
          } else if (task.status === "doing") {
            document.querySelector(".doing-list").appendChild(taskElement);
          } else if (task.status === "done") {
            document.querySelector(".done-list").appendChild(taskElement);
          }
        }
        taskElement.innerText = task.title;
      }
      if (change.type === "modified") {
        console.log("Statut changé: ", change.doc.data());
        // Mettre à jour le statut de la tâche sur le dashboard
        const task = change.doc.data();
        const taskElement = document.querySelector(
          `p[data-id="${change.doc.id}"]`,
        );
        if (taskElement) {
          taskElement.parentNode.removeChild(taskElement);
          if (task.status === "todo") {
            document.querySelector(".todo-list").appendChild(taskElement);
          } else if (task.status === "doing") {
            document.querySelector(".doing-list").appendChild(taskElement);
          } else if (task.status === "done") {
            document.querySelector(".done-list").appendChild(taskElement);
          }
        }
      }
      if (change.type === "removed") {
        console.log("Tâche supprimée: ", change.doc.data());

        const taskElement = document.querySelector(
          `p[data-id="${change.doc.id}"]`,
        );
        if (taskElement) {
          taskElement.parentNode.removeChild(taskElement);
        }
      }
    });
  });
};

// Fonction pour afficher le bouton de deconexion lorsque l'utilisateur est connecté
const generateLogoutButton = (user) => {
  const divLogout = document.querySelector(".div-logout");
  if (user) {
    const logoutButton = document.createElement("button");
    logoutButton.innerText = "Deconnexion";
    logoutButton.style.marginLeft = "570px";
    logoutButton.addEventListener("click", logout);
    divLogout.appendChild(logoutButton);
    // Récupération des tâches de l'utilisateur depuis Firestore
    getUserTasksFromDatabase(user.uid);
  }
};

export {
  generateNewTask,
  generateLogoutButton,
  dragAndDrop,
  getUserTasksFromDatabase,
};
