const Sequelize = require('sequelize');
const db = require('../config/database');
const User = db.define('user', {
    username: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});


const Post = db.define('post', {
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.INTEGER,
    }
});


User.hasMany(Post)
Post.belongsTo(User);

module.exports = { User, Post };