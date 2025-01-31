/*script.js */
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

// Enhanced Form Validation
function validateForm(form) {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    form.querySelectorAll('input').forEach(input => {
        input.classList.remove('error');
        if (!input.value.trim()) {
            showInputError(input, 'This field is required');
            isValid = false;
        }
        if (input.type === 'email' && !emailRegex.test(input.value)) {
            showInputError(input, 'Invalid email format');
            isValid = false;
        }
    });
    return isValid;
}

function showInputError(input, message) {
    const errorElement = input.nextElementSibling || document.createElement('small');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    input.classList.add('error');
    input.after(errorElement);
}

// Updated Dark Mode Toggle
function toggleDarkMode() {
    document.documentElement.setAttribute('data-theme',
        document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    localStorage.setItem('theme', document.documentElement.getAttribute('data-theme'));
}

// Initialize dark mode from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

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

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registration-form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit code

        // Store the code temporarily (could be stored in a database later)
        localStorage.setItem("verificationCode", verificationCode);
        localStorage.setItem("pendingEmail", email);

        // Send the email (using a mock API for now)
        await sendVerificationEmail(email, verificationCode);
    });
});

// Simulated Email Sending Function (Replace with backend API)
async function sendVerificationEmail(email, code) {
    alert(`Verification code sent to ${email}: ${code}`);
    
    // Show verification prompt
    setTimeout(() => {
        let userCode = prompt("Enter the 6-digit verification code sent to your email:");
        validateVerificationCode(userCode);
    }, 1000);
}

// Validate the verification code
function validateVerificationCode(userCode) {
    let storedCode = localStorage.getItem("verificationCode");
    let pendingEmail = localStorage.getItem("pendingEmail");

    if (userCode == storedCode) {
        saveMemberData(pendingEmail);
        alert("Email verified! Registration successful.");
        localStorage.removeItem("verificationCode");
        localStorage.removeItem("pendingEmail");
    } else {
        alert("Invalid verification code. Please try again.");
    }
}

// Save user data after verification (local JSON storage)
function saveMemberData(email) {
    let members = JSON.parse(localStorage.getItem("members")) || [];
    members.push({ email });
    localStorage.setItem("members", JSON.stringify(members));
}

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
});

// Highlight active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        if (top >= offset && top < offset + height) {
            current = sec.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active-link');
        }
    });
});

// Simple Lightbox Initialization (no external library used)
document.querySelectorAll('.lightbox').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Lightbox placeholder: open media in a modal here.');
    });
});

// Toggle “header-fade” based on scroll position
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('header-fade');
    } else {
        header.classList.remove('header-fade');
    }
});

// Track scroll direction and toggle “header-hidden”
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
