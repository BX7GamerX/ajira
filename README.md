# Ajira Club Static Website - Architecture Documentation

## 1. Overview
The **Ajira Club Static Website** serves as an online brochure and notice board for students and other stakeholders. It provides information about the club, training programs, job categories, events, and weekly announcements. The website is built using HTML, CSS, and JavaScript to ensure fast performance, ease of maintenance, and scalability.

---

## 2. Technology Stack

### **Frontend Technologies:**
- **HTML5** - Structure and content.
- **CSS3** - Styling and responsive design.
- **JavaScript (Vanilla)** - Interactivity and dynamic updates.
- **Bootstrap/Tailwind CSS** (Optional) - For enhanced UI design and responsiveness.

### **Backend/Content Management (Optional for Notice Board Updates):**
- **Markdown/JSON files** - If static updates are preferred.
- **Google Sheets API / Firebase** - If a simple CMS-like functionality is needed.

### **Hosting & Deployment:**
- **GitHub Pages / Netlify / Vercel** - Free hosting solutions for static websites.
- **Custom Domain Integration** - Recommended for branding.
- **S3 Bucket + CloudFront (AWS) / Truehost / Webhost Kenya** - For long-term, scalable hosting.

---

## 3. Website Structure

### **3.1 Folder Structure**
```
/ajira-club-website
│── index.html            # Homepage
│── about.html            # About Ajira Club
│── training.html         # Training & Mentorship Details
│── events.html           # Events Calendar & Past Events
│── notice-board.html     # Weekly Announcements
│── contact.html          # Contact & Social Media Links
│── assets/               # Images, Icons, Logos
│── css/
│   ├── styles.css        # Main stylesheet
│── js/
│   ├── script.js         # General site-wide scripts
│   ├── noticeBoard.js    # Dynamic updates to the notice board
│── data/
│   ├── notices.json      # If notice board updates via JSON
│── README.md             # Documentation
```

---

## 4. Page Layout & Functionalities

### **4.1 Homepage (`index.html`)**
- Overview of the Ajira Club.
- Call-to-action buttons for registration and training.
- Highlights of upcoming events & recent notices.

### **4.2 About Us (`about.html`)**
- Purpose & mission of the Ajira Club.
- Ajira Digital Program guiding principles.
- Benefits of membership.

### **4.3 Training & Mentorship (`training.html`)**
- Job categories trained and mentored.
- Steps to register for training.
- Links to training resources.

### **4.4 Events (`events.html`)**
- Upcoming events with date, venue, and details.
- Past event highlights.
- Interactive event calendar (if applicable).

### **4.5 Notice Board (`notice-board.html`)**
- Weekly updated announcements.
- Dynamically fetches notices from `notices.json` (or Google Sheets API if automated).

### **4.6 Contact (`contact.html`)**
- Email & phone contacts.
- Links to social media pages.
- Embedded Google Map (if necessary).

---

## 5. Styling & UI Design

### **5.1 Color Scheme**
- Primary Colors: Extracted from [Ajira Digital Website](https://ajiradigital.go.ke/#/index).
- Secondary Colors: To be introduced based on user feedback.
- Typography: Modern sans-serif fonts for readability.
- Icons: Font Awesome or Material Icons for visual elements.

### **5.2 Responsive Design**
- Mobile-first approach.
- Uses CSS Grid & Flexbox for layout.
- Hamburger menu for smaller screens.

---

## 6. Dynamic Features

### **6.1 Notice Board Automation**
- Notices stored in `notices.json` file.
- JavaScript dynamically loads and displays the latest notices.
- Option to integrate Google Sheets API for easier updates.

### **6.2 Event Countdown Timer (Optional)**
- JavaScript-based countdown timer for upcoming events.

### **6.3 Contact Form Submission**
- Uses a form submission service (e.g., Formspree, Netlify Forms) to collect inquiries.

### **6.4 Dark Mode Toggle**
- Allows users to switch between light and dark themes.
- Saves user preference in localStorage.

### **6.5 Toast Notifications**
- Provides feedback to users for actions like form submissions.

---

## 7. Deployment & Maintenance

### **7.1 Hosting Recommendation**
- **Free Hosting**: GitHub Pages, Netlify, or Vercel.
- **Paid Hosting**: Truehost, Webhost Kenya, or AWS S3 + CloudFront for better control.

### **7.2 Maintenance Plan**
- **Weekly notice board updates** (Admin edits `notices.json` or updates Google Sheets API).
- **Monthly event updates** (Adding/deleting upcoming events in `events.html`).
- **Yearly design review** (UI improvements and feature enhancements).

---

## 8. Security Considerations
- Ensure no sensitive data is stored in client-side scripts.
- Use HTTPS for secure content delivery.
- Implement content security policies to prevent XSS attacks.
- If using Google Sheets API, limit access to trusted editors only.

---

## 9. Next Steps
1. **Finalize UI Mockups** - Agree on the design layout.
2. **Develop Static Pages** - Code HTML, CSS, and JavaScript files.
3. **Integrate Dynamic Features** - Implement notice board automation.
4. **Test Responsiveness & Compatibility** - Across different devices and browsers.
5. **Deploy Website** - Choose hosting and push live.

By following this architecture, the Ajira Club website will be efficient, visually appealing, and easy to maintain.

