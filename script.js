async function shortenUrl() {
  const longUrl = document.getElementById("longUrl").value.trim();
  const service = document.getElementById("serviceSelect").value;

  if (!longUrl) {
    alert("Error #1: Please enter a URL!");
    return;
  }

  try {
    const response = await fetch(`/.netlify/functions/shorten?url=${encodeURIComponent(longUrl)}&service=${service}`);
    if (!response.ok) throw new Error("Bad response");
    const shortUrl = await response.text();
    document.getElementById("shortUrl").value = shortUrl;
  } catch (error) {
    alert("Error #2: Error shortening URL, please try again later.");
  }
}

function copyUrl() {
  const shortUrlField = document.getElementById("shortUrl");
  if (shortUrlField.value) {
    navigator.clipboard.writeText(shortUrlField.value).then(() => {
      alert("Success #1: Shortened URL copied!");
    });
  } else {
    alert("Error #3: No URL to copy.");
  }
}

function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  document.getElementById("clock").textContent = `${hours}:${minutes}`;
}
setInterval(updateClock, 1000);
updateClock();

function toggleStartMenu() {
  const menu = document.getElementById("startMenu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

function toggleCalendar() {
  const cal = document.getElementById("calendar");
  if (cal.style.display === "block") {
    cal.style.display = "none";
  } else {
    renderCalendar();
    cal.style.display = "block";
  }
}

function renderCalendar() {
  const cal = document.getElementById("calendar");
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const today = now.getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = now.toLocaleString('default', { month: 'long' });

  let html = `<h4>${monthName} ${year}</h4>`;
  html += `<div class="big-clock" id="bigClock"></div>`;
  html += "<table><tr>";
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  for (let d of days) html += `<th>${d}</th>`;
  html += "</tr><tr>";

  for (let i = 0; i < firstDay; i++) html += "<td></td>";
  for (let day = 1; day <= daysInMonth; day++) {
    if ((day + firstDay - 1) % 7 === 0 && day !== 1) html += "</tr><tr>";
    const isToday = day === today;
    html += `<td class="${isToday ? 'today' : ''}">${day}</td>`;
  }

  html += "</tr></table>";
  cal.innerHTML = html;

  function updateBigClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const bigClock = document.getElementById("bigClock");
    if (bigClock) {
      bigClock.textContent = `${hours}:${minutes}:${seconds}`;
    }
  }
  setInterval(updateBigClock, 1000);
  updateBigClock();
}

function toggleWindow() {
  const win = document.getElementById("mainWindow");
  if (win.style.display === "none") {
    win.style.display = "block";
  } else {
    win.style.display = "none";
  }
}

function shutdown() {
  window.close();
}
