document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const contactForm = document.getElementById('contactForm');
    const formInputs = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message'),
        privacyPolicy: document.getElementById('privacy-policy')
    };
    
    const errorElements = {
        name: document.getElementById('name-error'),
        email: document.getElementById('email-error'),
        phone: document.getElementById('phone-error'),
        subject: document.getElementById('subject-error'),
        message: document.getElementById('message-error'),
        privacy: document.getElementById('privacy-error')
    };
    
    const submitButton = contactForm?.querySelector('button[type="submit"]');
    const formSuccess = document.getElementById('form-success');
    
    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9\+\-\s\(\)]{10,20}$/;
    
    // Form validation functions
    function validateName() {
        const name = formInputs.name.value.trim();
        if (!name) {
            showError('name', 'Please enter your name');
            return false;
        } else if (name.length < 2) {
            showError('name', 'Name must be at least 2 characters long');
            return false;
        } else {
            showSuccess('name');
            return true;
        }
    }
    
    function validateEmail() {
        const email = formInputs.email.value.trim();
        if (!email) {
            showError('email', 'Please enter your email address');
            return false;
        } else if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            return false;
        } else {
            showSuccess('email');
            return true;
        }
    }
    
    function validatePhone() {
        const phone = formInputs.phone.value.trim();
        if (phone && !phoneRegex.test(phone)) {
            showError('phone', 'Please enter a valid phone number');
            return false;
        } else {
            showSuccess('phone');
            return true;
        }
    }
    
    function validateSubject() {
        const subject = formInputs.subject.value;
        if (!subject) {
            showError('subject', 'Please select a subject');
            return false;
        } else {
            showSuccess('subject');
            return true;
        }
    }
    
    function validateMessage() {
        const message = formInputs.message.value.trim();
        if (!message) {
            showError('message', 'Please enter your message');
            return false;
        } else if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters long');
            return false;
        } else {
            showSuccess('message');
            return true;
        }
    }
    
    function validatePrivacyPolicy() {
        if (!formInputs.privacyPolicy.checked) {
            showError('privacy', 'You must accept the privacy policy');
            return false;
        } else {
            showSuccess('privacy');
            return true;
        }
    }
    
    // Show error message
    function showError(field, message) {
        const input = formInputs[field];
        const errorElement = errorElements[field];
        
        if (input) {
            input.classList.add('error');
            input.classList.remove('valid');
        }
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    // Show success state
    function showSuccess(field) {
        const input = formInputs[field];
        const errorElement = errorElements[field];
        
        if (input) {
            input.classList.remove('error');
            input.classList.add('valid');
        }
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }
    
    // Validate on blur
    if (formInputs.name) {
        formInputs.name.addEventListener('blur', validateName);
        formInputs.name.addEventListener('input', () => {
            if (formInputs.name.value.trim()) {
                showSuccess('name');
            }
        });
    }
    
    if (formInputs.email) {
        formInputs.email.addEventListener('blur', validateEmail);
        formInputs.email.addEventListener('input', () => {
            if (emailRegex.test(formInputs.email.value.trim())) {
                showSuccess('email');
            }
        });
    }
    
    if (formInputs.phone) {
        formInputs.phone.addEventListener('blur', validatePhone);
        formInputs.phone.addEventListener('input', () => {
            if (!formInputs.phone.value.trim() || phoneRegex.test(formInputs.phone.value.trim())) {
                showSuccess('phone');
            }
        });
    }
    
    if (formInputs.subject) {
        formInputs.subject.addEventListener('change', validateSubject);
    }
    
    if (formInputs.message) {
        formInputs.message.addEventListener('blur', validateMessage);
        formInputs.message.addEventListener('input', () => {
            if (formInputs.message.value.trim().length >= 10) {
                showSuccess('message');
            }
        });
    }
    
    if (formInputs.privacyPolicy) {
        formInputs.privacyPolicy.addEventListener('change', validatePrivacyPolicy);
    }
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isPhoneValid = validatePhone();
            const isSubjectValid = validateSubject();
            const isMessageValid = validateMessage();
            const isPrivacyPolicyValid = validatePrivacyPolicy();
            
            if (isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid && isPrivacyPolicyValid) {
                // Show loading state
                submitButton.disabled = true;
                submitButton.classList.add('btn--loading');
                
                // Simulate form submission (replace with actual AJAX call)
                setTimeout(() => {
                    // Hide form and show success message
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'block';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset validation states
                    Object.keys(formInputs).forEach(key => {
                        if (formInputs[key]) {
                            formInputs[key].classList.remove('valid', 'error');
                        }
                    });
                    
                    // Reset button state
                    submitButton.disabled = false;
                    submitButton.classList.remove('btn--loading');
                    
                    // Show success message with SweetAlert2
                    Swal.fire({
                        title: 'Message Sent!',
                        text: 'Thank you for contacting us. We will get back to you soon!',
                        icon: 'success',
                        confirmButtonColor: '#ff6600',
                        confirmButtonText: 'OK',
                        timer: 5000,
                        timerProgressBar: true
                    });
                    
                    // Scroll to success message
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                }, 1500);
            } else {
                // Scroll to first error
                const firstError = document.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                // Show error message with SweetAlert2
                Swal.fire({
                    title: 'Validation Error',
                    text: 'Please fill in all required fields correctly.',
                    icon: 'error',
                    confirmButtonColor: '#ff4d4f',
                    confirmButtonText: 'OK'
                });
            }
        });
    }
    
    // Phone number formatting
    if (formInputs.phone) {
        formInputs.phone.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format as +91 XXXXXXXXXX
            if (value.length > 2) {
                value = value.replace(/(\d{2})(\d{0,5})(\d{0,5})/, function(match, p1, p2, p3) {
                    let result = p1;
                    if (p2) result += ' ' + p2;
                    if (p3) result += ' ' + p3;
                    return result;
                });
            }
            
            e.target.value = value;
        });
    }
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Smooth scroll for anchor links
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

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
