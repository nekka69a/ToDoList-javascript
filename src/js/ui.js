import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config.js";
import { handleSubmit } from "./register.js";
import { handleClickLogin } from "./login.js";
import { handleClickRegister } from "./register.js";
import {
  generateDoingTask,
  generateDoneTask,
  generateToDoTask,
} from "./ui-helpers.js";

function app() {
  handleClickLogin();
}

export default app;
