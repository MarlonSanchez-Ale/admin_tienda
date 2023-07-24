import { Sequelize } from "sequelize";
const config = require("@/database/config")


const Category = config.define('category', {
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
    id_category: {
        type: Sequelize.STRING(40),
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    status: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
}, {
    modelName: 'category',
    tableName: 'category',
    timestamps: false
});

module.exports = Category;