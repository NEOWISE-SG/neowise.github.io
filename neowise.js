document.addEventListener('DOMContentLoaded', function () {
    // Check if device is touch capable
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }

    // Hide loader when page is loaded
    setTimeout(function () {
        document.querySelector('.loader').style.opacity = '0';
        setTimeout(function () {
            document.querySelector('.loader').style.display = 'none';
        }, 500);
    }, 1500);

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Initialize Globe only on non-mobile devices
    if (window.innerWidth >= 768) {
        initGlobe();
    }

    // Animate stats
    animateStats();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('neowise-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simple form validation
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const message = this.querySelector('#message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }

            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero content animation
        gsap.from('.hero-content h1', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });

        gsap.from('.hero-content p', {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: 0.3,
            ease: 'power3.out'
        });

        gsap.from('.cta-button', {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: 0.6,
            ease: 'power3.out'
        });

        // Service cards animation
        gsap.utils.toArray('.service-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });

        // About section animation
        gsap.from('.about-text', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('.about-image', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            x: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // Portfolio items animation
        gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });

        // Contact form animation
        gsap.from('.contact-info', {
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            x: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768 && !document.querySelector('#globe-container').hasChildNodes()) {
            initGlobe();
        }
    });
});

function initGlobe() {
    if (typeof Globe === 'undefined') return;

    try {
        // Create globe instance
        const globe = Globe()
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
            .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
            .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
            .showAtmosphere(true)
            .atmosphereColor('rgba(0, 240, 255, 0.2)')
            .atmosphereAltitude(0.25)
            .pointColor(() => '#00f0ff')
            .pointAltitude(0.01)
            .pointRadius(window.innerWidth < 768 ? 0.03 : 0.05)
            .pointsData([{ lat: 1.3521, lng: 103.8198 }]) // Singapore coordinates
            .pointLabel(() => 'Neowise HQ - Singapore')
            (document.getElementById('globe-container'));

        // Add auto-rotation
        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = window.innerWidth < 768 ? 0.3 : 0.5;

        // Disable zoom on mobile
        if (window.innerWidth < 768) {
            globe.controls().enableZoom = false;
        }

        // Responsive adjustments
        function handleResize() {
            const width = window.innerWidth;
            const height = window.innerHeight;

            if (width < 768) {
                globe.width(width);
                globe.height(height * 0.8);
            } else {
                globe.width(width);
                globe.height(height);
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize();
    } catch (error) {
        console.error('Error initializing globe:', error);
    }
}

function animateStats() {
    const stats = document.querySelectorAll('.number');

    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Handle form label transitions on mobile
document.addEventListener('DOMContentLoaded', function () {
    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');

        if (input.value.trim() !== '') {
            label.style.top = '-0.6rem';
            label.style.left = '0.8rem';
            label.style.fontSize = '0.8rem';
            label.style.color = 'var(--primary)';
            label.style.opacity = '1';
        }

        input.addEventListener('blur', function () {
            if (this.value.trim() === '') {
                label.style.top = '1rem';
                label.style.left = '1rem';
                label.style.fontSize = '1rem';
                label.style.color = 'var(--text)';
                label.style.opacity = '0.7';
            }
        });
    });
});