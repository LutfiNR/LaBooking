document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.login-form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the form from submitting the default way

        const username = document.querySelector('input[placeholder="Username atau NPM"]').value;
        const password = document.querySelector('input[placeholder="Password"]').value;
        const namaLengkap = document.querySelector('input[placeholder="Nama Lengkap"]').value;
        const angkatan = document.querySelector('input[placeholder="Angkatan"]').value;

        try {
            const response = await fetch('https://api-labooking.vercel.app/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, namaLengkap, angkatan })
            });

            if (!response.ok) {
                throw new Error('Signup gagal');
            }

            const data = await response.json();
            const token = data.token;

            // Store the JWT token in localStorage
            localStorage.setItem('jwtToken', token);

            // Redirect to another page or show a success message
            window.location.href = 'index.html'; // Change this to your desired page

        } catch (error) {
            console.error('Error:', error);
            alert('Signup gagal. silahkan periksa kembali, dan coba lagi.');
        }
    });

    // Redirect to login page on clicking the login button
    const loginButton = document.querySelector('.signup-btn');
    loginButton.addEventListener('click', function () {
        window.location.href = 'login.html';
    });
});
