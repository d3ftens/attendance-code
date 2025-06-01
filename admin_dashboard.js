document.addEventListener("DOMContentLoaded", function() {
  const tableBody = document.getElementById("attendanceTableBody");
  const attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || [];

  // Populate the table with attendance data
  attendanceData.forEach(record => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${record.name}</td>
      <td>${record.date}</td>
      <td>${record.logIn}</td>
      <td>${record.logOut}</td>
    `;
    tableBody.appendChild(row);
  });
});
