/**
 * Shree Swami Samarth Constructions - Main JavaScript
 * A modern, performant, and accessible JavaScript for the construction company website
 */

// DOM Ready
const DOMReady = (callback) => {
    if (document.readyState !== 'loading') {
        callback();
    } else {
        document.addEventListener('DOMContentLoaded', callback);
    }
};

// Force-show mobile toggles on small viewports (overrides inline styles)
const ensureMobileToggleVisible = () => {
    const show = window.innerWidth <= 1024;
    document.querySelectorAll('.mobile-menu-toggle, .nav-toggle').forEach(btn => {
        if (show) {
            btn.style.display = 'block';
            btn.style.zIndex = '10002';
        } else {
            btn.style.display = '';
            btn.style.zIndex = '';
        }
    });
};

// Measure topbar height and sync CSS var so layout aligns perfectly
const syncTopbarHeight = () => {
    const topbar = document.querySelector('.topbar');
    if (!topbar) return;
    const h = topbar.offsetHeight || 0;
    document.documentElement.style.setProperty('--topbar-h', `${h}px`);
};

// Initialize alternate responsive header toggle (index.html pattern)
const initHeaderToggle = () => {
    const header = document.querySelector('.site-header') || document.querySelector('.header');
    const btn = document.querySelector('.nav-toggle');
    const panel = document.getElementById('primary-navigation');

    if (!btn || !panel) return;

    if (btn.dataset.bound === 'true' || panel.dataset.bound === 'true') return;

    const openNav = () => {
        btn.setAttribute('aria-expanded','true');
        panel.dataset.open = 'true';
        if (header) header.dataset.dim = 'true';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overscrollBehavior = 'contain';
    };
    const closeNav = () => {
        btn.setAttribute('aria-expanded','false');
        panel.dataset.open = 'false';
        if (header) header.removeAttribute('data-dim');
        document.documentElement.style.overflow = '';
        document.body.style.overscrollBehavior = '';
    };

    const toggle = () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        isOpen ? closeNav() : openNav();
    };

    btn.addEventListener('click', toggle);
    // iOS Safari/SFSafariViewController sometimes misses click; add touchstart fallback
    btn.addEventListener('touchstart', (e) => { e.preventDefault(); toggle(); }, { passive: false });
    btn.dataset.bound = 'true';
    panel.dataset.bound = 'true';

    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

    document.addEventListener('click', (e) => {
        if (window.innerWidth > 1024) return;
        const inside = panel.contains(e.target) || btn.contains(e.target);
        if (!inside && panel.dataset.open === 'true') closeNav();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) closeNav();
    });
};

// Debounce function for performance
const debounce = (func, wait = 100) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function for scroll/resize events
const throttle = (func, limit = 100) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Check if element is in viewport
const isInViewport = (element, offset = 0) => {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
        rect.top <= (windowHeight - offset) &&
        rect.left <= (windowWidth - offset) &&
        rect.bottom >= offset &&
        rect.right >= offset
    );
};

// Add class to body when page is scrolled
const handleScroll = () => {
    const header = document.querySelector('.header');
    const backToTop = document.getElementById('back-to-top');
    
    if (window.scrollY > 100) {
        document.body.classList.add('is-scrolled');
        if (backToTop) backToTop.classList.add('show');
    } else {
        document.body.classList.remove('is-scrolled');
        if (backToTop) backToTop.classList.remove('show');
    }
    
    // Sticky header
    if (header) {
        if (window.scrollY > 200) {
            header.classList.add('header--sticky');
        } else {
            header.classList.remove('header--sticky');
        }
    }
};

// Smooth scroll to element
const smoothScroll = (target, offset = 0) => {
    if (!target) return;
    
    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight - offset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
};

