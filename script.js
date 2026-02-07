

let currentSlide = 1; // Commencer au 2ème projet (Travia)

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = slides.length;
    
    // Boucle circulaire : si on dépasse, revenir au début ou à la fin
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    
    // Calculer le décalage pour centrer la carte active
    const offset = -(currentSlide * 33.33) + 33.33;
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;

    slides.forEach((slide, i) => {
        // Enlever toutes les classes active
        slide.classList.remove('active');
        
        if (i === currentSlide) {
            // Carte centrale : grande et opaque
            slide.classList.add('active');
            slide.style.transform = 'scale(1)';
            slide.style.opacity = '1';
            slide.style.zIndex = '10';
        } else {
            // Cartes latérales : plus petites et transparentes
            slide.style.transform = 'scale(0.85)';
            slide.style.opacity = '0.6';
            slide.style.zIndex = '1';
        }
    });
    
    // Mettre à jour les indicateurs
    indicators.forEach((indicator, i) => {
        if (i === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function nextSlide() {
    currentSlide++;
    if (currentSlide >= document.querySelectorAll('.carousel-item').length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = document.querySelectorAll('.carousel-item').length - 1;
    }
    showSlide(currentSlide);
}

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

    showSlide(currentSlide);

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
                document.querySelector('.carousel').classList.add('visible');
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

    // Ajouter les événements pour les contrôles du carousel
    document.querySelector('.carousel-control.next').addEventListener('click', nextSlide);
    document.querySelector('.carousel-control.prev').addEventListener('click', prevSlide);

    // Navigation avec les indicateurs (dots)
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator) => {
        indicator.addEventListener('click', () => {
            const slideIndex = parseInt(indicator.getAttribute('data-slide'));
            showSlide(slideIndex);
        });
    });

    // Navigation au clavier (flèches gauche/droite)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Swipe sur mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carousel = document.querySelector('.carousel');
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe gauche - suivant
            nextSlide();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe droite - précédent
            prevSlide();
        }
    }

    // Auto-play optionnel du carousel (défilement automatique toutes les 5 secondes)
    // Décommentez les lignes suivantes pour activer l'auto-play
    /*
    let autoPlayInterval = setInterval(() => {
        nextSlide();
    }, 5000); // 5 secondes

    // Pause l'auto-play au hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    carousel.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    });
    */

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

