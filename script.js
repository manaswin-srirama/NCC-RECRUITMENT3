// --- CONFIGURATION ---
let config = {};
let eventDate, googleFormUrl, quotes;
let currentQuoteIndex = 0;

// Load configuration
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        config = await response.json();
        
        eventDate = new Date(config.event.date).getTime();
        googleFormUrl = config.registration.googleFormUrl;
        quotes = config.typewriter.quotes;
    } catch (error) {
        console.error('Failed to load config:', error);
        // Fallback configuration
        eventDate = new Date("2025-08-23T07:00:00").getTime();
        googleFormUrl = "https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE";
        quotes = ["Unity and Discipline.", "One for All, All for One.", "Service Before Self."];
    }
}

// --- DOM ELEMENTS ---
let pageHome, pageAbout, pageJoin, pageContact;
let daysEl, hoursEl, minutesEl, secondsEl, typewriterEl, registerLink, qrCodeImg;
let mobileMenuBtn, mobileMenu;
let navLinks = [];

// --- UTILITY FUNCTIONS ---
function initializeElements() {
    pageHome = document.getElementById('page-home');
    pageAbout = document.getElementById('page-about');
    pageJoin = document.getElementById('page-join');
    pageContact = document.getElementById('page-contact');
    
    daysEl = document.getElementById('days');
    hoursEl = document.getElementById('hours');
    minutesEl = document.getElementById('minutes');
    secondsEl = document.getElementById('seconds');
    typewriterEl = document.getElementById('typewriter');
    registerLink = document.getElementById('register-link');
    qrCodeImg = document.getElementById('qr-code-img');
    
    mobileMenuBtn = document.getElementById('mobile-menu-btn');
    mobileMenu = document.getElementById('mobile-menu');
    
    // Get all navigation links
    navLinks = [
        { element: document.getElementById('nav-home'), mobileElement: document.getElementById('mobile-nav-home'), page: pageHome },
        { element: document.getElementById('nav-about'), mobileElement: document.getElementById('mobile-nav-about'), page: pageAbout },
        { element: document.getElementById('nav-join'), mobileElement: document.getElementById('mobile-nav-join'), page: pageJoin },
        { element: document.getElementById('nav-contact'), mobileElement: document.getElementById('mobile-nav-contact'), page: pageContact }
    ];
}

// --- PAGE NAVIGATION ---
function showPage(pageToShow) {
    const pages = [pageHome, pageAbout, pageJoin, pageContact];
    pages.forEach(page => {
        if (page === pageToShow) {
            page.style.opacity = 0;
            page.classList.remove('hidden');
            setTimeout(() => page.style.opacity = 1, 50);
        } else {
            page.style.opacity = 0;
            setTimeout(() => page.classList.add('hidden'), 500);
        }
    });
    window.scrollTo(0, 0); // Scroll to top on page change
    
    // Update active navigation links
    updateActiveNavLink(pageToShow);
    
    // Close mobile menu if open
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
    }
}

function updateActiveNavLink(activePage) {
    navLinks.forEach(link => {
        const isActive = link.page === activePage;
        if (link.element) {
            link.element.classList.toggle('active', isActive);
        }
        if (link.mobileElement) {
            link.mobileElement.classList.toggle('active', isActive);
        }
    });
}

function toggleMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

function setupNavigationEvents() {
    // Desktop navigation
    if (navLinks[0].element) navLinks[0].element.addEventListener('click', (e) => { e.preventDefault(); showPage(pageHome); });
    if (navLinks[1].element) navLinks[1].element.addEventListener('click', (e) => { e.preventDefault(); showPage(pageAbout); });
    if (navLinks[2].element) navLinks[2].element.addEventListener('click', (e) => { e.preventDefault(); showPage(pageJoin); });
    if (navLinks[3].element) navLinks[3].element.addEventListener('click', (e) => { e.preventDefault(); showPage(pageContact); });
    
    // Mobile navigation
    if (navLinks[0].mobileElement) navLinks[0].mobileElement.addEventListener('click', (e) => { e.preventDefault(); showPage(pageHome); });
    if (navLinks[1].mobileElement) navLinks[1].mobileElement.addEventListener('click', (e) => { e.preventDefault(); showPage(pageAbout); });
    if (navLinks[2].mobileElement) navLinks[2].mobileElement.addEventListener('click', (e) => { e.preventDefault(); showPage(pageJoin); });
    if (navLinks[3].mobileElement) navLinks[3].mobileElement.addEventListener('click', (e) => { e.preventDefault(); showPage(pageContact); });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Set initial active page (Home)
    showPage(pageHome);
}

