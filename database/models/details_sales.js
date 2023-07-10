import { Sequelize } from "sequelize";
const config = require('@/database/config');
import Products from '@/database/models/products'
import Sales from '@/database/models/sales'
import Point_Sales from '@/database/models/point_sales'

const Details_Sales = config.define('details_sales', {
    id_details_sales: {
        type: Sequelize.STRING(40),
        allowNull: false,
        primaryKey: true
    },
    id_sale: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    id_products: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    id_point_sale: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    discount: {
        type: Sequelize.INTEGER
    }
}, {
    modelName: 'details_sales',
    tableName: 'details_sales',
    timestamps: false
})

Sales.belongsToMany(Sales, { through: Details_Sales, foreignKey: 'id_sale' });
Products.belongsToMany(Products, { through: Details_Sales, foreignKey: 'id_products' });
Point_Sales.belongsToMany(Point_Sales, { through: Details_Sales, foreignKey: 'id_point_sale' });

module.exports = Details_Sales;
