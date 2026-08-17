// server.js - Backend / Servicio Web FACTUM
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

// Middlewares de seguridad y parseo
app.use(cors());
app.use(express.json());

// Base de datos simulada en memoria
let projects = [
  { id: "1", title: "Casa Aura", category: "residential", budget: "$450,000", description: "Residencia moderna con acabados en madera sustentable y paneles solares." },
  { id: "2", title: "Torre Prisma", category: "commercial", budget: "$1,200,000", description: "Edificio corporativo de 18 pisos con certificación LEED Gold." },
  { id: "3", title: "Supervisión Vial Eje Norte", category: "infrastructure", budget: "$3,500,000", description: "Infraestructura vial de alta resistencia y señalización inteligente." }
];

// Token JWT Simulado para pruebas
const DUMMY_TOKEN = "factum-token-secret-2026";

// Middleware para verificar autenticación (Seguridad)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token || token !== DUMMY_TOKEN) {
    return res.status(401).json({ error: "Acceso no autorizado o token inválido." });
  }
  next();
};

// --- RUTAS DE LA API (ENDPOINTS) ---

// 1. Obtener proyectos (Consulta pública GET)
app.get('/api/v1/projects', (req, res) => {
  res.json({ success: true, data: projects });
});

// 2. Autenticación / Login (OAuth2/JWT Simulado)
app.post('/api/v1/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'factum2026') {
    return res.json({ success: true, token: DUMMY_TOKEN });
  }
  res.status(401).json({ success: false, error: "Credenciales incorrectas" });
});

// 3. Crear proyecto (Ruta protegida POST)
app.post('/api/v1/projects', authenticateToken, (req, res) => {
  const { title, category, budget, description } = req.body;
  if (!title || !category) {
    return res.status(400).json({ error: "Título y categoría son obligatorios." });
  }
  
  const newProject = {
    id: Date.now().toString(),
    title,
    category,
    budget: budget || "Por cotizar",
    description: description || ""
  };

  projects.push(newProject);
  res.status(201).json({ success: true, data: newProject });
});

// 4. Eliminar proyecto (Ruta protegida DELETE)
app.delete('/api/v1/projects/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  projects = projects.filter(p => p.id !== id);
  res.json({ success: true, message: "Proyecto eliminado correctamente." });
});

// Inicialización del servidor
app.listen(PORT, () => {
  console.log(`Servicio Web FACTUM ejecutándose en http://localhost:${PORT}`);
});
