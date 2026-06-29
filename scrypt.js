
document.addEventListener('DOMContentLoaded', () => {
    
    const links = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page-view');
    const header = document.getElementById('main-header');
    const logoLink = document.querySelector('.logo');
    const heroCta = document.getElementById('hero-cta');
    const contactForm = document.getElementById('factumForm');

  
    function navigateTo(targetId) {

        links.forEach(link => {
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        pages.forEach(page => {
            if (page.id === targetId) {
                page.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                page.classList.remove('active');
            }
        });

        if (targetId !== 'home') {
            header.classList.add('scrolled');
        } else if (window.scrollY < 50) {
            header.classList.remove('scrolled');
        }
    }

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.getAttribute('data-target'));
        });
    });

    if(logoLink) {
        logoLink.addEventListener('click', (e) => { e.preventDefault(); navigateTo('home'); });
    }
    if(heroCta) {
        heroCta.addEventListener('click', () => navigateTo('portfolio'));
    }

    // --- 2. CONTROL DEL HEADER CON EL SCROLL (EFECTO TRASLÚCIDO) ---
    window.addEventListener('scroll', () => {
        const activePage = document.querySelector('.page-view.active');
        if (activePage && activePage.id === 'home') {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // Pequeño timeout para sincronizar la animación CSS suave
                    setTimeout(() => { 
                        item.style.opacity = '1'; 
                        item.style.transform = 'scale(1)'; 
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => { 
                        item.style.display = 'none'; 
                    }, 400); // Coincide con la velocidad de transición de estilos
                }
            });
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('¡Solicitud registrada con éxito! El equipo técnico de FACTUM se pondrá en contacto contigo para coordinar la revisión del proyecto.');
            contactForm.reset();
        });
    }
});
