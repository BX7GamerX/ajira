// Ensure JavaScript runs after the document loads
document.addEventListener("DOMContentLoaded", function () {
    console.log("Website Loaded Successfully!");

    // Mobile Menu Toggle
    const menuToggle = document.querySelector("#menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    // Dynamic Notice Board Data (This can be fetched from a backend in the future)
    const notices = [
        "📢 New Ajira Digital training starts this Monday. Register Now!",
        "📅 Upcoming Webinar: ‘Freelancing 101’ on Friday at 3 PM. Join via Zoom!",
        "🚀 Exciting Job Opportunity: Remote Digital Marketing Intern – Apply Today!",
        "💡 Weekly Tip: Improve your skills by practicing on online platforms like Upwork & Fiverr!"
    ];

    // Display Notices Dynamically
    function updateNotices() {
        const noticeBoard = document.querySelector("#notices");
        noticeBoard.innerHTML = ""; // Clear existing notices

        notices.forEach((notice, index) => {
            let noticeItem = document.createElement("div");
            noticeItem.className = "event";
            noticeItem.innerHTML = `<p>${notice}</p>`;
            noticeBoard.appendChild(noticeItem);
        });
    }

    // Update Notices on Page Load
    updateNotices();

    // Smooth Scrolling Effect for Menu Links
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (e) {
            if (this.hash !== "") {
                e.preventDefault();
                let hash = this.hash;
                document.querySelector(hash).scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Auto-update Notice Board Every Week (Simulated)
    setInterval(() => {
        console.log("Weekly Notice Board Update Triggered!");
        updateNotices();
    }, 7 * 24 * 60 * 60 * 1000); // Every 7 days

    // Lazy Loading Images
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Hide loader once the page is fully loaded
window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.style.display = 'none';
});

// Form Submission
async function handleFormSubmit(form) {
    const formData = new FormData(form);
    try {
        const response = await fetch('https://api.example.com/register', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            showToast('Registration successful!', 'success');
        } else {
            showToast('Registration failed. Please try again.', 'error');
        }
    } catch (error) {
        showToast('An error occurred. Please try again later.', 'error');
    }
}

// Enhanced Toast Notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    });
}

// Toast Notification System
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
        toast.remove();
    }, duration);
}

// Form Validation
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            showToast(`Please fill in ${input.name}`);
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Dark Mode Toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.id = 'dark-mode-toggle';
darkModeToggle.innerHTML = '🌙';
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '☀️';
}
