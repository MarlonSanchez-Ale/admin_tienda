import { Sequelize } from "sequelize";
const config = require("@/database/config")


const Point_Sales = config.define('point_sales', {
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
    id_point_sale: {
        type: Sequelize.STRING(40),
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    address: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    phone: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.STRING(15),
        allowNull: false
    }
}, {
    modelName: 'point_sales',
    tableName: 'point_sales',
    timestamps: false
});

module.exports = Point_Sales;