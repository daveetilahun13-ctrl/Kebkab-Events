// Kebkab Events – All JavaScript (vanilla only)
// Loaded on every page – handles nav, form, tabs, gallery, etc.

document.addEventListener('DOMContentLoaded', function () {

    // 1. Mobile Hamburger Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');

            // Update accessibility attribute
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close menu when clicking any link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. Contact Form Validation + LocalStorage
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const message = document.getElementById('message')?.value.trim() || '';

            let error = '';

            if (!name) error += 'Name is required.\n';
            if (!email || !email.includes('@') || !email.includes('.')) error += 'Valid email is required.\n';
            if (!message) error += 'Message is required.\n';

            if (error) {
                formMessage.style.color = '#ff6b6b';
                formMessage.textContent = error.trim();
                return;
            }

            // Success – save to LocalStorage
            const inquiry = {
                name,
                email,
                message,
                date: new Date().toLocaleString()
            };
            localStorage.setItem('lastInquiry', JSON.stringify(inquiry));

            formMessage.style.color = '#51cf66';
            formMessage.textContent = 'Thank you! Your inquiry has been sent. We will get back to you soon.';

            contactForm.reset();
        });

        // Show last saved inquiry (optional demo)
        const lastInquiry = localStorage.getItem('lastInquiry');
        if (lastInquiry) {
            const data = JSON.parse(lastInquiry);
            formMessage.style.color = '#4dabf7';
            formMessage.textContent = `Last inquiry: ${data.name} (${data.date})`;
        }
    }

    // 3. Events Page – Tab Switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                const tabId = button.getAttribute('data-tab');
                const target = document.getElementById(tabId);
                if (target) target.classList.add('active');
            });
        });
    }

    // 4. Gallery Page – Lightbox Modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');

    if (galleryItems.length > 0 && lightbox && lightboxImg && closeBtn) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const src = item.querySelector('img').getAttribute('src');
                lightboxImg.src = src;
                lightbox.classList.remove('hidden');
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.classList.add('hidden');
        });

        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) {
                lightbox.classList.add('hidden');
            }
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
                lightbox.classList.add('hidden');
            }
        });
    }

    // Optional: Card hover lift effect (works on desktop)
    document.querySelectorAll('.value-card, .team-card, .package-card, .stat-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    console.log('Kebkab Events JS loaded successfully');
});
