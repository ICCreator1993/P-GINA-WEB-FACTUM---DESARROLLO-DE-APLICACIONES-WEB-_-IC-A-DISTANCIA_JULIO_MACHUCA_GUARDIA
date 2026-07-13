:root {
    --bg-primary: #F8F9FA;
    --bg-dark: #121212;
    --bg-card: #FFFFFF;
    --text-main: #1A1A1A;
    --text-muted: #666666;
    --text-light: #F8F9FA;
    --accent: #D4AF37; /* Oro Mate Premium */
    --danger: #C0392B;
    --success: #27AE60;
    --transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    --font-title: 'Montserrat', 'Helvetica Neue', sans-serif;
    --font-body: 'Inter', 'Segoe UI', sans-serif;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: var(--font-body);
    background-color: var(--bg-primary);
    color: var(--text-main);
    line-height: 1.6;
    overflow-x: hidden;
}

h1, h2, h3, h4 {
    font-family: var(--font-title);
    font-weight: 700;
    letter-spacing: -0.02em;
    text-transform: uppercase;
}

a {
    text-decoration: none;
    color: inherit;
    transition: var(--transition);
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    transition: var(--transition);
    padding: 24px 0;
}

header.scrolled, header:not(#home) {
    background-color: rgba(18, 18, 18, 0.95);
    backdrop-filter: blur(10px);
    padding: 16px 0;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

header.scrolled .logo, header:not(#home) .logo { color: var(--text-light); }
header.scrolled nav a, header:not(#home) nav a { color: #BBBBBB; }
header.scrolled nav a:hover, header.scrolled nav a.active, header:not(#home) nav a:hover { color: var(--accent); }

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-family: var(--font-title);
    font-size: 24px;
    font-weight: 900;
    letter-spacing: 4px;
    color: var(--text-main);
    cursor: pointer;
}

.logo span { color: var(--accent); }
nav ul { display: flex; gap: 32px; list-style: none; }

nav a {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--text-main);
    padding: 8px 0;
    position: relative;
}

nav a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--accent);
    transition: var(--transition);
}

nav a:hover::after, nav a.active::after { width: 100%; }
nav a.active { color: var(--accent); }

.nav-admin-btn {
    border: 1px solid var(--accent);
    padding: 6px 12px !important;
    color: var(--accent) !important;
}

.page-view {
    display: none;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    padding-top: 120px;
    min-height: 100vh;
}

.page-view.active {
    display: block;
    opacity: 1;
    transform: translateY(0);
}

.btn {
    display: inline-block;
    padding: 14px 28px;
    font-family: var(--font-title);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    border: 2px solid var(--text-main);
    background: transparent;
    cursor: pointer;
    transition: var(--transition);
}

.btn-primary { background-color: var(--text-main); color: var(--text-light); }
.btn-primary:hover {
    background-color: var(--accent);
    border-color: var(--accent);
    color: var(--text-light);
}
.btn-danger { border-color: var(--danger); color: var(--danger); padding: 8px 16px; font-size: 10px; }
.btn-danger:hover { background-color: var(--danger); color: white; }
.btn-edit { border-color: var(--accent); color: var(--accent); padding: 8px 16px; font-size: 10px; margin-right: 5px; }
.btn-edit:hover { background-color: var(--accent); color: white; }
.btn-block { width: 100%; }

.section-title { text-align: center; margin-bottom: 48px; }
.section-title h2 { font-size: 32px; }
.section-title::after {
    content: ''; display: block; width: 50px; height: 3px;
    background-color: var(--accent); margin: 16px auto 0;
}

