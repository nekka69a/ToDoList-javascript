// ==========✨ Importations nécessaires pour le fonctionnement de l'application ✨==========

/**
 * Returns the current route by removing the ".html" extension.
 * @returns {string} The current route.
 */
const getCurrentRoute = () => {
  const currentFullPath = window.location.pathname;
  const currentRoute = currentFullPath.split("/").pop();

  return currentRoute.replace(".html", "");
};

// ==========🔄 Fonctions de redirection et de changement de vue 🔄==========

/**
 * Redirects the user to a new view.
 * @param {string} view - The name of the view to redirect to.
 * @param {boolean} isFromIndex - Whether the current view is the index view.
 */
const redirect = (view, isFromIndex) => {
  const currentFullPath = window.location.pathname;
  const currentRoute = currentFullPath.split("/").pop();
  const baseURL = currentFullPath.replace(`/${currentRoute}`, "");

  if (isFromIndex) {
    const newPath = `${baseURL}/view/${view}.html`;
    window.location.href = newPath;
    return;
  }

  const newPath = `${baseURL}/${view}.html`;
  window.location.href = newPath;
};

/**
 * Changes the current view to a new view.
 * @param {string} view - The name of the view to change to.
 * @param {boolean} isFromIndex - Whether the current view is the index view.
 */
const changeView = (view, isFromIndex) => {
  if (view === "login") {
    // Rediriger vers login
    redirect("login", isFromIndex);
  }

  if (view === "register") {
    // Rediriger vers register
    redirect("register", isFromIndex);
  }

  if (view === "dashboard") {
    redirect("dashboard", isFromIndex);
  }
};

// ==========🚀 Exportations des fonctions 🚀==========

window.changeView = changeView;

export { getCurrentRoute, changeView };
