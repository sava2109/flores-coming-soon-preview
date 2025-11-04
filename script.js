// ===== LANGUAGE TRANSLATIONS =====
const translations = {
    sr: {
        subtitle: "Sajt u pripremi",
        days: "Dana",
        hours: "Sati",
        minutes: "Minuta",
        seconds: "Sekundi",
        "newsletter-title": "Budite prvi obavešteni",
        "newsletter-desc": "Prijavite se i saznajte kada lansiramo",
        "email-placeholder": "Vaša email adresa",
        "subscribe-btn": "Prijavi se",
        "success-message": "✓ Uspešno ste se prijavili!",
        "error-message": "✗ Došlo je do greške, pokušajte ponovo"
    },
    en: {
        subtitle: "Website Under Construction",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
        "newsletter-title": "Be the First to Know",
        "newsletter-desc": "Subscribe to get notified when we launch",
        "email-placeholder": "Your email address",
        "subscribe-btn": "Subscribe",
        "success-message": "✓ Successfully subscribed!",
        "error-message": "✗ An error occurred, please try again"
    }
};

let currentLang = 'sr';

function changeLanguage(lang) {
    currentLang = lang;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update placeholder
    const emailInput = document.getElementById('emailInput');
    if (emailInput) {
        emailInput.placeholder = translations[lang]['email-placeholder'];
    }
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Language switcher event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
});

// ===== COUNTDOWN TIMER =====
// Set your launch date here (Month is 0-indexed: 0 = January, 11 = December)
const launchDate = new Date(2025, 11, 31, 23, 59, 59).getTime(); // December 31, 2025, 23:59:59

function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// ===== EMAIL SUBSCRIPTION WITH SPAM PROTECTION =====
const subscribeForm = document.getElementById('subscribeForm');
const emailInput = document.getElementById('emailInput');
const subscribeBtn = document.getElementById('subscribeBtn');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

// Google Sheets Configuration
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzSNYiy6j2BphXuThYNkIhm8Fvm3E3r88KwhH4BwLpuCfkHf56mLk8JQaFZH_UOm_6OVA/exec';

// Rate limiting - Track submissions
const RATE_LIMIT_KEY = 'flores_email_submissions';
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_SUBMISSIONS = 3; // Max 3 submissions per minute

function checkRateLimit() {
    const now = Date.now();
    const submissions = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '[]');
    
    // Filter out old submissions outside the time window
    const recentSubmissions = submissions.filter(time => now - time < RATE_LIMIT_WINDOW);
    
    if (recentSubmissions.length >= MAX_SUBMISSIONS) {
        return false; // Rate limit exceeded
    }
    
    // Add current submission
    recentSubmissions.push(now);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recentSubmissions));
    
    return true;
}

function isValidEmail(email) {
    // Basic email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(type) {
    // Hide both messages first
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    // Show the appropriate message
    if (type === 'success') {
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    } else if (type === 'error') {
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }
}

subscribeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const honeypot = subscribeForm.querySelector('input[name="honeypot"]').value;
    
    // Spam protection: Honeypot field
    if (honeypot) {
        console.log('Spam detected: honeypot filled');
        showMessage('error');
        return;
    }
    
    // Email validation
    if (!isValidEmail(email)) {
        showMessage('error');
        return;
    }
    
    // Rate limiting
    if (!checkRateLimit()) {
        showMessage('error');
        return;
    }
    
    // Disable button during submission
    subscribeBtn.disabled = true;
    subscribeBtn.style.opacity = '0.6';
    subscribeBtn.style.cursor = 'not-allowed';
    
    const language = currentLang;
    const date = new Date().toISOString();
    
    try {
        // Send to Google Sheets
        const response = await fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                date: date,
                language: language
            })
        });
        
        // Show success message
        showMessage('success');
        
        // Clear form
        emailInput.value = '';
        
    } catch (error) {
        console.error('Error:', error);
        showMessage('error');
    } finally {
        // Re-enable button
        setTimeout(() => {
            subscribeBtn.disabled = false;
            subscribeBtn.style.opacity = '1';
            subscribeBtn.style.cursor = 'pointer';
        }, 2000);
    }
});