/* --- HERO --- */
#home { padding-top: 0; }
.hero {
    height: 100vh;
    background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;
    display: flex;
    align-items: center;
    color: var(--text-light);
}
.hero-content { max-width: 700px; }
.hero h1 { font-size: 54px; line-height: 1.1; margin-bottom: 24px; }
.hero p { font-size: 18px; margin-bottom: 32px; color: #CCCCCC; }

.home-sections { padding: 80px 0; }
.grid-services { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; }
.service-card {
    background-color: var(--bg-card); padding: 40px;
    border-top: 4px solid var(--text-main);
    box-shadow: 0 10px 30px rgba(0,0,0,0.03); transition: var(--transition);
}
.service-card:hover {
    transform: translateY(-10px); border-top-color: var(--accent);
    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
}
.service-card h3 { margin-bottom: 16px; font-size: 18px; }

/* --- NOSOTROS --- */
.about-wrapper { display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 64px; align-items: center; padding: 40px 0; }
.about-text h2 { font-size: 36px; margin-bottom: 24px; }
.about-text p { color: var(--text-muted); margin-bottom: 20px; }
.about-img img { box-shadow: 20px 20px 0px var(--accent); width: 100%; object-fit: cover; }
.pillars { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin-top: 48px; }
.pillar-item { border-left: 2px solid var(--accent); padding-left: 16px; }
.pillar-item h4 { font-size: 14px; margin-bottom: 8px; }

/* --- PORTAFOLIO --- */
.filter-container { display: flex; justify-content: center; gap: 16px; margin-bottom: 40px; }
.filter-btn {
    background: transparent; border: none; font-family: var(--font-title);
    font-size: 12px; font-weight: 600; text-transform: uppercase;
    letter-spacing: 1px; padding: 8px 16px; cursor: pointer;
    transition: var(--transition); border-bottom: 2px solid transparent;
}
.filter-btn.active, .filter-btn:hover { color: var(--accent); border-bottom-color: var(--accent); }
.grid-portfolio { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; }
.portfolio-item { position: relative; overflow: hidden; background-color: var(--bg-dark); }
.portfolio-item img { transition: var(--transition); width: 100%; height: 400px; object-fit: cover; }
.portfolio-overlay {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(18, 18, 18, 0.85); display: flex; flex-direction: column;
    justify-content: center; align-items: center; opacity: 0;
    transition: var(--transition); padding: 24px; color: var(--text-light);
}
.portfolio-item:hover img { transform: scale(1.05); }
.portfolio-item:hover .portfolio-overlay { opacity: 1; }
.portfolio-overlay h3 { font-size: 20px; margin-bottom: 8px; transform: translateY(20px); transition: var(--transition); }
.portfolio-overlay p { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); transform: translateY(20px); transition: var(--transition); transition-delay: 0.1s; }
.portfolio-item:hover .portfolio-overlay h3, .portfolio-item:hover .portfolio-overlay p { transform: translateY(0); }

/* --- CONTACTO --- */
.contact-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; padding: 40px 0; }
.contact-info h3, .contact-form h3 { font-size: 20px; margin-bottom: 24px; }
.contact-desc { color: var(--text-muted); margin-bottom: 32px; }
.contact-details { margin-bottom: 40px; }
.contact-detail-item { margin-bottom: 20px; }
.contact-detail-item strong { display: block; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; color: var(--accent); }
.form-group { margin-bottom: 24px; }
.form-control {
    width: 100%; padding: 16px; border: 1px solid #DDDDDD;
    background-color: var(--bg-card); font-family: var(--font-body);
    font-size: 14px; transition: var(--transition);
}
.form-control:focus { outline: none; border-color: var(--accent); }
textarea.form-control { height: 150px; resize: none; }

/* --- SECCIÓN ADMIN CRUD --- */
.admin-actions { margin-bottom: 30px; display: flex; justify-content: flex-end; }
.table-responsive { width: 100%; overflow-x: auto; background: var(--bg-card); box-shadow: 0 4px 20px rgba(0,0,0,0.02); }
.admin-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 14px; }
.admin-table th, .admin-table td { padding: 16px 24px; border-bottom: 1px solid #EEEEEE; }
.admin-table th { background-color: var(--bg-dark); color: var(--text-light); text-transform: uppercase; font-size: 12px; letter-spacing: 1px; }
.admin-table td img { width: 60px; height: 40px; object-fit: cover; border-radius: 2px; }

/* --- VENTANA MODAL --- */
.modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 2000; align-items: center; justify-content: center; backdrop-filter: blur(5px); }
.modal.active { display: flex; }
.modal-content { background: var(--bg-card); padding: 40px; width: 100%; max-width: 500px; position: relative; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
.modal-content h3 { margin-bottom: 24px; font-size: 20px; border-bottom: 2px solid var(--accent); padding-bottom: 10px; }
.close-modal { position: absolute; top: 20px; right: 20px; font-size: 28px; cursor: pointer; color: var(--text-muted); transition: var(--transition); }
.close-modal:hover { color: var(--text-main); }

footer { background-color: var(--bg-dark); color: var(--text-light); padding: 60px 0; margin-top: 80px; }
.footer-content { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #222222; padding-top: 40px; }
.footer-logo { font-family: var(--font-title); font-weight: 900; letter-spacing: 3px; }
.footer-logo span { color: var(--accent); }
.copyright { color: #666666; font-size: 13px; }

/* --- DISEÑO RESPONSIVO (MEDIA QUERIES) --- */
@media (max-width: 992px) {
    .about-wrapper, .contact-wrapper { grid-template-columns: 1fr; gap: 40px; }
    .hero h1 { font-size: 42px; }
}

@media (max-width: 768px) {
    header { background-color: var(--bg-dark); padding: 16px 0; }
    .nav-container { flex-direction: column; gap: 16px; }
    nav ul { gap: 16px; flex-wrap: wrap; justify-content: center; }
    .hero h1 { font-size: 32px; }
    .hero p { font-size: 15px; }
    .filter-container { flex-wrap: wrap; }
    .admin-table th, .admin-table td { padding: 12px 14px; font-size: 12px; }
}
