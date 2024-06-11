/**
 * Event listener for DOMContentLoaded event.
 * This function initializes the signup form and handles form submission.
 */
document.addEventListener('DOMContentLoaded', () => {
    /**
     * Reference to the signup form element.
     * @type {HTMLFormElement}
     */
    const formSignUp = document.getElementById('signup-form');
    
    /**
     * Event listener for form submission.
     * This function prevents the default form submission behavior,
     * collects form data, sends it to the server, and handles the response.
     * @param {Event} event - The submit event.
     */
    formSignUp.addEventListener('submit', async (event) => {
        event.preventDefault();

        /**
         * FormData object containing the form data.
         * @type {FormData}
         */
        const formData = new FormData(formSignUp);

        /**
         * Object representation of the form data.
         * @type {Object}
         */
        const data = Object.fromEntries(formData);
        
        try {
            /**
             * Fetch API response from the server.
             * @type {Response}
             */
            const response = await fetch('https://api-labooking.vercel.app/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Server Error');
            }
    
            /**
             * Deconstructed response data.
             * @type {Object}
             */
            const {message} = await response.json();

            // Display success message and redirect to login page
            alert(message);
            window.location.href = "/login.html";

        } catch (error) {
            // Display error message
            alert('Failed to submit form. '+ error);
        }
    });
    
});