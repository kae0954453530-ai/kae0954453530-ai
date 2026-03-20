/* ========================================
   JAVASCRIPT INTERACTIVITY
   ======================================== */

// ========================================
// Dark Mode Toggle
// ========================================

const darkModeBtn = document.getElementById('darkModeBtn');
const body = document.body;

// Check for saved dark mode preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'enabled') {
    body.classList.add('dark-mode');
    updateDarkModeIcon();
}

darkModeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        updateDarkModeIcon();
    } else {
        localStorage.setItem('darkMode', 'disabled');
        updateDarkModeIcon();
    }
});

function updateDarkModeIcon() {
    const icon = darkModeBtn.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ========================================
// Mobile Menu Toggle
// ========================================

const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');
const navLinks = document.querySelectorAll('.nav-link');

navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
    navbarToggle.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        navbarToggle.classList.remove('active');
    });
});

// ========================================
// Smooth Scrolling
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Intersection Observer for Animations
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.certificate-card, .project-card, .work-item').forEach(el => {
    observer.observe(el);
});

// ========================================
// Contact Form Handler
// ========================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission (in a real scenario, this would send data to a server)
    showFormMessage('Sending your message...', 'info');
    
    // Simulate API call with a delay
    setTimeout(() => {
        // Here you would typically send the data to a backend service
        // For now, we'll just show a success message
        
        showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }, 1500);
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    if (type === 'error') {
        // Auto-clear error messages after 4 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 4000);
    }
}

// ========================================
// Active Navigation Link Highlighting
// ========================================

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-color)';
        }
    });
});

// ========================================
// Scroll to Top Button (Optional Enhancement)
// ========================================

// Create scroll-to-top button dynamically
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0066CC, #FF0000);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll-top button
scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
});

// ========================================
// Project Links Enhancement
// ========================================

const projectLinks = document.querySelectorAll('.project-link');
projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // In a real scenario, this would open the project details or external link
        alert('Project link - This would open the full project details or external link');
    });
});

// ========================================
// Certificate Badge Click Handler
// ========================================

const certificateBadges = document.querySelectorAll('.certificate-badge');
certificateBadges.forEach(badge => {
    badge.style.cursor = 'pointer';
    badge.addEventListener('click', function() {
        // Get the year from the badge
        const year = this.textContent;
        console.log(`Certificate from year: ${year}`);
        // Could implement filtering by year here
    });
});

// ========================================
// Lazy Loading for Images (Performance)
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// Add Animation on Page Load
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ========================================
// Keyboard Navigation Enhancement
// ========================================

document.addEventListener('keydown', (e) => {
    // Press 'H' to go to home
    if (e.key === 'h' || e.key === 'H') {
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// ========================================
// Social Media Links
// ========================================

const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// Utility: Debounce Function for Performance
// ========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events for better performance
const debouncedScroll = debounce(() => {
    // Custom scroll logic here
}, 250);

window.addEventListener('scroll', debouncedScroll);

// ========================================
// Console Welcome Message
// ========================================

console.log(
    '%cWelcome to My Portfolio! 👋',
    'font-size: 24px; font-weight: bold; color: #0066CC;'
);
console.log(
    '%cFeel free to explore the code and reach out for any collaboration opportunities.',
    'font-size: 14px; color: #666;'
);

// ========================================
// Local Storage: Save User Preferences
// ========================================

// Theme preference
window.addEventListener('beforeunload', () => {
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('userTheme', theme);
});

// ========================================
// Initial Load Check
// ========================================

window.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
    
    console.log('✓ Portfolio loaded successfully!');
});
