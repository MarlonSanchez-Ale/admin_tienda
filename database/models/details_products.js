import { Sequelize } from "sequelize";
const config = require('@/database/config');
import Products from '@/database/models/products'
import Category from '@/database/models/category'

const Details_Products = config.define('details_products', {
    id_details_category: {
        type: Sequelize.STRING(40),
        allowNull: false,
        primaryKey: true
    },
    id_products: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    id_category: {
        type: Sequelize.STRING(40),
        allowNull: false,
    }
}, {
    modelName: 'details_products',
    tableName: 'details_products',
    timestamps: false
})

//Products.belongsToMany(Products, { through: Details_Products, foreignKey: 'id_products' });
//Category.belongsToMany(Category, { through: Details_Products, foreignKey: 'id_category' });

module.exports = Details_Products;
