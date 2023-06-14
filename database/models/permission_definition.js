const Sequelize = require('sequelize');
const config = require('../config');

const Permission_Definition = config.define('permission_definition', {
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
    id_permission: {
        type: Sequelize.STRING(15),
        allowNull: false,
        primaryKey: true
    },
    permission: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    de_permission: {
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

module.exports = Permission_Definition;
