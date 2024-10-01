import { getUser } from "./auth.js";
import { changeView, getCurrentRoute } from "./router.js";

/**
 * Initialize a router protection on every routes
 */

const initializeProtectionRouterListener = async () => {
  const user = await getUser();
  const currentRoute = getCurrentRoute();

  if (!user && currentRoute === "dashboard") {
    changeView("login");
  }

  if (user && (currentRoute === "login" || currentRoute === "register")) {
    changeView("dashboard");
  }
};

export default initializeProtectionRouterListener;
