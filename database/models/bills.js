import { Sequelize } from "sequelize";
const config = require("@/database/config")


const Bills = config.define('bills', {
    register: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
    bill_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    id_bills: {
        type: Sequelize.STRING(40),
        allowNull: false,
        primaryKey: true
    },
    bills: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
}, {
    modelName: 'bills',
    tableName: 'bills',
    timestamps: false
});

module.exports = Bills;