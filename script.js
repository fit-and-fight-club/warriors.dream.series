// Navigation Active Link Update
document.addEventListener('DOMContentLoaded', function() {
    // Update active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Handle all nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Get the href attribute
        const href = link.getAttribute('href');
        
        // Check if this link matches the current page
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (href && href.includes(currentPage.replace('.html', '')))) {
            link.classList.add('active');
        }
    });

    // Ensure rankings tab is always visible
    makeRankingTabVisible();
});

// Function to ensure ranking tab is always visible
function makeRankingTabVisible() {
    const rankingTab = document.getElementById('rankings-tab');
    if (rankingTab) {
        rankingTab.style.display = 'block';
        rankingTab.style.visibility = 'visible';
    }
}

// Handle navigation clicks
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.classList.contains('nav-link')) {
        // Update active state
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
        });
        e.target.classList.add('active');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Mobile menu toggle (if needed)
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

// Form submission handler for contact form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe event cards and other elements
document.querySelectorAll('.event-card, .ranking-card, .team-member, .news-card, .video-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Countdown timer for upcoming events (optional enhancement)
function initCountdown() {
    const upcomingDate = new Date('2026-11-15').getTime(); // Example date
    
    const countdownUpdate = setInterval(function() {
        const now = new Date().getTime();
        const distance = upcomingDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            // You can update countdown elements here if needed
        } else {
            clearInterval(countdownUpdate);
        }
    }, 1000);
}

// Initialize when DOM is ready
window.addEventListener('load', function() {
    // Rankings tab always visible
    makeRankingTabVisible();
    
    // Initialize any other features
    initCountdown();
});

// Ensure ranking tab stays visible on every page
window.addEventListener('beforeunload', function() {
    makeRankingTabVisible();
});

// Check ranking tab visibility periodically
setInterval(makeRankingTabVisible, 1000);
