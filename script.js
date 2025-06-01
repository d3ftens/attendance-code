
// Function to update time and date
function updateDateTime() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-GB', { hour12: false });
  const date = now.toLocaleDateString('en-CA');
  document.getElementById("currentTime").textContent = `TIME: ${time}`;
  document.getElementById("currentDate").textContent = `DATE: ${date}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();

// Capitalize full name
function capitalizeName(name) {
  return name
    .split(" ")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

// Log attendance with popup
function logTime(type) {
  const input = document.getElementById('studentName');
  let name = input.value.trim();

  if (name === "") {
    showPopup("Please enter your name.", true);
    return;
  }

  name = capitalizeName(name);
  saveAttendance(name, type);
  showPopup(`Successfully Logged ${type === 'in' ? 'In' : 'Out'} as ${name}`);
  input.value = ""; // Clear the input
}

// ✅ Updated Save attendance function (handles multiple sessions & matches logouts to logins)
function saveAttendance(name, type) {
  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = currentDate.toLocaleDateString('en-US');

  let existing = JSON.parse(localStorage.getItem("attendanceData")) || [];

  if (type === 'in') {
    // Always add a new logIn entry
    existing.push({ name, date, logIn: time, logOut: "" });
  } else if (type === 'out') {
    // Find the latest unmatched login for today
    const indexToUpdate = [...existing].reverse().findIndex(
      record => record.name === name && record.date === date && !record.logOut
    );

    if (indexToUpdate !== -1) {
      const realIndex = existing.length - 1 - indexToUpdate;
      existing[realIndex].logOut = time;
    } else {
      // No matching login found — log out as a new record
      existing.push({ name, date, logIn: "", logOut: time });
    }
  }

  localStorage.setItem("attendanceData", JSON.stringify(existing));
}

// Popup messages
function showPopup(message, isError = false) {
  const popup = document.createElement("div");
  popup.textContent = message;
  popup.style.position = "fixed";
  popup.style.bottom = "30px";
  popup.style.right = "30px";
  popup.style.padding = "12px 20px";
  popup.style.backgroundColor = isError ? "crimson" : "#ffc300";
  popup.style.color = isError ? "#fff" : "#001f3f";
  popup.style.borderRadius = "8px";
  popup.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
  popup.style.fontWeight = "bold";
  popup.style.zIndex = "9999";
  popup.style.transition = "opacity 0.3s ease";
  document.body.appendChild(popup);
  setTimeout(() => {
    popup.style.opacity = 0;
    setTimeout(() => document.body.removeChild(popup), 500);
  }, 2000);
}
