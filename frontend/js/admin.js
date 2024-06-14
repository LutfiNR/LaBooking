/**
 * Event listener for DOM content loaded event.
 * Fetches booking requests from the server and renders them in the table.
 * Handles authentication and token expiration.
 */
document.addEventListener("DOMContentLoaded", async () => {
  const buttonBooking = document.getElementById('button-booking');
  const buttonExit = document.getElementById('button-exit');
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

  buttonBooking.addEventListener("click", () => {
      window.location.href = "/booking.html";
  });

  buttonExit.addEventListener("click", () => {
      window.location.href = "/";
  });

  try {
      const response = await fetch('https://api-labooking.vercel.app/admin', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
          },
      });

      if (!response.ok) {
          const { message } = await response.json();
          throw new Error(message);
      }

      const bookingRequest= await response.json();
      renderBookingRequests(bookingRequest, authToken);

  } catch (error) {
      alert(error.message);
      window.location.href = "/login.html";
  }
});

/**
* Renders booking requests in the table.
* @param {Array} bookings - Array of booking requests.
* @param {string} authToken - Authorization token.
*/
function renderBookingRequests(bookings, authToken) {
  const tableBody = document.getElementById('bookingTableBody');
  tableBody.innerHTML = '';

  bookings.forEach((booking, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${index+1}</td>
          <td>${booking.name}</td>
          <td>${booking.activity}</td>
          <td>${new Date(booking.start).toLocaleString()}</td>
          <td>${new Date(booking.end).toLocaleString()}</td>
          <td>${booking.dosen}</td>
          <td>${booking.phone}</td>
          <td>${booking.status}</td>
          <td>
              <button onclick="handleAction('${booking.requestId}', 'decline', '${authToken}')"><img src="./assets/decline.png"/></button>
              <button onclick="handleAction('${booking.requestId}', 'approve', '${authToken}')"><img src="./assets/approve.png"/></button>
          </td>
      `;
      tableBody.appendChild(row);
  });
}

/**
* Handles action on a booking request.
* @param {string} id - ID of the booking request.
* @param {string} action - Action to be performed (approve or decline).
* @param {string} authToken - Authorization token.
*/
async function handleAction(id, action, authToken) {
  try {
      const response = await fetch('https://api-labooking.vercel.app/request-action', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ id, action })
      });

      if (!response.ok) {
          const { message } = await response.json();
          throw new Error(message);
      }

      const {message}= await response.json();
      alert(message)
      location.reload();

  } catch (error) {
      alert(error.message);
  }
}