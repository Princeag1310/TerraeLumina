// Utility function to get query parameter by name
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  // Load dynamic event detail on event-detail.html
  function loadEventDetail() {
    const eventId = getQueryParam("id");
    const detailContainer = document.getElementById("event-detail-content");
    
    if (!eventId) {
      detailContainer.innerHTML = "<p>No event selected.</p>";
      return;
    }
  
    fetch("data/events.json")
      .then(response => response.json())
      .then(events => {
        const event = events.find(ev => ev.id === eventId);
        if (!event) {
          detailContainer.innerHTML = "<p>Event not found.</p>";
          return;
        }
        const eventHTML = `
          <h1>${event.name}</h1>
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Time:</strong> ${event.time}</p>
          <p><strong>Venue:</strong> ${event.venue}</p>
          <p><strong>Chef:</strong> ${event.chef}</p>
          <img src="${event.image}" alt="${event.name}" class="event-detail-image" />
          <p>${event.description}</p>
          <h3>Menu Highlights</h3>
          <ul class="menu-list">
            ${event.menuHighlights.map(item => `<li>${item}</li>`).join("")}
          </ul>
          <div class="event-info">
            <dt>Additional Details:</dt>
            <dd>${event.additionalDetails}</dd>
            <dt>Dress Code:</dt>
            <dd>${event.dressCode}</dd>
            <dt>Reservations:</dt>
            <dd>${event.reservations}</dd>
          </div>
          <div class="event-buttons">
            <a href="${event.registerLink}" target="_blank" class="btn">Register Now</a>
            <a href="events.html" class="btn secondary">Back to Events</a>
          </div>
        `;
        detailContainer.innerHTML = eventHTML;
      })
      .catch(err => {
        console.error("Error loading event details:", err);
        detailContainer.innerHTML = "<p>Error loading event details.</p>";
      });
  }
  
  // Run only on event-detail.html
  if (document.getElementById("event-detail-content")) {
    loadEventDetail();
  }
  