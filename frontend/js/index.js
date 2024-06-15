/**
 * Event listener for DOMContentLoaded event.
 * Initializes the functionality of the buttons and login/logout functionality.
 */
document.addEventListener("DOMContentLoaded", () => {
    /**
     * Button for booking page redirection.
     */
    const buttonBooking = document.getElementById("button-booking");

    /**
     * Button for admin page redirection.
     */
    const buttonAdmin = document.getElementById("button-admin");

    /**
     * Button for login/logout functionality.
     */
    const buttonLoginLogout = document.getElementById("button-login-logout");

    /**
     * Retrieves the authToken from localStorage.
     */
    const authToken = localStorage.getItem("authToken");

    /**
     * Event listener for buttonBooking click event.
     * Redirects to booking page.
     */
    buttonBooking.addEventListener("click", () => {
        window.location.href = "/booking.html";
    });

    /**
     * Event listener for buttonAdmin click event.
     * Redirects to admin page.
     */
    buttonAdmin.addEventListener("click", () => {
        window.location.href = "/admin.html";
    });

    /**
     * If authToken is not present, sets up login functionality.
     */
    if (!authToken) {
        buttonLoginLogout.addEventListener("click", () => {
            window.location.href = "/login.html";
        });
        buttonLoginLogout.lastElementChild.textContent = "Login";
        buttonLoginLogout.firstElementChild.src = "./assets/login.png"
        buttonLoginLogout.firstElementChild.setAttribute("alt", "login");
    } else {
        buttonLoginLogout.lastElementChild.textContent = "Logout";
        buttonLoginLogout.firstElementChild.src = "./assets/logout.png";
        buttonLoginLogout.firstElementChild.setAttribute("alt", "logout");
    }

    /**
     * Event listener for buttonLoginLogout click event.
     * Removes authToken and tokenExpiration from localStorage and redirects to login page.
     */
    buttonLoginLogout.addEventListener("click", () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("tokenExpiration");
        window.location.href = "/login.html";
    });

});