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

/**
 * Add a new task to the Firestore database.
 * @param {string} title - Title of the task.
 * @param {string} status - Status of the task
 * @param {string} user - ID of the user who created the task.
 */
async function addTaskToFirestore(title, status, user) {
  try {
    const tasksRef = collection(db, "tasks");
    await addDoc(tasksRef, {
      title,
      status,
      user,
    });
  } catch (error) {
    console.error("Error adding task to Firestore:", error);
  }
}

/**
 *Function that generates a new task
 * @param {string} buttonSelector - The CSS selector for the button that generates a new task.
 * @param {string} taskListSelector - The CSS selector for the list that displays the tasks.
 * @param {string} status - The status of the new task
 */

const generateNewTask = (buttonSelector, taskListSelector, status) => {
  const button = document.querySelector(buttonSelector);
  const taskList = document.querySelector(taskListSelector);

  if (button && taskList) {
    button.addEventListener("click", () => {
      const task = window.prompt("Quel est le contenu de votre tâche ?");

      if (task) {
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

/**
 * Function for updating task status in the database
 * @param {string} taskId
 * @param {Object} newStatus
 */

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

/**
 * This function initializes drag and drop functionality for todo, doing, and done lists.
 * It updates the task status in the database when a task is dragged and dropped to a new list.
 */

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

/**
 * This function retrieves user tasks from the database and updates the dashboard accordingly.
 * @param {string} userId - The ID of the user
 */

const getUserTasksFromDatabase = (userId) => {
  const q = query(collection(db, "tasks"), where("user", "==", userId));
  onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const task = change.doc.data();
        let taskElement = document.querySelector(
          `p[data-id="${change.doc.id}"]`,
        );
        if (!taskElement) {
          taskElement = document.createElement("p");
          taskElement.setAttribute("data-id", change.doc.id);

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

/**
 * This function generates a logout button for the user and displays it on the dashboard.
 * It also retrieves the user's tasks from the database.
 * @param {Object} user - The user object.
 */

const generateLogoutButton = (user) => {
  const divLogout = document.querySelector(".div-logout");
  if (user) {
    const logoutButton = document.createElement("button");
    logoutButton.innerText = "Deconnexion";
    logoutButton.style.marginLeft = "570px";
    logoutButton.addEventListener("click", logout);
    divLogout.appendChild(logoutButton);

    getUserTasksFromDatabase(user.uid);
  }
};

export {
  generateNewTask,
  generateLogoutButton,
  dragAndDrop,
  getUserTasksFromDatabase,
};
