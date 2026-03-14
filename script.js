document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    mobileToggle.addEventListener('click', () => {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', !isExpanded);
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Sticky Navbar shadow on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Current year for footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Form submission processing via AJAX
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent standard page reload

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            // Visual feedback for sending state
            btn.textContent = 'Sending...';
            btn.disabled = true;
            btn.style.opacity = '0.7';
            btn.style.cursor = 'not-allowed';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success state
                    btn.textContent = 'Message Sent Successfully!';
                    btn.style.backgroundColor = '#10B981'; // Green
                    btn.style.borderColor = '#10B981';
                    btn.style.opacity = '1';
                    contactForm.reset();
                } else {
                    throw new Error('Failed to submit');
                }
            } catch (error) {
                // Error state
                console.error('Submission error:', error);
                btn.textContent = 'Error! Try Again.';
                btn.style.backgroundColor = '#EF4444'; // Red
                btn.style.borderColor = '#EF4444';
                btn.style.opacity = '1';
            } finally {
                // Return to normal state after slightly varied delay based on success/error
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.style.opacity = '';
                    btn.style.cursor = '';
                    btn.disabled = false;
                }, 4000);
            }
        });
    }
});
