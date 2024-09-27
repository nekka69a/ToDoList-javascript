import Sortable from "sortablejs";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "./firebase-config.js";
import { logout } from "./login.js";

/**
 * Fetches tasks from the database for a given user ID.
 * @param {string} userId -ID of the user whose tasks to fetch.
 * @returns {Promise<Array>} A promise that resolves to an array of task objects.
 */

const fetchTasksFromDatabase = async (userId) => {
  const q = query(collection(db, "tasks"), where("user", "==", userId));

  try {
    const querySnapshot = await getDocs(q);
    const tasks = [];

    querySnapshot.forEach((taskDoc) => {
      const task = taskDoc.data();
      task.id = taskDoc.id;
      tasks.push(task);
    });

    return tasks;
  } catch (error) {
    const errorMessage = error.message;
    console.error(errorMessage);
    return [];
  }
};

/**
 * Updates the UI to display a given array of tasks.
 * @param {Array} tasks - An array of task objects to display.
 */

const updateTasksUI = (tasks) => {
  tasks.forEach((task) => {
    let taskElement = document.querySelector(`p[data-id="${task.id}"]`);

    if (!taskElement) {
      taskElement = document.createElement("p");
      taskElement.setAttribute("data-id", task.id);

      if (task.status === "todo") {
        document.querySelector(".todo-list").appendChild(taskElement);
      } else if (task.status === "doing") {
        document.querySelector(".doing-list").appendChild(taskElement);
      } else if (task.status === "done") {
        document.querySelector(".done-list").appendChild(taskElement);
      }
    }

    taskElement.innerText = task.title;
  });
};

/**
 * Updates the displayed tasks for a given user ID.
 * Fetches tasks from the database for the user ID and updates the UI to display them.
 * @param {string} userId - ID of the user whose tasks to display.
 */

const updateDisplayedTasks = async (userId) => {
  const tasks = await fetchTasksFromDatabase(userId);
  updateTasksUI(tasks);
};

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
    updateDisplayedTasks(user);
  } catch (error) {
    console.error("Error adding task to Firestore:", error);
  }
}

/**
 * Returns the currently authenticated user.
 * @returns {Object|null} The currently authenticated user, or null if no user is authenticated.
 */

const getAuthenticatedUser = () => auth.currentUser;

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
        const user = getAuthenticatedUser();
        if (user) {
          const userId = user.uid;
          addTaskToFirestore(task, status, userId);
        } else {
          console.log("User is not signed in");
        }
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
 * Callback function that is called when a task is dragged to a new list.
 * Updates the task status based on the new list.
 *
 * @param {Sortable.SortableEvent} event - drag-and-drop end event.
 */

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

/**
 * This function initializes drag and drop functionality for todo, doing, and done lists.
 * It updates the task status in the database when a task is dragged and dropped to a new list.
 */

const updateDragAndDropData = () => {
  const todoList = document.querySelector(".todo-list");
  const doingList = document.querySelector(".doing-list");
  const doneList = document.querySelector(".done-list");

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
 * This function generates a logout button for the user and displays it on the dashboard.
 * It also retrieves the user's tasks from the database.
 * @param {Object} user - The user object.
 */

const generateLogoutButton = (user) => {
  const divLogout = document.querySelector(".div-logout");
  if (user) {
    const logoutImage = document.createElement("img");
    logoutImage.src = "/assets/exit.png";
    logoutImage.alt = "Déconnexion";
    logoutImage.style.height = "30px";
    logoutImage.style.width = "30px";
    logoutImage.addEventListener("click", logout);
    divLogout.appendChild(logoutImage);
  }
};

export {
  getAuthenticatedUser,
  generateNewTask,
  generateLogoutButton,
  updateDragAndDropData,
  updateDisplayedTasks,
};
