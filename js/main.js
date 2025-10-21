// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Theme Toggle
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Newsletter form submission
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to your server
        console.log('Subscribed with email:', email);
        
        // Show success message
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }, 3000);
    });
}

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animations
window.addEventListener('load', () => {
    // Set initial scroll position for navbar
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
    
    // Trigger initial animation check
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Course module accordion functionality
const moduleHeaders = document.querySelectorAll('.module-header');
if (moduleHeaders.length > 0) {
    moduleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');
        });
    });
}

// Mark lesson as completed
const lessonCompleteButtons = document.querySelectorAll('.lesson-complete');
if (lessonCompleteButtons.length > 0) {
    lessonCompleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const lessonId = button.closest('.lesson').dataset.lessonId;
            const isCompleted = button.classList.contains('completed');
            
            // Toggle completed state
            if (isCompleted) {
                button.classList.remove('completed');
                // Remove from localStorage
                const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
                const updatedLessons = completedLessons.filter(id => id !== lessonId);
                localStorage.setItem('completedLessons', JSON.stringify(updatedLessons));
            } else {
                button.classList.add('completed');
                // Add to localStorage
                const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
                if (!completedLessons.includes(lessonId)) {
                    completedLessons.push(lessonId);
                    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
                }
            }
            
            // Update progress
            updateCourseProgress();
        });
    });
}

// Load completed lessons from localStorage
function loadCompletedLessons() {
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    completedLessons.forEach(lessonId => {
        const lessonElement = document.querySelector(`.lesson[data-lesson-id="${lessonId}"]`);
        if (lessonElement) {
            const completeButton = lessonElement.querySelector('.lesson-complete');
            if (completeButton) {
                completeButton.classList.add('completed');
            }
        }
    });
    
    // Update progress on load
    updateCourseProgress();
}

// Update course progress
function updateCourseProgress() {
    const totalLessons = document.querySelectorAll('.lesson').length;
    const completedLessons = document.querySelectorAll('.lesson-complete.completed').length;
    const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    
    // Update progress bar if it exists
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${progress}% Complete`;
    }
}

// Initialize course progress on page load
if (document.querySelector('.course-progress')) {
    document.addEventListener('DOMContentLoaded', () => {
        loadCompletedLessons();
    });
}
