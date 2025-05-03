const express = require('express');
const router = express.Router();

const USER = { 
  email: process.env.EMAIL, 
  senha: process.env.SENHA 
};

router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  if (email === USER.email && senha === USER.senha) {
    req.session.user = email;
    res.redirect('/painel');
  } else {
    res.render('login', { error: 'Credenciais inválidas' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;
