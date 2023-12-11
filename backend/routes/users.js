const express = require('express');
const router = express.Router();

const { Bar, Blog, Event } = require('../models/DBModels');






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

module.exports = router;
