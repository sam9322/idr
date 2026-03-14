/**
 * =========================================================================
 *  INSTITUTE OF DIGITAL RISK - MAIN SCRIPT
 *  Contains functionalities for navigation, scrolling effects, and forms.
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ---------------------------------------------------------------------
       1. Mobile Menu Toggle
       Enables expanding/collapsing of navigation links on smaller screens.
       --------------------------------------------------------------------- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            // Update aria accessibility state
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle visibility classes
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Ensure the menu closes automatically when a navigation link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------------------------------------------------------------------
       2. Sticky Navigation Shadow
       Adds a shadow effect to the top navbar when the page is scrolled down.
       --------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* ---------------------------------------------------------------------
       3. Dynamic Footer Year
       Automatically set the current year in the footer copyright section.
       --------------------------------------------------------------------- */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* ---------------------------------------------------------------------
       4. Contact Form Submission Handling via AJAX
       Intercepts standard form submission to submit asynchronously and
       provide real-time user feedback.
       --------------------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent standard page reload

            const btn = contactForm.querySelector('button[type="submit"]');
            if (!btn) return;

            const originalText = btn.textContent;

            // Visual feedback for 'Sending' state
            btn.textContent = 'Sending...';
            btn.disabled = true;
            btn.style.opacity = '0.7';
            btn.style.cursor = 'not-allowed';

            try {
                // Submit form data using fetch API
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success state update
                    btn.textContent = 'Message Sent Successfully!';
                    btn.style.backgroundColor = '#10B981'; // Tailwind Green color
                    btn.style.borderColor = '#10B981';
                    btn.style.opacity = '1';
                    contactForm.reset();
                } else {
                    throw new Error('Failed to submit form.');
                }
            } catch (error) {
                // Error state update
                console.error('Submission error:', error);
                btn.textContent = 'Error! Try Again.';
                btn.style.backgroundColor = '#EF4444'; // Tailwind Red color
                btn.style.borderColor = '#EF4444';
                btn.style.opacity = '1';
            } finally {
                // Restore button to its normal state after a short delay
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.style.opacity = '';
                    btn.style.cursor = '';
                    btn.disabled = false;
                }, 4000); // 4 seconds delay
            }
        });
    }
});
