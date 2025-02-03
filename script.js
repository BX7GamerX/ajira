document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Load dynamic content
    loadEvents();
    loadTraining();
    loadPartners();

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('mainHeader');
        if (window.scrollY > 100) {
            header.classList.remove('transparent-header');
            header.style.background = 'rgba(0, 122, 61, 0.95)';
        } else {
            header.classList.add('transparent-header');
            header.style.background = 'rgba(0, 122, 61, 0.8)';
        }
    });

    // Lightbox Functionality
    const lightbox = document.getElementById('kenyaLightbox');
    const closeBtn = document.querySelector('.close-btn');
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            const mediaSrc = item.href;
            const mediaType = item.dataset.type;
            showLightbox(mediaSrc, mediaType);
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
});

// Toggle header & to top button
let lastScrollTop = 0;
const header = document.querySelector('.kenyan-nav');
const toTopBtn = document.getElementById('toTopBtn');

window.addEventListener('scroll', () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
        header.style.top = '-80px'; // hide header
    } else {
        header.style.top = '0'; // show header
    }
    lastScrollTop = st <= 0 ? 0 : st;

    toTopBtn.style.display = st > 200 ? 'block' : 'none';
});

// Scroll to top
toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const calendarGrid = document.getElementById('eventCalendar');
    
    calendarGrid.innerHTML = events.map(event => `
        <div class="event-card">
            ${event.image ? `<img src="${event.image}" alt="${event.name} image" class="event-img">` : ''}
            <h3>${event.name}</h3>
            <p>📅 ${new Date(event.date).toLocaleDateString()}</p>
            <button class="rsvp-btn" onclick="handleRSVP('${event.name}')">
                RSVP Now
            </button>
        </div>
    `).join('');
}

// Adjust loadTraining to reduce lag
function loadTraining() {
    setTimeout(() => {
        const trainingContainer = document.getElementById('trainingContainer');
        const trainingData = [
            {
                title: 'Freelancing',
                image: 'assets/images/austin-distel-wD1LRb9OeEo-unsplash.jpg',
                link: 'freelancing.html'
            },
            {
                title: 'Digital Marketing',
                image: 'assets/images/nick-morrison-FHnnjk1Yj7Y-unsplash.jpg',
                link: 'marketing.html'
            },
            {
                title: 'Content Writing',
                image: 'assets/images/nikolay-_qOf3MkCrhk-unsplash.jpg',
                link: 'content-writing.html'
            },
            {
                title: 'Data Management',
                image: 'assets/images/carlos-muza-hpjSkU2UYSU-unsplash.jpg',
                link: 'data-management.html'
            }
        ];

        trainingContainer.innerHTML = trainingData.map(item => `
            <a href="${item.link}" class="training-card">
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>Master the skills for online ${item.title.toLowerCase()} work</p>
            </a>
        `).join('');
    }, 200);
}

function loadPartners() {
    const partners = [
        "https://images.app.goo.gl/7ezJBk33T8XA9Ps57",
        "https://cdn.asp.events/CLIENT_EnergyNe_9A2AD9E1_052D_C466_21FA5F6F01D93263/sites/YES-2023/media/libraries/partners/Kepsa-logo.jpg/fit-in/700x9999/filters:no_upscale()",
        "https://media.licdn.com/dms/image/v2/C4D0BAQHalWFwMBOf0A/company-logo_200_200/company-logo_200_200/0/1668155621400/emobilis_logo?e=2147483647&v=beta&t=myeWEZjo5pewRIcxFuunM82SLVRLCjPn2UlU1bbsF9k"
    ];
    const partnersContainer = document.getElementById('partnersContainer');
    partnersContainer.innerHTML = partners.map(url => `
        <img src="${url}" alt="Partner logo" class="partner-logo">
    `).join('');
}

function showLightbox(src, type) {
    const lightbox = document.getElementById('kenyaLightbox');
    const content = document.querySelector('.modal-content');
    
    content.innerHTML = type === 'image' 
        ? `<img src="${src}" alt="Enlarged content">`
        : `<video controls><source src="${src}" type="video/mp4"></video>`;
    
    lightbox.classList.add('active');
}

// Admin Functions
function handleRSVP(eventName) {
    localStorage.setItem('selectedEvent', eventName);
    window.location.href = 'register.html';
}
// Update form handling
document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('fullName').value,
        id: document.getElementById('idNumber').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    if(validateForm(formData)) {
        try {
            await sendVerificationEmail(formData.email);
            showToast('Verification code sent!', 'success');
        } catch (error) {
            showToast('Error sending verification', 'error');
        }
    }
});

function validateForm({name, id, email, phone}) {
    const idRegex = /^[0-9]{8}$/;
    const phoneRegex = /^\+?254[17]\d{8}$/;
    
    return [
        validateField(name, 'Name is required'),
        validateField(id, 'Valid ID required', idRegex),
        validateField(email, 'Valid email required', /^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        validateField(phone, 'Valid Kenyan number required', phoneRegex)
    ].every(v => v);
}

function validateField(value, errorMsg, regex) {
    const isValid = regex ? regex.test(value) : value.trim() !== '';
    if(!isValid) showToast(errorMsg, 'error');
    return isValid;
}
// Add touch events for mobile
let touchStartX = 0;
document.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
document.addEventListener('touchend', e => {
    if(Math.abs(e.changedTouches[0].clientX - touchStartX) > 50) {
        document.querySelector('.nav-menu').classList.remove('active');
    }
});