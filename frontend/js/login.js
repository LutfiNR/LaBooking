/**
 * Event listener for DOMContentLoaded event.
 * This function is executed when the initial HTML document has been completely loaded and parsed,
 * without waiting for stylesheets, images, and subframes to finish loading.
 */
document.addEventListener("DOMContentLoaded", ()=>{
    // Get the login form element by its id
    const formLogin = document.getElementById('login-form');

    /**
     * Event listener for form submit event.
     * This function is executed when the form is submitted.
     * It prevents the default form submission behavior and sends a POST request to the server.
     * @param {Event} event - The event object
     */
    formLogin.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Create a FormData object from the form
        const formData = new FormData(formLogin);
        // Convert the FormData object to a plain JavaScript object
        const data = Object.fromEntries(formData);

        try {
            // Send a POST request to the server
            const response = await fetch('https://api-labooking.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Check if the response is not ok
            if (!response.ok) {
                // Parse the response as JSON
                const errorData = await response.json();
                // Throw an error with the error message
                throw new Error(errorData.message || 'Login failed');
            }

            // Parse the response as JSON
            const { token } = await response.json();

            // Decode the token
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            // Calculate the expiration time of the token in milliseconds
            const expirationTime = decodedToken.exp *1000;

            // Store the token in session storage
            localStorage.setItem('authToken', token);
            // Store the token expiration time in session storage
            localStorage.setItem('tokenExpiration', expirationTime);

            // Navigate to the admin page
            window.location.href = "/"

        } catch (error) {
            // Display an alert with the error message
            alert(error);
        }
    });
})