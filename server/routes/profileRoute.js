const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const {Doctor} = require('../models/doctor');
const {User} = require('../models/user');

router.get('/', verify, async (req, res) => {
  try {
    const profile = await Doctor.findOne({ user: req.user.id }).populate('user',
    ['email', 'password']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;