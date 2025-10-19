// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const loadingOverlay = document.getElementById('loadingOverlay');
const qrCards = document.querySelectorAll('.qr-card');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scrolling for Navigation Links
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

// QR Code Click Handlers
qrCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        // Show loading overlay
        showLoading();
        
        // Specific URLs for each QR code
        const qrUrls = [
            'https://aiskillshouse.com/student/qr-mediator?uid=7697&promptId=22', // QR Code 1
            'https://aiskillshouse.com/student/qr-mediator?uid=7697&promptId=21', // QR Code 2
            'https://aiskillshouse.com/student/qr-mediator?uid=7697&promptId=20', // QR Code 3
            'https://aiskillshouse.com/student/qr-mediator?uid=7697&promptId=19', // QR Code 4
            'https://aiskillshouse.com/student/qr-mediator?uid=7697&promptId=18'  // QR Code 5
        ];
        
        // Simulate loading delay for better UX
        setTimeout(() => {
            hideLoading();
            // Directly open the URL for this QR code
            window.open(qrUrls[index] || 'https://aiskillshouse.com/student/qr-mediator?uid=7697&promptId=22', '_blank');
        }, 1500);
        
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // Track interaction (for analytics if needed)
        trackQRClick(index + 1);
    });
    
    // Add hover sound effect (optional)
    card.addEventListener('mouseenter', () => {
        playHoverSound();
    });
});

// Loading Overlay Functions
function showLoading() {
    loadingOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function hideLoading() {
    loadingOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Track QR Code Clicks (Analytics placeholder)
function trackQRClick(qrNumber) {
    console.log(`QR Code #${qrNumber} clicked`);
    // Here you can add analytics tracking code
    // Example: gtag('event', 'qr_code_click', { qr_number: qrNumber });
}

// Optional hover sound (placeholder)
function playHoverSound() {
    // Placeholder for hover sound effect
    // You can add audio here if desired
}

// Scroll-based Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.classList.add('fade-in');
        observer.observe(title);
    });
    
    // Add slide-in animations to cards
    document.querySelectorAll('.step-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    document.querySelectorAll('.qr-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Add slide-in animation to ambassador card
    document.querySelector('.ambassador-card')?.classList.add('slide-in-left');
    observer.observe(document.querySelector('.ambassador-card'));
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset > 50;
    
    if (scrolled) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Hero Button Interactions
document.querySelectorAll('.hero .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Floating Cards Animation Enhancement
document.querySelectorAll('.floating-card').forEach((card, index) => {
    // Add random rotation and position variations
    const randomDelay = Math.random() * 2;
    const randomRotation = (Math.random() - 0.5) * 10;
    
    card.style.animationDelay = `${randomDelay}s`;
    card.style.transform = `rotate(${randomRotation}deg)`;
    
    // Add mouse interaction
    card.addEventListener('mouseenter', () => {
        card.style.transform = `rotate(${randomRotation}deg) scale(1.1)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `rotate(${randomRotation}deg) scale(1)`;
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        element.style.transform += ` translateY(${scrolled * speed}px)`;
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Add rainbow animation to the page
    document.body.style.animation = 'rainbow 2s infinite';
    
    // Show special message
    const easterEgg = document.createElement('div');
    easterEgg.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7);
            background-size: 400% 400%;
            animation: rainbow 1s infinite;
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            z-index: 10000;
            color: white;
            font-weight: bold;
            font-size: 1.5rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        ">
            🎉 Easter Egg Activated! 🎉<br>
            <small style="font-size: 1rem; opacity: 0.9;">You found the secret Konami code!</small>
        </div>
    `;
    
    document.body.appendChild(easterEgg);
    
    setTimeout(() => {
        easterEgg.remove();
        document.body.style.animation = '';
    }, 3000);
}

// Add rainbow keyframes
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;
document.head.appendChild(rainbowStyle);

// Performance optimization: Debounced scroll handler
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

// Replace direct scroll listeners with debounced versions
const debouncedScrollHandler = debounce(() => {
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset > 50;
    
    if (scrolled) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading animation on page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements in sequence
    setTimeout(() => {
        document.querySelector('.hero-title')?.classList.add('visible');
    }, 300);
    
    setTimeout(() => {
        document.querySelector('.hero-description')?.classList.add('visible');
    }, 600);
    
    setTimeout(() => {
        document.querySelector('.hero-buttons')?.classList.add('visible');
    }, 900);
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Google Gemini Student Community Website Loaded');
    console.log('✨ Enhanced with modern animations and interactions');
    console.log('🎯 Try the Konami code for a surprise!');
});