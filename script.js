

let currentSlide = 0; // Start with the first slide

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    if (index >= totalSlides-1) {
        currentSlide = -1;
    } else if (index < -1) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 33.33; // Adjust based on the number of visible items
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;

    slides.forEach((slide, i) => {
        if (i === (currentSlide + 1) % totalSlides) {
            slide.style.transform = 'scale(1)';
            slide.style.opacity = '1';
        } else {
            slide.style.transform = 'scale(0.8)';
            slide.style.opacity = '0.5';
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
    showSlide(currentSlide);

    // Intersection observer pour afficher la section du carousel
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelector('.carousel').classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const projectTitle = document.querySelector('#Projet h2');
    observer.observe(projectTitle);

    // Ajouter les événements de fermeture de lightbox
    document.querySelectorAll('.lightbox .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.lightbox').style.display = 'none';
        });
    });

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
});

