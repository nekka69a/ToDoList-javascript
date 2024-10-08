import {
  addDoc,
  doc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import Sortable from "sortablejs";
import { db } from "./firebase-config.js";
import { getAuthenticatedUser } from "./ui-helpers.js";
import { getUser } from "./auth.js";

/**
 * Function for updating task status in the database
 * @param {string} taskId
 * @param {Object} newStatus
 */

const updateTaskStatus = async (taskId, newStatus) => {
  if (!taskId || newStatus) {
    console.warn("No task ID or status provided");
    return;
  }

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

const initializeDragAndDropColumns = () => {
  const columnsContainers = document.querySelectorAll("#task-container");

  if (columnsContainers === 0) {
    console.warn("No columns found on the page");
    return;
  }

  const columnsArray = Array.from(columnsContainers);

  columnsArray.map(
    (columnsContainer) =>
      new Sortable(columnsContainer, {
        group: "shared",
        animation: 150,
        onEnd: handleDragEnd,
        ghostClass: "sortable-ghost",
      }),
  );
};

/**
 * Fetches tasks from the database for a given user ID.
 * @param {string} userId -ID of the user whose tasks to fetch.
 * @returns {Promise<Array>} A promise that resolves to an array of task objects.
 */

const fetchTasksFromDatabase = async () => {
  const user = await getUser();
  if (!user) {
    console.warn("No user loggued in. Can no retrive initial tasks.");
    return [];
  }
  const q = query(collection(db, "tasks"), where("user", "==", user.uid));

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

const updateDisplayedTasks = async () => {
  const currentUser = getAuthenticatedUser();
  const userId = currentUser ? currentUser.uid : null;

  if (!userId) {
    return;
  }

  if (userId) {
    const tasks = await fetchTasksFromDatabase(userId);
    updateTasksUI(tasks);
  }
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
    updateDisplayedTasks();
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

  if (!button && !taskList) {
    console.warn = "No button or task list found on the page";
  }

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
 * Initialize task generation for the todo, doing, and done lists.
 */

const initializeAddNewTaskListener = async () => {
  const currentUser = await getUser();
  if (currentUser) {
    generateNewTask(".todo-button", ".todo-list", "todo");
    generateNewTask(".doing-button", ".doing-list", "doing");
    generateNewTask(".done-button", ".done-list", "done");
    updateDisplayedTasks();
  } else {
    console.warn("User is not signed in !");
  }
};

export {
  initializeAddNewTaskListener,
  initializeDragAndDropColumns,
  updateDisplayedTasks,
};