// --- COUNTDOWN LOGIC ---
function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        const countdownTimer = document.getElementById('countdown-timer');
        if(countdownTimer) {
            countdownTimer.innerHTML = '<h3 class="text-4xl font-bold text-red-600 army-header">The Event has commenced!</h3>';
        }
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

function startCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// --- TYPEWRITER LOGIC ---
function startTypewriter() {
    if (!typewriterEl) return;
    
    const currentQuote = quotes[currentQuoteIndex];
    typewriterEl.innerHTML = '';
    typewriterEl.classList.remove('typewriter-text');
    
    // Force reflow to restart animation
    void typewriterEl.offsetWidth;
    
    typewriterEl.classList.add('typewriter-text');
    typewriterEl.textContent = currentQuote;

    setTimeout(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        startTypewriter();
    }, config.typewriter?.displayDuration || 7000);
}

// --- GALLERY LOGIC ---
function setupGallery() {
    const slides = document.querySelectorAll('.gallery-slide');
    const galleryContainer = document.querySelector('.gallery-container');
    
    if (!slides.length || !galleryContainer) return;
    
    let currentSlide = 0;
    let isPlaying = true;
    let intervalId = null;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev');
            
            if (i === index) {
                slide.classList.add('active');
            } else if (i === (index - 1 + slides.length) % slides.length) {
                slide.classList.add('prev');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        if (!intervalId) {
            const autoAdvanceInterval = config.gallery?.autoAdvanceInterval || 5000;
            intervalId = setInterval(nextSlide, autoAdvanceInterval);
        }
        isPlaying = true;
        galleryContainer.classList.remove('paused');
        galleryContainer.style.cursor = 'pointer';
    }

    function stopSlideshow() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        isPlaying = false;
        galleryContainer.classList.add('paused');
        galleryContainer.style.cursor = 'pointer';
    }

    function toggleSlideshow() {
        if (isPlaying) {
            stopSlideshow();
        } else {
            startSlideshow();
        }
    }

    // Initialize gallery
    showSlide(currentSlide);
    
    // Add click event listener to toggle slideshow
    galleryContainer.addEventListener('click', toggleSlideshow);
    
    // Start slideshow
    startSlideshow();
}

// --- SCROLL ANIMATION LOGIC ---
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate');
    
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for browsers without IntersectionObserver
        animatedElements.forEach(el => el.classList.add('visible'));
    }
}

// --- REGISTRATION SETUP ---
function setupRegistration() {
    if (!registerLink || !qrCodeImg) return;
    
    // Update registration links
    if (googleFormUrl.includes("YOUR_FORM_ID_HERE")) {
        console.warn("CRITICAL: Please update the 'googleFormUrl' in the script with your actual registration link.");
        registerLink.href = "#";
        qrCodeImg.alt = "QR Code not available - please configure the link";
    } else {
        registerLink.href = googleFormUrl;
        const qrSize = config.registration?.qrCodeSize || "150x150";
        qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}&data=${encodeURIComponent(googleFormUrl)}`;
        qrCodeImg.alt = "Scan to register for 2(A)CTR NCC GITAM";
    }
}

// --- INITIALIZATION ---
async function initialize() {
    await loadConfig();
    initializeElements();
    setupRegistration();
    setupNavigationEvents();
    startCountdown();
    startTypewriter();
    setupScrollAnimations();
    setupGallery();
}

// --- ERROR HANDLING ---
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// --- RUN ON PAGE LOAD ---
document.addEventListener('DOMContentLoaded', initialize);
