<script>
document.addEventListener('DOMContentLoaded', () => {

  // ====== SECTION TOGGLING ======
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

  // Expose function globally if needed in HTML onclick
  window.showSection = showSection;


  // ====== LOAD ATTENDANCE ======
  function loadAttendance() {
    const data = JSON.parse(localStorage.getItem("attendance"));

    if (!data || !data.total) return;

    const percent = Math.round((data.present / data.total) * 100);

    const textEl = document.getElementById("attendanceText");
    const circleEl = document.getElementById("attendanceCircle");

    if (textEl) textEl.innerText = percent + "%";
    if (circleEl) {
      circleEl.style.background = `conic-gradient(#22c55e 0% ${percent}%, #ef4444 ${percent}% 100%)`;
    }
  }

  loadAttendance();


  // ====== FETCH DATA FROM JSON ======
  fetch('data.json')
    .then(response => {
      if (!response.ok) throw new Error("HTTP error " + response.status);
      return response.json();
    })
    .then(data => {
      console.log(data);

      const container = document.getElementById('dataContainer'); 
      // Make sure you have <div id="dataContainer"></div> in HTML

      if (container) {
        container.innerHTML = `
          <p>Name: ${data.name}</p>
          <p>Age: ${data.age}</p>
        `;
      } else {
        console.warn("No container found for JSON data");
      }
    })
    .catch(error => console.error('Error loading JSON:', error));

});
</script>
