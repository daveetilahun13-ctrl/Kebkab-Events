// Kebkab Events - Main JavaScript File
// All interactivity: tabs, form validation, LocalStorage, UI behaviors

// 1. Tabs switching (Events page)
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// 2. Contact Form Validation + LocalStorage
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        // Reset previous message
        formMessage.textContent = '';
        formMessage.style.color = '';

        // Validation
        let isValid = true;
        let errorMessage = '';

        if (name === '') {
            errorMessage += 'Name is required. ';
            isValid = false;
        }

        if (email === '') {
            errorMessage += 'Email is required. ';
            isValid = false;
        } else if (!email.includes('@') || !email.includes('.')) {
            errorMessage += 'Please enter a valid email address. ';
            isValid = false;
        }

        if (message === '') {
            errorMessage += 'Message is required. ';
            isValid = false;
        }

        if (!isValid) {
            formMessage.textContent = errorMessage.trim();
            formMessage.style.color = '#ff6b6b';
            return;
        }

        // Success: save to LocalStorage
        const inquiry = {
            name: name,
            email: email,
            message: message,
            date: new Date().toLocaleString()
        };

        localStorage.setItem('lastInquiry', JSON.stringify(inquiry));

        // Show success message
        formMessage.textContent = 'Thank you! Your inquiry has been sent. We will get back to you soon.';
        formMessage.style.color = '#51cf66';

        // Reset form
        contactForm.reset();
    });
}

// 3. Load last inquiry from LocalStorage (on page load - for demo)
window.addEventListener('load', () => {
    const lastInquiry = localStorage.getItem('lastInquiry');
    if (lastInquiry && formMessage) {
        const data = JSON.parse(lastInquiry);
        formMessage.textContent = `Last inquiry saved: ${data.name} (${data.date})`;
        formMessage.style.color = '#4dabf7';
        formMessage.style.fontSize = '0.95rem';
    }
});

// 4. Optional: Simple package card hover enhancement (if you added packages)
const packageCards = document.querySelectorAll('.package-card');
packageCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');

if (galleryItems.length > 0 && lightbox) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const fullSrc = item.querySelector('img').getAttribute('data-full');
            lightboxImg.src = fullSrc;
            lightbox.classList.remove('hidden');
            lightbox.focus(); // accessibility
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.add('hidden');
    });

    // Close on outside click or Escape key
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('hidden');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            lightbox.classList.add('hidden');
        }
    });
}
// Contact Form Validation + LocalStorage
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        let error = '';

        if (!name) error += 'Name is required.\n';
        if (!email || !email.includes('@')) error += 'Valid email is required.\n';
        if (!message) error += 'Message is required.\n';

        if (error) {
            formMessage.style.color = '#ff6b6b';
            formMessage.textContent = error.trim();
            return;
        }

        // Success – save to LocalStorage
        const inquiry = { name, email, message, date: new Date().toLocaleString() };
        localStorage.setItem('lastInquiry', JSON.stringify(inquiry));

        formMessage.style.color = '#51cf66';
        formMessage.textContent = 'Thank you! Your inquiry has been sent. We’ll get back to you soon.';

        contactForm.reset();
    });
}

// Optional: Show last saved inquiry on load (for demo)
window.addEventListener('load', () => {
    const last = localStorage.getItem('lastInquiry');
    if (last && formMessage) {
        const data = JSON.parse(last);
        formMessage.style.color = '#4dabf7';
        formMessage.textContent = `Last inquiry: ${data.name} (${data.date})`;
    }
});
