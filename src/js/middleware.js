import { getUser } from "./auth.js";
import { changeView, getCurrentRoute } from "./router.js";
import { setLoader } from "./ui-helpers.js";

/**
 * Initialize a router protection on every routes
 */

const initializeProtectionRouterListener = async () => {
  setLoader("body-login", true);
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
};

export default initializeProtectionRouterListener;
