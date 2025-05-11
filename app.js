const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const painelRoutes = require('./routes/painel');

const app = express();
app.use(session({ 
  secret: process.env.SESSION_SECRET || 'segredo-super-seguro', 
  resave: false, 
  saveUninitialized: false 
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', authRoutes);
app.use('/', painelRoutes);
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Exportar o app para o Vercel
module.exports = app;

// Iniciar servidor local apenas em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
}
