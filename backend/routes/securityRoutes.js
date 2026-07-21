const express = require('express');
const router = express.Router();
const Security = require('../models/Security');

// Fetch current security settings
router.get('/', async (req, res) => {
  try {
    let security = await Security.findOne();
    if (!security) {
      security = await Security.create({});
    }
    res.json(security);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Authenticate using PIN or Username + Password
router.post('/login', async (req, res) => {
  try {
    const { pin, username, password } = req.body;
    let security = await Security.findOne();
    if (!security) {
      security = await Security.create({});
    }

    // Attempt PIN auth
    if (pin !== undefined && pin !== '') {
      if (pin === security.pin) {
        return res.json({ success: true, message: 'PIN authentication successful' });
      }
      return res.status(401).json({ success: false, message: 'Incorrect PIN' });
    }

    // Attempt ID/Password auth
    if (username !== undefined && password !== undefined) {
      if (username === security.username && password === security.password) {
        return res.json({ success: true, message: 'ID/Password authentication successful' });
      }
      return res.status(401).json({ success: false, message: 'Incorrect Username or Password' });
    }

    return res.status(400).json({ success: false, message: 'Please provide either a PIN or Username/Password' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update PIN or Username + Password
router.post('/update', async (req, res) => {
  try {
    const { pin, username, password } = req.body;
    let security = await Security.findOne();
    if (!security) {
      security = new Security({});
    }

    if (pin !== undefined && pin !== '') {
      security.pin = pin;
    }
    if (username !== undefined && username !== '') {
      security.username = username;
    }
    if (password !== undefined && password !== '') {
      security.password = password;
    }

    await security.save();
    res.json({ 
      success: true, 
      message: 'Credentials updated successfully',
      data: {
        pin: security.pin,
        username: security.username,
        password: security.password
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