// Initialize mobile menu
const initMobileMenu = () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const headerEl = document.querySelector('.site-header') || document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!mobileMenuToggle || !navList) return;

    // Prevent double-binding if inline scripts already attached listeners on this page
    if (mobileMenuToggle.dataset.bound === 'true' || navList.dataset.bound === 'true') {
        return;
    }

    const toggleMenu = () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        const next = !isExpanded;
        mobileMenuToggle.setAttribute('aria-expanded', String(next));
        // Support both patterns: class and data attribute
        navList.classList.toggle('active', next);
        navList.dataset.open = String(next);

        // Backdrop dim where supported
        if (headerEl) {
            if (next) headerEl.dataset.dim = 'true'; else headerEl.removeAttribute('data-dim');
        }

        // Scroll lock
        document.body.style.overflow = next ? 'hidden' : '';
        if (next) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    };

    mobileMenuToggle.addEventListener('click', toggleMenu);
    // iOS Safari/SFSafariViewController sometimes misses click; add touchstart fallback
    mobileMenuToggle.addEventListener('touchstart', (e) => { e.preventDefault(); toggleMenu(); }, { passive: false });
    // Mark as bound to avoid duplicate listeners
    mobileMenuToggle.dataset.bound = 'true';
    navList.dataset.bound = 'true';

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            navList.dataset.open = 'false';
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
            if (headerEl) headerEl.removeAttribute('data-dim');
        });
    });

    // Reset to default when resizing back to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            navList.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
        }
    });

    // Close menu on outside tap/click (including overlay area)
    document.addEventListener('click', (e) => {
        const isOpen = navList.classList.contains('active');
        if (!isOpen) return;
        const clickInsideMenu = navList.contains(e.target);
        const clickOnToggle = mobileMenuToggle.contains(e.target);
        if (!clickInsideMenu && !clickOnToggle) {
            navList.classList.remove('active');
            navList.dataset.open = 'false';
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
            if (headerEl) headerEl.removeAttribute('data-dim');
        }
    }, true);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navList.classList.contains('active')) {
            navList.classList.remove('active');
            navList.dataset.open = 'false';
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
            mobileMenuToggle.focus();
            if (headerEl) headerEl.removeAttribute('data-dim');
        }
    });
};

// Initialize smooth scrolling for anchor links
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                smoothScroll(targetElement, 20);
                
                // Update URL without page jump
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
};

// Initialize back to top button
const initBackToTop = () => {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Initialize counters
const initCounters = () => {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            requestAnimationFrame(() => animateCounter(counter));
        } else {
            counter.innerText = target.toLocaleString();
        }
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
};

// Initialize lazy loading for images
const initLazyLoad = () => {
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'));
        
        if ('IntersectionObserver' in window) {
            const lazyImageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.classList.add('loaded');
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            });
            
            lazyImages.forEach((lazyImage) => {
                lazyImageObserver.observe(lazyImage);
            });
        }
    }
};

// Initialize form validation
const initFormValidation = () => {
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
        }, false);
    });
};

// Initialize tooltips
const initTooltips = () => {
    if (typeof window !== 'undefined' && window.bootstrap && window.bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(tooltipTriggerEl => new window.bootstrap.Tooltip(tooltipTriggerEl));
    }
};

// Initialize AOS (Animate On Scroll)
const initAOS = () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            once: true,
            offset: 100,
            easing: 'ease-in-out',
            mirror: false
        });
    }
};

// Initialize all components
const init = () => {
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Ensure layout accounts for actual topbar height
    syncTopbarHeight();
    ensureMobileToggleVisible();

    // Initialize components
    // Support both menu systems used across pages
    initMobileMenu();
    initHeaderToggle();
    initSmoothScroll();
    initBackToTop();
    initCounters();
    initLazyLoad();
    initFormValidation();
    initTooltips();
    initAOS();
    
    // Initial scroll state
    handleScroll();
    
    // Add event listeners
    window.addEventListener('scroll', throttle(handleScroll, 16));
    window.addEventListener('resize', debounce(() => {
        syncTopbarHeight();
        ensureMobileToggleVisible();
    }, 150));
    window.addEventListener('orientationchange', () => {
        // reflow after orientation change
        setTimeout(() => {
            syncTopbarHeight();
            ensureMobileToggleVisible();
        }, 150);
    });
    
    // Log initialization
    console.log('Shree Swami Samarth Constructions - Website initialized');
};

// Initialize when DOM is ready
DOMReady(init);



  
