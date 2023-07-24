import { Sequelize } from "sequelize";
const config = require("@/database/config")


const Sales = config.define('sales', {
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
    id_sale: {
        type: Sequelize.STRING(40),
        allowNull: false,
        primaryKey: true
    },
    quantity_products: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total_sale: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
}, {
    modelName: 'sales',
    tableName: 'sales',
    timestamps: false
});

module.exports = Sales;