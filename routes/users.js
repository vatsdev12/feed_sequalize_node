const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Post = require('../models/index');
const User = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get users list
router.get('/', (req, res) =>
  User.findAll()
    .then(users => res.send(users))
    .catch(err => res.send(err)));

// add user 
router.post('/add', (req, res) => {
  let { username, email, password } = req.body;

  let errors = [];

  // Validate Fields
  if (!username) {
    errors.push('Please add a username');
  }
  if (!email) {
    errors.push('Please add a email');
  }
  if (!password) {
    errors.push('Please add a password');
  }

  // Check for errors
  if (errors.length > 0) {
    res.send(errors);
  }
  else {
    // Insert into table
    User.create({
      username,
      email,
      password
    })
      .then(user => res.send(user))
      .catch(err => res.send(err))
  }
});



module.exports = router;