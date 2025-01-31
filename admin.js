//admin.js
// Load saved notices
document.addEventListener("DOMContentLoaded", () => {
    loadNotices();
    loadEvents();
});

// Manage Notices
function addNotice() {
    let notice = document.getElementById("notice-text").value;
    if (!notice) return;

    let notices = JSON.parse(localStorage.getItem("notices")) || [];
    notices.push(notice);
    localStorage.setItem("notices", JSON.stringify(notices));

    loadNotices();
}

function loadNotices() {
    let notices = JSON.parse(localStorage.getItem("notices")) || [];
    let noticeList = document.getElementById("notice-list");
    noticeList.innerHTML = "";

    notices.forEach((notice, index) => {
        let li = document.createElement("li");
        li.textContent = notice;
        li.innerHTML += ` <button onclick="deleteNotice(${index})">❌</button>`;
        noticeList.appendChild(li);
    });
}

function deleteNotice(index) {
    let notices = JSON.parse(localStorage.getItem("notices")) || [];
    notices.splice(index, 1);
    localStorage.setItem("notices", JSON.stringify(notices));
    loadNotices();
}

// Manage Events
function addEvent() {
    let name = document.getElementById("event-name").value;
    let date = document.getElementById("event-date").value;
    if (!name || !date) return;

    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.push({ name, date });
    localStorage.setItem("events", JSON.stringify(events));

    loadEvents();
}

function loadEvents() {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    let eventList = document.getElementById("event-list");
    eventList.innerHTML = "";

    events.forEach((event, index) => {
        let li = document.createElement("li");
        li.textContent = `${event.name} - ${event.date}`;
        li.innerHTML += ` <button onclick="deleteEvent(${index})">❌</button>`;
        eventList.appendChild(li);
    });
}

function deleteEvent(index) {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    loadEvents();
}
