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

const setUpEventListener = () => {
  const handleClickRegister = async () => {
    const submitRegister = document.getElementById("register-submit");
    submitRegister.addEventListener("click", await handleSubmit);
    console.log("succes register!");
  };

  const handleclickLogin = async () => {
    const submitLogin = document.getElementById("login-submit");
    submitLogin.addEventListener("click", await handleSubmitLogin);
    console.log("succes login!");
  };

  const handleClickLogout = async () => {
    const submitLogout = document.querySelector(".div-logout");
    submitLogout.addEventListener("click", await logout);
  };

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

const init = () => {
  setUpEventListener();
};

export default init;
