// ============================================
//    BOOTSTRAP CAROUSEL - Plus simple !
// ============================================
// Bootstrap gère tout automatiquement, pas besoin de code custom !

document.addEventListener('DOMContentLoaded', () => {
    // Effet machine à écrire
    const typewriter = document.getElementById('typewriter');
    const text = 'Bienvenue Sur Mon Portfolio';
    let index = 0;

    function type() {
        if (index < text.length) {
            typewriter.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100); // Vitesse de frappe (100ms par caractère)
        } else {
            // Garde le curseur clignotant après avoir fini
            setTimeout(() => {
                typewriter.style.borderRight = 'none';
            }, 500);
        }
    }

    // Démarrer l'animation après un court délai
    setTimeout(type, 500);

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar ul');
    
    if (menuToggle) {
        // Click handler
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuToggle.innerHTML = navbar.classList.contains('active') ? '&times;' : '&#9776;';
            menuToggle.setAttribute('aria-expanded', navbar.classList.contains('active'));
        });

        // Keyboard accessibility for menu toggle
        menuToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menuToggle.click();
            }
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.navbar ul li a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                menuToggle.innerHTML = '&#9776;';
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && !e.target.closest('.menu-toggle')) {
                navbar.classList.remove('active');
                menuToggle.innerHTML = '&#9776;';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuToggle.innerHTML = '&#9776;';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Initialiser le carousel projets (custom)
    const initProjectsCarousel = () => {
        const carousel = document.querySelector('[data-projects-carousel]');
        if (!carousel) {
            return;
        }

        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const prevBtn = carousel.querySelector('[data-carousel-prev]');
        const nextBtn = carousel.querySelector('[data-carousel-next]');
        const dotsContainer = carousel.querySelector('.carousel-dots');

        if (!track || slides.length === 0) {
            return;
        }

        let currentIndex = 0;

        const buildDots = () => {
            if (!dotsContainer) {
                return;
            }
            dotsContainer.innerHTML = '';
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'carousel-dot';
                dot.setAttribute('aria-label', `Aller au projet ${index + 1}`);
                dot.addEventListener('click', () => {
                    goTo(index);
                });
                dotsContainer.appendChild(dot);
            });
        };

        const update = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            slides.forEach((slide, index) => {
                slide.classList.toggle('is-active', index === currentIndex);
            });
            if (dotsContainer) {
                Array.from(dotsContainer.children).forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
        };

        const goTo = (index) => {
            const maxIndex = slides.length - 1;
            if (index < 0) {
                currentIndex = maxIndex;
            } else if (index > maxIndex) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            update();
        };

        prevBtn?.addEventListener('click', () => {
            goTo(currentIndex - 1);
        });

        nextBtn?.addEventListener('click', () => {
            goTo(currentIndex + 1);
        });

        let touchStartX = null;
        track.addEventListener('touchstart', (event) => {
            touchStartX = event.touches[0].clientX;
        }, { passive: true });

        track.addEventListener('touchend', (event) => {
            if (touchStartX === null) {
                return;
            }
            const touchEndX = event.changedTouches[0].clientX;
            const deltaX = touchEndX - touchStartX;
            if (Math.abs(deltaX) > 50) {
                goTo(deltaX > 0 ? currentIndex - 1 : currentIndex + 1);
            }
            touchStartX = null;
        });

        buildDots();
        update();
    };

    initProjectsCarousel();

    // Animated counters
    const counters = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats-container');
    let hasAnimated = false;

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 secondes
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach((counter, index) => {
                    setTimeout(() => {
                        counter.closest('.stat-item').classList.add('animate');
                        animateCounter(counter);
                    }, index * 150);
                });
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Intersection observer pour afficher la section du carousel
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelector('.projects-carousel')?.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const projectTitle = document.querySelector('#Projet h2');
    if (projectTitle) {
        observer.observe(projectTitle);
    }

    // Ajouter les événements de fermeture de lightbox
    document.querySelectorAll('.lightbox .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.lightbox').style.display = 'none';
        });
    });

    // Animation des éléments du parcours
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Animation des éléments du parcours
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${entry.target.dataset.delay}ms`;
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.dataset.delay = index * 200;
        timelineObserver.observe(item);
    });

    // Gérer le clic sur une compétence pour activer l'overlay
    const competences = document.querySelectorAll('.competence');
    competences.forEach(competence => {
        competence.addEventListener('click', () => {
            competences.forEach(c => c.classList.remove('active'));
            competence.classList.add('active');
        });
    });

    // Fermer l'overlay si on clique à l'extérieur de la compétence
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.competence')) {
            competences.forEach(c => c.classList.remove('active'));
        }
    });

    // Ajouter un événement de clic sur les boîtes de compétence
    const competenceBoxes = document.querySelectorAll(".competence-box");
    competenceBoxes.forEach(box => {
        box.addEventListener('click', () => {
            box.classList.toggle('active');
        });
    });

    // Carousel projets géré en JS custom

    // Bouton retour en haut
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Afficher/masquer le bouton selon le scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll vers le haut
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

