document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        console.log("Attempting to log in with", { username, password });

        try {
            const response = await fetch("https://api-labooking.vercel.app/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            console.log("Response status:", response.status);

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful:", data);
                const token = data.token; // Assuming the JWT token is returned in the "token" field
                localStorage.setItem("jwtToken", token);
                alert("Login successful!");
                // Redirect to a new page or perform other actions after successful login
            } else {
                const errorData = await response.json();
                console.log("Login failed:", errorData);
                alert(`Login failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again.");
        }
    });
});
