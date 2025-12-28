/* ==================================================
   HOME PAGE JAVASCRIPT
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ----------------------------------------------
     SECTION TOGGLING (future-ready)
     ---------------------------------------------- */
  function showSection(id) {
    const sections = document.querySelectorAll(".section");
    sections.forEach(section => section.classList.add("hidden"));

    const target = document.getElementById(id);
    if (target) {
      target.classList.remove("hidden");
    } else {
      console.warn(`No section found with id: ${id}`);
    }
  }

  // Make accessible for inline onclick if needed later
  window.showSection = showSection;


  /* ----------------------------------------------
     ATTENDANCE (LocalStorage based)
     ---------------------------------------------- */
  function loadAttendance() {
    const storedData = localStorage.getItem("attendance");

    if (!storedData) return;

    const data = JSON.parse(storedData);
    if (!data || !data.total || !data.present) return;

    const percent = Math.round((data.present / data.total) * 100);

    const textEl = document.getElementById("attendanceText");
    const circleEl = document.getElementById("attendanceCircle");

    if (textEl) textEl.innerText = percent + "%";

    if (circleEl) {
      circleEl.style.background = `
        conic-gradient(
          #22c55e 0% ${percent}%,
          #ef4444 ${percent}% 100%
        )
      `;
    }

    updatePerformance(percent);
  }

  loadAttendance();


  /* ----------------------------------------------
     DEFAULT ATTENDANCE (fallback)
     ---------------------------------------------- */
  const DEFAULT_ATTENDANCE = 82;

  const attendanceCircle = document.getElementById("attendanceCircle");
  const attendanceText = document.getElementById("attendanceText");

  if (attendanceCircle && attendanceText && !localStorage.getItem("attendance")) {
    attendanceText.innerText = DEFAULT_ATTENDANCE + "%";

    attendanceCircle.style.background = `
      conic-gradient(
        #22c55e 0% ${DEFAULT_ATTENDANCE}%,
        #ef4444 ${DEFAULT_ATTENDANCE}% 100%
      )
    `;

    updatePerformance(DEFAULT_ATTENDANCE);
  }


  /* ----------------------------------------------
     PERFORMANCE STATUS
     ---------------------------------------------- */
  function updatePerformance(percent) {
    const performanceText = document.querySelector(".dash-card h2.good");

    if (!performanceText) return;

    if (percent >= 85) {
      performanceText.innerText = "Excellent";
      performanceText.style.color = "#16a34a";
    } else if (percent >= 75) {
      performanceText.innerText = "Good";
      performanceText.style.color = "#2563eb";
    } else {
      performanceText.innerText = "Poor";
      performanceText.style.color = "#dc2626";
    }
  }


  /* ----------------------------------------------
     SIDEBAR ACTIVE STATE
     ---------------------------------------------- */
  const sidebarItems = document.querySelectorAll(".sidebar li");

  sidebarItems.forEach(item => {
    if (item.innerText.includes("Home")) {
      item.classList.add("active");
    }
  });


  /* ----------------------------------------------
     DASHBOARD CARD HOVER (JS-based)
     ---------------------------------------------- */
  document.querySelectorAll(".dash-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-4px)";
      card.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.boxShadow = "";
    });
  });


  /* ----------------------------------------------
     FETCH DATA FROM JSON (optional feature)
     ---------------------------------------------- */
  fetch("data.json")
    .then(response => {
      if (!response.ok) throw new Error("HTTP Error: " + response.status);
      return response.json();
    })
    .then(data => {
      console.log("JSON Loaded:", data);

      const container = document.getElementById("dataContainer");
      // Optional: only works if container exists

      if (container) {
        container.innerHTML = `
          <p>Name: ${data.name}</p>
          <p>Age: ${data.age}</p>
        `;
      }
    })
    .catch(error => console.error("Error loading JSON:", error));


  /* ----------------------------------------------
     DEBUG
     ---------------------------------------------- */
  console.log("🏠 Home page JS loaded successfully");

});
