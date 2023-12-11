const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { Bar, Blog, Event } = require('../models/DBModels');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');



router.get('/all', async (req, res) => {
  try {
    const bars = await Bar.find();
    res.json(bars);
  } catch (error) {
    console.error('Error fetching bars:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Check if the user has not already been registered
router.post('/users/signup', (req, res) => {
  if (!checkBody(req.body, ['username', 'password', 'mail', 'phoneNumber'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
User.findOne({ username: req.body.username }).then(data => {
  if (data === null) {
    const hash = bcrypt.hashSync(req.body.password, 4);

    const user = new User({
      username: req.body.username,
      password: hash,
      mail: req.body.mail,
      phoneNumber: req.body.phoneNumber,
      token: uid2(16),
      });

      user.save().then(newDoc => {
      res.json({ result: true, token: newDoc.token });
    });
  } else {
    // User already exists in database
    res.json({ result: false, error: 'User already exists' });
  }
});
})


router.post('/users/signin', (req, res) => {
if (!checkBody(req.body, ['username', 'password'])) {
  res.json({ result: false, error: 'Missing or empty fields' });
  return;
}

User.findOne({ username: req.body.username }).then(data => {
  if (data && bcrypt.compareSync(req.body.password, data.password)) {
    res.json({ result: true, token: data.token });
  } else {
    res.json({ result: false, error: 'User not found or wrong password' });
  }
});
});

router.delete('/users/deleteOne', (req, res) => {
  if (!checkBody(req.body, ['username'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  } 
  User.findOneAndDelete({ username: req.body.username }).then(data => {
    if (data) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
})


module.exports = router;
