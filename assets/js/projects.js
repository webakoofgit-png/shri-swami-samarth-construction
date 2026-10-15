document.addEventListener('DOMContentLoaded', function() {
    // Sample project data - in a real app, this would come from a server
    const projectsData = [
        {
            id: 1,
            title: 'Luxury Apartments',
            category: 'residential',
            location: 'Mumbai, India',
            area: '25,000 sq.ft',
            year: '2023',
            client: 'Sunrise Developers',
            description: 'A modern luxury apartment complex featuring state-of-the-art amenities and sustainable design. The project includes 50+ units with premium finishes and smart home technology.',
            images: [
                'assets/img/projects/residential-1.jpg',
                'assets/img/projects/residential-2.jpg',
                'assets/img/projects/residential-3.jpg',
                'assets/img/projects/residential-4.jpg'
            ],
            features: [
                {
                    icon: 'fas fa-building',
                    title: 'Project Scale',
                    description: '50+ luxury apartments across 15 floors'
                },
                {
                    icon: 'fas fa-tools',
                    title: 'Materials',
                    description: 'High-quality, sustainable building materials'
                },
                {
                    icon: 'fas fa-clock',
                    title: 'Timeline',
                    description: 'Completed in 24 months'
                },
                {
                    icon: 'fas fa-star',
                    title: 'Features',
                    description: 'Smart home technology, gym, swimming pool, and 24/7 security'
                }
            ]
        },
        {
            id: 2,
            title: 'Corporate Office Complex',
            category: 'commercial',
            location: 'Delhi, India',
            area: '50,000 sq.ft',
            year: '2022',
            client: 'TechNova Solutions',
            description: 'A state-of-the-art corporate office building designed to foster innovation and collaboration. The complex features open workspaces, meeting rooms, and recreational areas.',
            images: [
                'assets/img/projects/commercial-1.jpg',
                'assets/img/projects/commercial-2.jpg',
                'assets/img/projects/commercial-3.jpg'
            ],
            features: [
                {
                    icon: 'fas fa-building',
                    title: 'Project Scale',
                    description: '10-story office building with parking'
                },
                {
                    icon: 'fas fa-tools',
                    title: 'Materials',
                    description: 'Glass, steel, and sustainable materials'
                },
                {
                    icon: 'fas fa-clock',
                    title: 'Timeline',
                    description: 'Completed in 18 months'
                },
                {
                    icon: 'fas fa-star',
                    title: 'Features',
                    description: 'LEED certified, energy-efficient design, green spaces'
                }
            ]
        },
        {
            id: 3,
            title: 'Industrial Warehouse',
            category: 'industrial',
            location: 'Pune, India',
            area: '100,000 sq.ft',
            year: '2023',
            client: 'Global Logistics Ltd.',
            description: 'A large-scale industrial warehouse facility with advanced logistics capabilities. The project includes loading docks, office spaces, and modern security systems.',
            images: [
                'assets/img/projects/industrial-1.jpg',
                'assets/img/projects/industrial-2.jpg',
                'assets/img/projects/industrial-3.jpg'
            ],
            features: [
                {
                    icon: 'fas fa-warehouse',
                    title: 'Project Scale',
                    description: '100,000 sq.ft warehouse space'
                },
                {
                    icon: 'fas fa-tools',
                    title: 'Materials',
                    description: 'Durable steel construction, insulated panels'
                },
                {
                    icon: 'fas fa-clock',
                    title: 'Timeline',
                    description: 'Completed in 10 months'
                },
                {
                    icon: 'fas fa-star',
                    title: 'Features',
                    description: 'Climate control, 24/7 security, loading docks, office space'
                }
            ]
        },
        {
            id: 4,
            title: 'Heritage Building Renovation',
            category: 'renovation',
            location: 'Kolkata, India',
            area: '15,000 sq.ft',
            year: '2022',
            client: 'Heritage Trust',
            description: 'Restoration and modernization of a historic building while preserving its architectural heritage. The project included structural reinforcement, facade restoration, and interior modernization.',
            images: [
                'assets/img/projects/renovation-1.jpg',
                'assets/img/projects/renovation-2.jpg',
                'assets/img/projects/renovation-3.jpg',
                'assets/img/projects/renovation-4.jpg'
            ],
            features: [
                {
                    icon: 'fas fa-landmark',
                    title: 'Project Scale',
                    description: 'Complete restoration of a 100-year-old building'
                },
                {
                    icon: 'fas fa-hammer',
                    title: 'Work Done',
                    description: 'Structural reinforcement, facade restoration, interior modernization'
                },
                {
                    icon: 'fas fa-clock',
                    title: 'Timeline',
                    description: 'Completed in 14 months'
                },
                {
                    icon: 'fas fa-star',
                    title: 'Features',
                    description: 'Preserved historical elements, modern amenities, energy-efficient systems'
                }
            ]
        },
        {
            id: 5,
            title: 'Luxury Villas',
            category: 'residential',
            location: 'Goa, India',
            area: '40,000 sq.ft',
            year: '2023',
            client: 'Beachfront Properties',
            description: 'Exclusive beachfront villas with private pools and stunning ocean views. The project combines modern architecture with tropical design elements.',
            images: [
                'assets/img/projects/villa-1.jpg',
                'assets/img/projects/villa-2.jpg',
                'assets/img/projects/villa-3.jpg'
            ],
            features: [
                {
                    icon: 'fas fa-home',
                    title: 'Project Scale',
                    description: '10 luxury beachfront villas'
                },
                {
                    icon: 'fas fa-tools',
                    title: 'Materials',
                    description: 'Premium materials, sustainable wood, and local stone'
                },
                {
                    icon: 'fas fa-clock',
                    title: 'Timeline',
                    description: 'Completed in 20 months'
                },
                {
                    icon: 'fas fa-star',
                    title: 'Features',
                    description: 'Private pools, ocean views, smart home technology, landscaped gardens'
                }
            ]
        },
        {
            id: 6,
            title: 'Shopping Mall',
            category: 'commercial',
            location: 'Bangalore, India',
            area: '200,000 sq.ft',
            year: '2023',
            client: 'Urban Retail Group',
            description: 'A modern shopping mall with retail spaces, food court, and entertainment zone. The design focuses on customer experience and energy efficiency.',
            images: [
                'assets/img/projects/mall-1.jpg',
                'assets/img/projects/mall-2.jpg',
                'assets/img/projects/mall-3.jpg',
                'assets/img/projects/mall-4.jpg'
            ],
            features: [
                {
                    icon: 'fas fa-shopping-cart',
                    title: 'Project Scale',
                    description: '200,000 sq.ft retail space with 5 floors'
                },
                {
                    icon: 'fas fa-tools',
                    title: 'Materials',
                    description: 'Glass, steel, and sustainable building materials'
                },
                {
                    icon: 'fas fa-clock',
                    title: 'Timeline',
                    description: 'Completed in 30 months'
                },
                {
                    icon: 'fas fa-star',
                    title: 'Features',
                    description: 'Central air conditioning, 24/7 security, ample parking, food court, entertainment zone'
                }
            ]
        }
    ];

    // DOM Elements
    const projectsContainer = document.getElementById('projectsContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const projectModal = document.getElementById('projectModal');
    const modalContent = document.querySelector('.project-modal__content');
    const modalClose = document.querySelector('.project-modal__close');
    const modalOverlay = document.querySelector('.project-modal__overlay');

    // Variables
    let visibleProjects = 6;
    let filteredProjects = [...projectsData];
    let currentFilter = 'all';

    // Initialize the page
    function init() {
        renderProjects(projectsData.slice(0, visibleProjects));
        setupEventListeners();
        updateLoadMoreButton();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                document.querySelector('.filter-btn.active').classList.remove('active');
                button.classList.add('active');
                
                // Filter projects
                currentFilter = button.dataset.filter;
                filterProjects(currentFilter);
            });
        });

        // Load more button
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadMoreProjects);
        }

        // Modal close buttons
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeModal);
        }

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Filter projects by category
    function filterProjects(category) {
        if (category === 'all') {
            filteredProjects = [...projectsData];
        } else {
            filteredProjects = projectsData.filter(project => project.category === category);
        }
        
        visibleProjects = 6;
        renderProjects(filteredProjects.slice(0, visibleProjects));
        updateLoadMoreButton();
        
        // Scroll to projects section
        document.querySelector('.projects-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Load more projects
    function loadMoreProjects() {
        visibleProjects += 3;
        renderProjects(filteredProjects.slice(0, visibleProjects));
        updateLoadMoreButton();
    }

    // Update load more button visibility
    function updateLoadMoreButton() {
        if (!loadMoreBtn) return;
        
        if (visibleProjects >= filteredProjects.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
        
        // Hide button if no projects match the filter
        if (filteredProjects.length === 0) {
            loadMoreBtn.style.display = 'none';
            projectsContainer.innerHTML = '<div class="no-projects">No projects found in this category.</div>';
        }
    }

    // Render projects to the DOM
    function renderProjects(projects) {
        if (projects.length === 0) {
            projectsContainer.innerHTML = '<div class="no-projects">No projects found in this category.</div>';
            return;
        }
        
        const projectsHTML = projects.map(project => `
            <div class="project-card" data-category="${project.category}" data-id="${project.id}">
                <div class="project-card__image">
                    <img src="${project.images[0]}" alt="${project.title}" loading="lazy">
                    <span class="project-card__category">${project.category}</span>
                </div>
                <div class="project-card__content">
                    <h3>${project.title}</h3>
                    <div class="project-features-preview">
                        ${project.images.slice(0, 3).map((img, index) => `
                            <div class="feature-image-preview">
                                <img src="${img}" alt="${project.title} - Feature ${index + 1}" loading="lazy">
                            </div>
                        `).join('')}
                    </div>
                    <p>${truncateText(project.description, 100)}</p>
                    <div class="project-card__meta">
                        <span class="project-card__date"><i class="far fa-calendar-alt"></i> ${project.year}</span>
                        <a href="#" class="project-card__link view-project" data-id="${project.id}">View Project <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        `).join('');
        
        projectsContainer.innerHTML = projectsHTML;
        
        // Add event listeners to project cards
        document.querySelectorAll('.view-project').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = parseInt(button.dataset.id);
                const project = projectsData.find(p => p.id === projectId);
                if (project) {
                    openProjectModal(project);
                }
            });
        });
        
        // Also make the entire project card clickable
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on a link or button inside the card
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                    return;
                }
                
                const projectId = parseInt(card.dataset.id);
                const project = projectsData.find(p => p.id === projectId);
                if (project) {
                    openProjectModal(project);
                }
            });
        });
    }

    // Open project modal
    function openProjectModal(project) {
        // Create gallery HTML
        const galleryHTML = `
            <div class="project-gallery">
                <div class="gallery-main">
                    <img src="${project.images[0]}" alt="${project.title}" id="mainImage">
                </div>
                <div class="gallery-nav">
                    <button class="gallery-btn prev-btn" aria-label="Previous image">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="gallery-btn next-btn" aria-label="Next image">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div class="gallery-thumbnails">
                    ${project.images.map((img, index) => `
                        <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                            <img src="${img}" alt="${project.title} - Thumbnail ${index + 1}">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Create project details HTML
        const detailsHTML = `
            <div class="project-details">
                <div class="project-header">
                    <h1 class="project-title">${project.title}</h1>
                    <div class="project-meta">
                        <div class="meta-item">
                            <i class="fas fa-map-marker-alt"></i> ${project.location}
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-ruler-combined"></i> ${project.area}
                        </div>
                        <div class="meta-item">
                            <i class="far fa-calendar-alt"></i> ${project.year}
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-user-tie"></i> ${project.client}
                        </div>
                    </div>
                </div>
                
                <div class="project-description">
                    <h3>Project Overview</h3>
                    <p>${project.description}</p>
                </div>
                
                <div class="project-features">
                    <h3>Project Details</h3>
                    <div class="features-grid">
                        ${project.features.map(feature => `
                            <div class="feature-item">
                                <div class="feature-icon">
                                    <i class="${feature.icon}"></i>
                                </div>
                                <div class="feature-content">
                                    <h4>${feature.title}</h4>
                                    <p>${feature.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="project-cta">
                    <a href="contact.html" class="btn btn--primary">Start Your Project</a>
                </div>
            </div>
        `;

        // Set modal content
        modalContent.innerHTML = galleryHTML + detailsHTML;
        
        // Show modal
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Initialize gallery functionality
        initGallery(project.images);
    }

    // Initialize image gallery
    function initGallery(images) {
        const mainImage = document.getElementById('mainImage');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const thumbnails = document.querySelectorAll('.thumbnail');
        
        let currentIndex = 0;
        
        // Update main image
        function updateMainImage(index) {
            if (!mainImage) return;
            
            // Fade out current image
            mainImage.style.opacity = '0';
            
            // Update image source after fade out
            setTimeout(() => {
                mainImage.src = images[index];
                mainImage.alt = `Project image ${index + 1}`;
                
                // Fade in new image
                setTimeout(() => {
                    mainImage.style.opacity = '1';
                }, 10);
            }, 200);
            
            // Update active thumbnail
            thumbnails.forEach((thumb, i) => {
                if (i === index) {
                    thumb.classList.add('active');
                } else {
                    thumb.classList.remove('active');
                }
            });
            
            currentIndex = index;
        }
        
        // Event listeners for navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateMainImage(currentIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % images.length;
                updateMainImage(currentIndex);
            });
        }
        
        // Event listeners for thumbnails
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                updateMainImage(index);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!projectModal.classList.contains('active')) return;
            
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateMainImage(currentIndex);
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % images.length;
                updateMainImage(currentIndex);
            }
        });
        
        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.querySelector('.gallery-main').addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        document.querySelector('.gallery-main').addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next image
                    currentIndex = (currentIndex + 1) % images.length;
                } else {
                    // Swipe right - previous image
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                }
                updateMainImage(currentIndex);
            }
        }
    }

    // Close modal
    function closeModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Helper function to truncate text
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    // Initialize the page
    init();
});
