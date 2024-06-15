/**
 * Event listener for DOMContentLoaded event.
 * This function handles the initial setup and authentication for the booking page.
 */
document.addEventListener("DOMContentLoaded", async () => {
    // Get the back button element
    const buttonBack = document.getElementById("button-back");

    // Retrieve the authentication token and token expiration from local storage
    const authToken = localStorage.getItem("authToken");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    // If there's no token, redirect to the login page
    if (!authToken ||!tokenExpiration) {
        window.location.href = "/login.html";
        return;
    }

    // Check if the token is expired
    const currentTime = Date.now();
    if (currentTime > tokenExpiration) {
        // Token is expired, remove it from local storage and redirect to login
        localStorage.removeItem("authToken");
        localStorage.removeItem("tokenExpiration");
        window.location.href = "/login.html";
        return;
    }

    // Add event listener to the back button to navigate back to the home page
    buttonBack.addEventListener("click", () => {
        window.location.href = "/";
    });

    // Get the booking form element
    const formBooking = document.getElementById('form-booking');

    // Add event listener to the booking form to handle form submission
    formBooking.addEventListener('submit', async (event) => {
        // Prevent the form from submitting normally
        event.preventDefault()

        // Create a FormData object from the form
        const formData = new FormData(formBooking);

        // Convert the FormData object to a plain JavaScript object
        const data = Object.fromEntries(formData);

        try {
            // Send a POST request to the server with the form data and authentication token
            const response = await fetch('https://api-labooking.vercel.app/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(data)
            });

            // If the response status is not OK, throw an error with the server message
            if (!response.ok) {
                const { message } = await response.json();
                throw new Error(message);
            }

            // If the response status is OK, get the server message and display it in an alert
            const { message } = await response.json();
            alert(message)

            // Navigate to the home page
            window.location.href = "/"

        } catch (error) {
            // If an error occurs, display the error message in an alert and navigate to the login page
            alert(error);
            window.location.href = "/login.html"
        }
    });
})