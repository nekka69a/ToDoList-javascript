import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  generateNewTask,
  generateLogoutButton,
  dragAndDrop,
  getUserTasksFromDatabase,
} from "./ui-helpers.js";
import { handleSubmit } from "./register.js";
import { handleSubmitLogin, logout } from "./login.js";

const auth = getAuth();

/**
 * Initialize event listeners for the register, login, and logout buttons.
 * Initializes task generation and drag and drop functionality if the user is logged in.
 */

const setUpEventListener = () => {
  /**
   *Function that we handle event click for RegisterButton
   */

  const handleClickRegister = async () => {
    const submitRegister = document.getElementById("register-submit");
    submitRegister.addEventListener("click", await handleSubmit);
    console.log("succes register!");
  };

  /**
   *Function that we handle event click for LoginButton
   */

  const handleclickLogin = async () => {
    const submitLogin = document.getElementById("login-submit");
    submitLogin.addEventListener("click", await handleSubmitLogin);
    console.log("succes login!");
  };

  /**
   *Function that we handle event click for logoutButton
   */

  const handleClickLogout = async () => {
    const submitLogout = document.querySelector(".div-logout");
    submitLogout.addEventListener("click", await logout);
  };

  /**
   * Initialize task generation for the todo, doing, and done lists.
   */

  const initializeTaskGeneration = () => {
    generateNewTask(".todo-button", ".todo-list", "todo");
    generateNewTask(".doing-button", ".doing-list", "doing");
    generateNewTask(".done-button", ".done-list", "done");
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // L'utilisateur est connecté
      getUserTasksFromDatabase(user.uid);
      initializeTaskGeneration();
      dragAndDrop();
      generateLogoutButton(user);
    }
  });

  handleClickRegister();
  handleclickLogin();
  handleClickLogout();
};

/**
 * Initializes the UI components and event listeners
 */

const init = () => {
  setUpEventListener();
};

export default init;
