const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const REPO = process.env.REPO;
const TOKEN = process.env.TOKEN;

function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}

router.get('/painel', isAuthenticated, (req, res) => {
  res.render('painel', { url: null, error: null });
});

router.post('/upload', isAuthenticated, upload.single('imagem'), async (req, res) => {
  const imagePath = req.file.path;
  const imageName = req.file.originalname;
  const imageContent = fs.readFileSync(imagePath, { encoding: 'base64' });

  try {
    const response = await axios.put(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO}/contents/${imageName}`,
      {
        message: `upload de ${imageName}`,
        content: imageContent
      },
      {
        headers: {
          Authorization: `token ${TOKEN}`
        }
      }
    );

    const imageUrl = response.data.content.download_url;
    res.render('painel', { url: imageUrl, error: null });
  } catch (err) {
    res.render('painel', { url: null, error: 'Erro ao enviar imagem' });
  } finally {
    fs.unlinkSync(imagePath);
  }
});

module.exports = router;
