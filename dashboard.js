// Load and display data
function loadTable() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = ""; // Clear existing table content

  const data = JSON.parse(localStorage.getItem("attendanceData")) || [];

  // Loop through each record and add a row to the table
  data.forEach(entry => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = entry.name;
    row.appendChild(nameCell);

    const dateCell = document.createElement("td");
    dateCell.textContent = entry.date;
    row.appendChild(dateCell);

    const logInCell = document.createElement("td");
    logInCell.textContent = entry.logIn || "N/A";
    row.appendChild(logInCell);

    const logOutCell = document.createElement("td");
    logOutCell.textContent = entry.logOut || "N/A";
    row.appendChild(logOutCell);

    tableBody.appendChild(row);
  });
}

// Search function
function filterTable() {
  const searchDate = document.getElementById("searchDate").value.trim();
  const searchName = document.getElementById("searchName").value.trim().toLowerCase();

  const rows = document.querySelectorAll("#attendanceTable tbody tr");

  rows.forEach(row => {
    const dateCell = row.children[1].textContent;
    const nameCell = row.children[0].textContent.toLowerCase();

    const matchDate = !searchDate || dateCell.includes(searchDate);
    const matchName = !searchName || nameCell.includes(searchName);

    row.style.display = matchDate && matchName ? "" : "none";
  });
}

document.getElementById("searchDate").addEventListener("input", filterTable);
document.getElementById("searchName").addEventListener("input", filterTable);

loadTable();
