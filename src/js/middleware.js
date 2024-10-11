import { getUser } from "./auth.js";
import { changeView, getCurrentRoute } from "./router.js";
import { setLoader } from "./ui-helpers.js";

// ==========✨ Importations nécessaires pour le fonctionnement de l'application ✨==========

/**
 * Initialize a router protection on every routes.
 */
const initializeProtectionRouterListener = async () => {
  // Enable loader to avoid bad UX if user is already connected
  setLoader("body-login", true);
  setLoader("body-register", true);
  const user = await getUser();
  const currentRoute = getCurrentRoute();

  if (!user && currentRoute === "dashboard") {
    changeView("login");
  }

  if (user && (currentRoute === "login" || currentRoute === "register")) {
    changeView("dashboard");
  }

  if (!user && currentRoute === "login") {
    const bodyLoginDiv = document.getElementById("body-login");
    if (!bodyLoginDiv) {
      return;
    }

    const containerLoginDiv = bodyLoginDiv.firstElementChild;
    containerLoginDiv.style = "flex";
    setLoader("body-login", false);
  }

  if (!user && currentRoute === "register") {
    const bodyRegisterDiv = document.getElementById("body-register");
    if (!bodyRegisterDiv) {
      return;
    }

    const containerRegisterDiv = bodyRegisterDiv.firstElementChild;
    containerRegisterDiv.style = "flex";
    setLoader("body-register", false);
  }
};

// ==========🚀 Exportations des fonctions 🚀==========

export default initializeProtectionRouterListener;
