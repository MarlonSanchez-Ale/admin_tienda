const Sequelize = require('sequelize');
const config = require('../config');

const Profile = config.define('profile', {
    user_create: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
    user_update: {
        type: Sequelize.STRING(15),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    date_create: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    date_update: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    id_profile: {
        type: Sequelize.STRING(15),
        allowNull: false,
        primaryKey: true
    },
    profile: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    de_profile: {
        type: Sequelize.STRING(300),
        allowNull: false,
        unique: true,
    },
    status: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
}, {
    timestamps: false
});

module.exports = Profile;