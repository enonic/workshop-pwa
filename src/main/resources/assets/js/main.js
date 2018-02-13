require('../css/styles.less');

(function(){
    window.onload = function() {

        console.log('Hello from main.js!')

/*

        toggleOnlineStatus();
        addToggleListeners();
*/
    };
})();

const toggleOnlineStatus = function () {
    const mainContainer = document.getElementById("main-container");

    if (!mainContainer) {
        return;
    }

    mainContainer.classList.toggle("online", navigator.onLine);
    mainContainer.classList.toggle("offline", !navigator.onLine);
};

const addToggleListeners = function() {
    window.addEventListener("offline", toggleOnlineStatus);
    window.addEventListener("online", toggleOnlineStatus);
};