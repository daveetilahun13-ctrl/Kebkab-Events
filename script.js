

document.addEventListener('DOMContentLoaded', function () {

    
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');

            
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

       
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

   
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

        
        const lastInquiry = localStorage.getItem('lastInquiry');
        if (lastInquiry) {
            const data = JSON.parse(lastInquiry);
            formMessage.style.color = '#4dabf7';
            formMessage.textContent = `Last inquiry: ${data.name} (${data.date})`;
        }
    }

  
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
