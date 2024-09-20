import {
  generateToDoTask,
  generateDoingTask,
  generateDoneTask,
  generateLogoutButton,
} from "./ui-helpers.js";
import { handleSubmit } from "./register.js";
import { handleSubmitLogin, logout } from "./login.js";

const setUpEventListener = () => {
  const handleClickRegister = async () => {
    const submitRegister = document.getElementById("register-submit");
    submitRegister.addEventListener("click", handleSubmit);
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

  generateToDoTask();
  generateDoingTask();
  generateDoneTask();
  generateLogoutButton();
  handleClickRegister();
  handleclickLogin();
  handleClickLogout();
};

const init = () => {
  setUpEventListener();
};

export default init;
