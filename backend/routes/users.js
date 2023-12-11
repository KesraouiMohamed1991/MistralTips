const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { Bar, Blog, Event } = require('../models/DBModels');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

// Route pour obtenir tous les bars
router.get('/all', async (req, res) => {
  try {
    const bars = await Bar.find(); // Récupère tous les bars de la base de données
    res.json(bars); // Renvoie les données des bars au client
  } catch (error) {
    console.error('Error fetching bars:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route pour obtenir tous les blogs
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find(); // Récupère tous les blogs
    res.json(blogs); // Renvoie les données des blogs au client
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route pour obtenir tous les événements
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find(); // Récupère tous les événements
    res.json(events); // Renvoie les données des événements au client
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route pour l'inscription des utilisateurs
router.post('/users/signup', (req, res) => {
  if (!checkBody(req.body, ['username', 'password', 'mail', 'phoneNumber'])) {
    res.json({ result: false, error: 'Missing or empty fields' }); // Vérifie la présence de tous les champs nécessaires
    return;
  }
  // Vérifie si l'utilisateur existe déjà
  User.findOne({ username: req.body.username }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 4); // Hashage du mot de passe
      const user = new User({
        username: req.body.username,
        password: hash,
        mail: req.body.mail,
        phoneNumber: req.body.phoneNumber,
        token: uid2(16), // Génération d'un token unique
      });

      // Sauvegarde du nouvel utilisateur dans la base de données
      user.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token }); // Renvoie le token à l'utilisateur
      });
    } else {
      res.json({ result: false, error: 'User already exists' }); // Utilisateur existant
    }
  });
})

// Route pour la connexion des utilisateurs
router.post('/users/signin', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' }); // Vérifie la présence de tous les champs nécessaires
    return;
  }

  // Vérifie les identifiants de l'utilisateur
  User.findOne({ username: req.body.username }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token }); // Renvoie le token si les identifiants sont corrects
    } else {
      res.json({ result: false, error: 'User not found or wrong password' }); // Identifiants incorrects
    }
  });
});

// Route pour supprimer un utilisateur
router.delete('/users/deleteOne', (req, res) => {
  if (!checkBody(req.body, ['username'])) {
    res.json({ result: false, error: 'Missing or empty fields' }); // Vérifie la présence du champ username
    return;
  } 
  // Supprime l'utilisateur spécifié
  User.findOneAndDelete({ username: req.body.username }).then(data => {
    if (data) {
      res.json({ result: true, token: data.token }); // Renvoie le token de l'utilisateur supprimé
    } else {
      res.json({ result: false, error: 'User not found' }); // Utilisateur introuvable
    }
  });
})

module.exports = router;