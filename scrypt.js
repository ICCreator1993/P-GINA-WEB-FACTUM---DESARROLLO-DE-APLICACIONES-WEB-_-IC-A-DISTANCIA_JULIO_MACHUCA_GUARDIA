// URL del Servicio Web (Cambiar URL local por la proporcionada por Render/Vercel en producción)
const API_BASE_URL = 'http://localhost:3000/api/v1';
let jwtToken = localStorage.getItem('factum_jwt') || '';
let allProjects = [];

// ==========================================
// 1. NAVEGACIÓN SINGLE PAGE APPLICATION (SPA)
// ==========================================
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));

    e.target.classList.add('active');
    const targetId = e.target.getAttribute('data-target');
    document.getElementById(targetId).classList.add('active');
  });
});

function switchView(sectionId) {
  document.querySelector(`[data-target="${sectionId}"]`).click();
}

// ==========================================
// 2. CONSUMO ASÍNCRONO DE LA API (GET)
// ==========================================
async function loadProjects() {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`);
    if (!res.ok) throw new Error('Error al consultar el servicio web');
    
    const result = await res.json();
    allProjects = result.data;
    
    renderPortfolio(allProjects);
    renderAdminTable(allProjects);
  } catch (err) {
    console.error('Error de red:', err);
    document.getElementById('portfolio-grid').innerHTML = '<p>Error al conectar con la API.</p>';
  }
}

function renderPortfolio(projects) {
  const container = document.getElementById('portfolio-grid');
  if (!projects.length) {
    container.innerHTML = '<p>No hay proyectos disponibles.</p>';
    return;
  }

  container.innerHTML = projects.map(p => `
    <article class="project-card">
      <h3>${sanitize(p.title)}</h3>
      <p><strong>Categoría:</strong> ${sanitize(p.category)}</p>
      <p><strong>Presupuesto:</strong> ${sanitize(p.budget)}</p>
      <p>${sanitize(p.description)}</p>
    </article>
  `).join('');
}

// ==========================================
// 3. AUTENTICACIÓN JWT (OAUTH2 SIMULADO)
// ==========================================
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('auth-user').value;
  const password = document.getElementById('auth-pass').value;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
      jwtToken = data.token;
      localStorage.setItem('factum_jwt', jwtToken);
      checkAuthState();
    } else {
      alert(data.error || 'Credenciales incorrectas');
    }
  } catch (err) {
    alert('Fallo de conexión durante la autenticación.');
  }
});

function checkAuthState() {
  const authContainer = document.getElementById('auth-container');
  const crudContainer = document.getElementById('crud-container');

  if (jwtToken) {
    authContainer.classList.add('hidden');
    crudContainer.classList.remove('hidden');
  } else {
    authContainer.classList.remove('hidden');
    crudContainer.classList.add('hidden');
  }
}

function logout() {
  jwtToken = '';
  localStorage.removeItem('factum_jwt');
  checkAuthState();
}

// ==========================================
// 4. OPERACIONES CRUD (CREAR, EDITAR, ELIMINAR)
// ==========================================
function renderAdminTable(projects) {
  const tbody = document.getElementById('admin-table-body');
  tbody.innerHTML = projects.map(p => `
    <tr>
      <td>${sanitize(p.id)}</td>
      <td>${sanitize(p.title)}</td>
      <td>${sanitize(p.category)}</td>
      <td>${sanitize(p.budget)}</td>
      <td>
        <button class="btn btn-dark" onclick="editProject('${p.id}')">Editar</button>
        <button class="btn btn-danger" onclick="deleteProject('${p.id}')">Eliminar</button>
      </td>
    </tr>
  `).join('');
}

document.getElementById('project-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('proj-id').value;
  const payload = {
    title: document.getElementById('proj-title').value,
    category: document.getElementById('proj-category').value,
    budget: document.getElementById('proj-budget').value,
    description: document.getElementById('proj-desc').value
  };

  const method = id ? 'PUT' : 'POST';
  const endpoint = id ? `${API_BASE_URL}/projects/${id}` : `${API_BASE_URL}/projects`;

  try {
    const res = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      document.getElementById('project-form').reset();
      document.getElementById('proj-id').value = '';
      loadProjects();
    } else {
      const errData = await res.json();
      alert(`Error de seguridad o validación: ${errData.error}`);
    }
  } catch (err) {
    alert('Fallo de conexión al guardar.');
  }
});

function editProject(id) {
  const p = allProjects.find(item => item.id === id);
  if (!p) return;
  document.getElementById('proj-id').value = p.id;
  document.getElementById('proj-title').value = p.title;
  document.getElementById('proj-category').value = p.category;
  document.getElementById('proj-budget').value = p.budget;
  document.getElementById('proj-desc').value = p.description;
}

async function deleteProject(id) {
  if (!confirm('¿Seguro que desea eliminar este registro?')) return;

  try {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${jwtToken}` }
    });

    if (res.ok) loadProjects();
    else alert('Error al eliminar. Verifique su sesión.');
  } catch (err) {
    alert('Fallo de conexión.');
  }
}

// Sanitización para prevenir Cross-Site Scripting (XSS)
function sanitize(str) {
  return str ? String(str).replace(/[&<>"']/g, match => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[match])) : '';
}

// Inicialización al cargar la ventana
document.addEventListener('DOMContentLoaded', () => {
  checkAuthState();
  loadProjects();
});
