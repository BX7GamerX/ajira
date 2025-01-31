document.addEventListener('DOMContentLoaded', () => {
    loadNotices();
    loadEvents();
});

// Notice Management
function addNotice() {
    const notice = document.getElementById('notice-text').value.trim();
    if (!notice) return;

    const notices = JSON.parse(localStorage.getItem('notices')) || [];
    notices.push(notice);
    localStorage.setItem('notices', JSON.stringify(notices));
    loadNotices();
}

function loadNotices() {
    const notices = JSON.parse(localStorage.getItem('notices')) || [];
    const noticeList = document.getElementById('notice-list');
    
    noticeList.innerHTML = notices.map((notice, index) => `
        <li>
            ${notice}
            <button onclick="deleteNotice(${index})">❌</button>
        </li>
    `).join('');
}

function deleteNotice(index) {
    const notices = JSON.parse(localStorage.getItem('notices')) || [];
    notices.splice(index, 1);
    localStorage.setItem('notices', JSON.stringify(notices));
    loadNotices();
}

// Event Management
function addEvent() {
    const name = document.getElementById('event-name').value.trim();
    const date = document.getElementById('event-date').value;
    if (!name || !date) return;

    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.push({ name, date });
    localStorage.setItem('events', JSON.stringify(events));
    loadEvents();
}

function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const eventList = document.getElementById('event-list');
    
    eventList.innerHTML = events.map((event, index) => `
        <li>
            ${event.name} - ${new Date(event.date).toLocaleDateString()}
            <button onclick="deleteEvent(${index})">❌</button>
        </li>
    `).join('');
}

function deleteEvent(index) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(events));
    loadEvents();
}