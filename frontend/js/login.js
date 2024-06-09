document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');
  
    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the form from submitting the default way
  
        const username = document.getElementById('Username atau NPM').value;
        const password = document.getElementById('Password').value;
  
        try {
            const response = await fetch('https://api-labooking.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
  
            if (!response.ok) {
                throw new Error('Login failed');
            }
  
            const data = await response.json();
            const token = data.token;
  
            // Store the JWT token in localStorage
            localStorage.setItem('jwtToken', token);
  
            // Redirect to another page or show a success message
            window.location.href = 'index.html'; // Change this to your desired page
  
        } catch (error) {
            console.error('Error:', error);
            alert('Login failed. Please check your username and password.');
        }
    });
  });