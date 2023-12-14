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

router.post('/users/signup', async (req, res) => {
  try {
    if (!checkBody(req.body, ['username', 'password', 'mail', 'phoneNumber'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }

    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      res.json({ result: false, error: 'User already exists' });
    } else {
      const hash = bcrypt.hashSync(req.body.password, 4);
      const user = new User({
        username: req.body.username,
        password: hash,
        mail: req.body.mail,
        phoneNumber: req.body.phoneNumber,
        token: uid2(16),
      });

      const savedUser = await user.save();

      res.json({
        result: true,
        token: savedUser.token,
        mail: savedUser.mail,
        username: savedUser.username
      });
    }
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/users/signin', async (req, res) => {
  try {
    if (!checkBody(req.body, ['username', 'password'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }

    const user = await User.findOne({ username: req.body.username });

    if (user && bcrypt.compareSync(req.body.password, user.password)) {

      res.json({
        result: true,
        user
      });

      console.log(user);
      
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/users/deleteOne', async (req, res) => {
  try {
    if (!checkBody(req.body, ['username'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }

    const deletedUser = await User.findOneAndDelete({ username: req.body.username });

    if (deletedUser) {
      res.json({ result: true, message: 'User deleted successfully' });
    } else {
      res.json({ result: false, error: 'User not found' });
    }
  } catch (error) {
    console.error('Error during user deletion:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
