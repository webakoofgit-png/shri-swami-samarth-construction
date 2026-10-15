document.addEventListener('DOMContentLoaded', function() {
    // Service data - in a real app, this would come from a server
    const servicesData = {
        'residential-construction': {
            title: 'Residential Construction',
            description: 'We specialize in building custom homes, apartments, and housing complexes with the highest standards of quality and craftsmanship. Our team works closely with clients to bring their dream homes to life, ensuring every detail is perfect.',
            images: [
                'assets/img/residential-1.jpg',
                'assets/img/residential-2.jpg',
                'assets/img/residential-3.jpg'
            ],
            features: [
                {
                    icon: 'fas fa-home',
                    title: 'Custom Home Building',
                    description: 'Tailored home designs to match your lifestyle and preferences.'
                },
                {
                    icon: 'fas fa-building',
                    title: 'Apartment Complexes',
                    description: 'Modern, functional, and comfortable living spaces.'
                },
                {
                    icon: 'fas fa-paint-roller',
                    title: 'Interior Finishing',
                    description: 'High-quality finishes and attention to detail.'
                },
                {
                    icon: 'fas fa-tree',
                    title: 'Landscaping',
                    description: 'Beautiful outdoor spaces that complement your home.'
                }
            ]
        },
        'commercial-construction': {
            title: 'Commercial Construction',
            description: 'Our commercial construction services deliver functional, efficient, and visually appealing spaces for businesses of all sizes. We understand the unique requirements of commercial projects and deliver on time and within budget.',
            images: [
                'assets/img/commercial-1.jpg',
                'assets/img/commercial-2.jpg',
                'assets/img/commercial-3.jpg'
            ],
            features: [
                {
                    icon: 'fas fa-building',
                    title: 'Office Spaces',
                    description: 'Professional environments that boost productivity.'
                },
                {
                    icon: 'fas fa-shopping-cart',
                    title: 'Retail Spaces',
                    description: 'Attractive spaces designed to enhance customer experience.'
                },
                {
                    icon: 'fas fa-utensils',
                    title: 'Restaurants & Cafes',
                    description: 'Functional and inviting spaces for food service businesses.'
                },
                {
                    icon: 'fas fa-warehouse',
                    title: 'Warehouses',
                    description: 'Efficient storage solutions for your business needs.'
                }
            ]
        },
        // Add more services as needed
    };

    // Initialize service modal
    const modal = document.getElementById('serviceModal');
    const modalContent = document.querySelector('.service-modal__content');
    const closeBtn = document.querySelector('.service-modal__close');

    // Add click event to all Learn More buttons
    document.querySelectorAll('.service-card__link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceId = this.closest('.service-card').classList[1] || 'residential-construction';
            openModal(serviceId);
        });
    });

    // Close modal when clicking the overlay or close button
    document.querySelector('.service-modal__overlay').addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function openModal(serviceId) {
        const service = servicesData[serviceId] || servicesData['residential-construction'];
        
        // Create carousel HTML
        let carouselHTML = `
            <div class="service-carousel">
                <div class="carousel-track">
                    ${service.images.map(img => `
                        <div class="carousel-slide">
                            <img src="${img}" alt="${service.title}">
                        </div>
                    `).join('')}
                </div>
                <div class="carousel-nav">
                    <button class="carousel-btn prev-btn" aria-label="Previous image">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="carousel-btn next-btn" aria-label="Next image">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div class="carousel-dots">
                    ${service.images.map((_, index) => `
                        <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>
                    `).join('')}
                </div>
            </div>
            <div class="service-details">
                <h2>${service.title}</h2>
                <p>${service.description}</p>
                <div class="service-features">
                    ${service.features.map(feature => `
                        <div class="feature-item">
                            <i class="${feature.icon}"></i>
                            <div class="feature-content">
                                <h4>${feature.title}</h4>
                                <p>${feature.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Set modal content
        modalContent.innerHTML = carouselHTML;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Initialize carousel
        initializeCarousel();
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function initializeCarousel() {
        const track = document.querySelector('.carousel-track');
        const slides = Array.from(document.querySelectorAll('.carousel-slide'));
        const dots = Array.from(document.querySelectorAll('.carousel-dot'));
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        let currentSlide = 0;
        const slideCount = slides.length;
        
        // Set initial slide position
        updateSlidePosition();
        
        // Event listeners for navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', goToPrevSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', goToNextSlide);
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyDown);
        
        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    goToNextSlide();
                } else {
                    goToPrevSlide();
                }
            }
        }
        
        function handleKeyDown(e) {
            if (e.key === 'ArrowLeft') {
                goToPrevSlide();
            } else if (e.key === 'ArrowRight') {
                goToNextSlide();
            }
        }
        
        function goToSlide(index) {
            currentSlide = (index + slideCount) % slideCount;
            updateSlidePosition();
            updateDots();
        }
        
        function goToNextSlide() {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlidePosition();
            updateDots();
        }
        
        function goToPrevSlide() {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateSlidePosition();
            updateDots();
        }
        
        function updateSlidePosition() {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        function updateDots() {
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                    dot.setAttribute('aria-current', 'true');
                } else {
                    dot.classList.remove('active');
                    dot.removeAttribute('aria-current');
                }
            });
        }
        
        // Auto-advance slides (optional)
        let slideInterval = setInterval(goToNextSlide, 5000);
        
        // Pause auto-advance on hover
        track.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        track.addEventListener('mouseleave', () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(goToNextSlide, 5000);
        });
        
        // Clear interval when modal is closed
        modal.addEventListener('click', function clearCarouselInterval(e) {
            if (e.target === this) {
                clearInterval(slideInterval);
            }
        });
    }
});


// 📝 Sample gallery images for each service
const galleries = {
 "Mivan Construction": [
    "assets/img/mivanservice/mivan1.jpeg",
    "assets/img/mivanservice/mivan2.jpg",
    "assets/img/mivanservice/mivan4.jpeg",
    "assets/img/mivanservice/mivan5.jpeg"
  ],
  "Commercial Construction": [
    "assets/img/constructionservic/21.jpg",
    "assets/img/constructionservic/22.jpeg",
    "assets/img/constructionservic/23.jpeg",
    "assets/img/constructionservic/24.jpeg"
  ],
  "Residential Construction": [
    "assets/img/residentalservice/11.jpeg",
    "assets/img/residentalservice/12.jpeg",
    "assets/img/residentalservice/13.jpeg",
    "assets/img/residentalservice/14.jpeg"
  ],
  "Machinery": [
    "assets/img/machineryservice/1.png",
    "assets/img/machineryservice/2.png",
    "assets/img/machineryservice/3.png",
    "assets/img/machineryservice/4.png"
  ],
  "Rental Machinery": [
    "assets/img/rentalservice/5.png",
    "assets/img/rentalservice/6.png",
    "assets/img/rentalservice/7.png",
    "assets/img/rentalservice/8.png"
  ]
};

// 🪄 Get modal elements
const modal = document.getElementById("galleryModal");
const closeBtn = modal.querySelector(".close");
const galleryImgs = modal.querySelectorAll(".gallery img");

// 🎯 Add click listeners to Learn More buttons
document.querySelectorAll(".service-preview .btn").forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    // Find service name from <h3>
    const serviceName = button.parentElement.querySelector("h3").innerText;
    const images = galleries[serviceName];

    // Load images into popup
    galleryImgs.forEach((img, i) => {
      img.src = images[i] || "";
    });

    // Show popup
    modal.style.display = "block";
  });
});

// ❌ Close popup when clicking X
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// ❌ Close popup when clicking outside modal content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
