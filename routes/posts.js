const express = require('express');
const router = express.Router();
const { Post } = require('../models/index');
const { User } = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get Post list
router.get('/', (req, res) =>
    Post.findAll({
        include: [{// Notice `include` takes an ARRAY
            model: User,
        }]
    })
        .then(users => res.send(users))
        .catch(err => res.send(err)));

// add Post 
router.post('/add', (req, res) => {
    let { title, description, userId } = req.body;
    console.log("add user body print", req.body);


    let errors = [];

    // Validate Fields
    if (!title) {
        errors.push('Please add a title');
    }
    if (!description) {
        errors.push('Please add a description');
    }
    if (!userId) {
        errors.push('Please add a userId');
    }

    // Check for errors
    if (errors.length > 0) {
        res.send(errors);
    }
    else {
        // Insert into table
        Post.create({
            title,
            description,
            userId
        })
            .then(post => res.send(post))
            .catch(err => res.send(err))
    }
});


// update Post 
router.patch('/update', (req, res) => {
    let { title, description, postId } = req.body;
    let errors = [];
    // Validate Fields
    if (!postId) {
        errors.push('PostId can not be Empty');
    }

    // Check for errors
    if (errors.length > 0) {
        res.send(errors);
    }
    else {
        // Insert into table
        Post.update({
            title,
            description,
        }, { where: { id: postId } })
            .then(post => res.send(post))
            .catch(err => res.send(err))
    }
});


// update Post 
router.delete('/delete', (req, res) => {
    let { postId } = req.body;
    console.log("sssssssssss", postId);

    let errors = [];
    // Validate Fields
    if (!postId) {
        errors.push('PostId can not be Empty');
    }

    // Check for errors
    if (errors.length > 0) {
        res.send(errors);
    }
    else {
        // Insert into table
        Post.destroy({ where: { id: postId } })
            .then(post => res.sendStatus(200))
            .catch(err => console.log("errrrr", err)
            )
    }
});

module.exports = router;