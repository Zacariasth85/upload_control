const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const painelRoutes = require('./routes/painel');

const app = express();
app.use(session({ secret: 'segredo-super-seguro', resave: false, saveUninitialized: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', authRoutes);
app.use('/', painelRoutes);
app.get('/', (req, res) => {
  res.redirect('/login');
});


app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
