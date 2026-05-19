document.addEventListener("DOMContentLoaded", () => {
    // === LENIS SMOOTH SCROLL ===
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // === NAVBAR ===
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });
    }

    if (navToggle && navLinks) {
        let menuOpen = false;
        const spans = navToggle.querySelectorAll('span');
        navToggle.addEventListener('click', () => {
            menuOpen = !menuOpen;
            if (menuOpen) {
                navLinks.classList.add('open');
                spans[0].style.transform = 'rotate(45deg) translateY(7px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
            } else {
                navLinks.classList.remove('open');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        document.querySelectorAll('.nav-links a').forEach(a => {
            a.addEventListener('click', () => {
                menuOpen = false;
                navLinks.classList.remove('open');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // === GSAP ANIMATIONS ===
    gsap.registerPlugin(ScrollTrigger);

    // Hero Petals
    const petalsContainer = document.querySelector('.petals-container');
    if (petalsContainer) {
        const petals = petalsContainer.querySelectorAll('.petal');
        petals.forEach(petal => {
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const duration = 6 + Math.random() * 8;
            const delay = Math.random() * 5;

            gsap.set(petal, {
                left: `${startX}%`,
                top: `${startY}%`,
                opacity: 0,
                scale: 0.6 + Math.random() * 0.6,
            });

            gsap.to(petal, {
                y: -150 - Math.random() * 200,
                x: (Math.random() - 0.5) * 150,
                rotation: Math.random() * 360,
                opacity: 0.5 + Math.random() * 0.3,
                duration: duration,
                delay: delay,
                ease: 'none',
                repeat: -1,
                modifiers: { y: (y) => { const val = parseFloat(y); if (val < -300) return '100%'; return y; } },
            });

            gsap.to(petal, { opacity: 0.6, duration: 2, delay: delay, ease: 'power1.in' });
        });
        
        // Hero Entry animations (Replacing framer-motion)
        gsap.fromTo(".hero-logos, .hero-title, .hero-subtitle, .hero-ctas", 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, delay: 0.3, ease: "power3.out" }
        );
    }

    // About Section
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        gsap.fromTo(aboutSection.querySelectorAll('.about-reveal'),
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: aboutSection, start: 'top 80%' } }
        );

        gsap.fromTo(aboutSection.querySelectorAll('.stat-card'),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: aboutSection.querySelector('.stats-grid'), start: 'top 90%' } }
        );
    }

    // Vibe Section
    const vibeSection = document.getElementById('vibe');
    if (vibeSection) {
        gsap.fromTo(vibeSection.querySelectorAll('.vibe-header-reveal'),
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: vibeSection, start: 'top 85%' } }
        );
    }
});
