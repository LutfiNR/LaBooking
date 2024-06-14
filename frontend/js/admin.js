// Fetch booking data from API
fetch('http://api-labooking.vercel.app.com/admin')
  .then(response => response.json())
  .then(bookings => {
    // Render booking data to HTML
    const bookingTable = document.getElementById('booking-table');

    bookings.forEach(booking => {
      // Create a new row for each booking
      const row = bookingTable.insertRow();

      // Create cells for each column
      const noCell = row.insertCell();
      const namaPemesanCell = row.insertCell();
      const kegiatanCell = row.insertCell();
      const waktuMulaiCell = row.insertCell();
      const waktuSelesaiCell = row.insertCell();
      const namaDosenCell = row.insertCell();
      const teleponCell = row.insertCell();
      const statusCell = row.insertCell();
      const actionCell = row.insertCell();

      // Populate cells with data
      noCell.textContent = booking.no;
      namaPemesanCell.textContent = booking.namaPemesan;
      kegiatanCell.textContent = booking.kegiatan;
      waktuMulaiCell.textContent = booking.waktuMulai;
      waktuSelesaiCell.textContent = booking.waktuSelesai;
      namaDosenCell.textContent = booking.namaDosen;
      teleponCell.textContent = booking.telepon;
      statusCell.textContent = booking.status;

      // Create action buttons
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        // Handle delete action
        // e.g. Send delete request to API
        // Update table data
      });

      const approveButton = document.createElement('button');
      approveButton.textContent = 'Approve';
      approveButton.addEventListener('click', () => {
        // Handle approve action
        // e.g. Send approve request to API
        // Update table data
      });

      // Append action buttons to action cell
      actionCell.appendChild(deleteButton);
      actionCell.appendChild(approveButton);
    });
  });