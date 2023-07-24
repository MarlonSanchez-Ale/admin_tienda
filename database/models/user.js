const Sequelize = require('sequelize');
const config = require('../config');

const User = config.define('user', {
    user_create: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
    user_update: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
    date_create: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    date_update: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    id_users: {
        type: Sequelize.STRING(40),
        allowNull: false,
        primaryKey: true
    },
    user_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
    },
    salt: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true,
    },
    hash: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true
    },
    status: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    phone: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = User;
