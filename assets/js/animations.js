document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            mirror: false,
            offset: 100
        });
    }

    // Add loading class to body
    document.body.classList.add('page-loading');
    
    // Remove loading class when page is fully loaded
    window.addEventListener('load', function() {
        document.body.classList.remove('page-loading');
        document.body.classList.add('page-loaded');
    });

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover class to cards on hover
    const cards = document.querySelectorAll('.card, .service-card, .project-card');
    cards.forEach(card => {
        card.classList.add('card-hover', 'hover-scale');
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.classList.add('btn-animate', 'hover-ripple');
    });

    // Add hover effect to images
    const images = document.querySelectorAll('.img-hover-zoom');
    images.forEach(img => {
        img.classList.add('img-hover-zoom');
    });

    // Form field animations
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });

    // Add animation to stats counters
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-count');
                const count = +counter.innerText;
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            
            // Start counter when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCount();
                    observer.unobserve(counter);
                }
            });
            
            observer.observe(counter);
        });
    };
    
    // Initialize counter animation
    if (document.querySelector('.counter')) {
        animateCounters();
    }

    // Add smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to progress bars
    const animateProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                    observer.unobserve(bar);
                }
            });
            
            observer.observe(bar);
        });
    };
    
    // Initialize progress bar animation
    if (document.querySelector('.progress-bar')) {
        animateProgressBars();
    }
});

// Page transition effect
window.addEventListener('beforeunload', function() {
    document.body.classList.add('page-exiting');
});

// Add loading state to buttons on form submission
document.addEventListener('submit', function(e) {
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (submitButton) {
        submitButton.setAttribute('data-text', submitButton.innerHTML);
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading-spinner"></span> Processing...';
    }
});
