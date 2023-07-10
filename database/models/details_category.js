import { Sequelize } from "sequelize";
const config = require('@/database/config');
import Products from '@/database/models/products'
import Category from '@/database/models/category'

const Details_Category = config.define('details_category', {
    id_products: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    id_category: {
        type: Sequelize.STRING(40),
        allowNull: false,
    }
}, {
    modelName: 'details_category',
    tableName: 'details_category',
    timestamps: false
})

Products.belongsToMany(Products, { through: Details_Category, foreignKey: 'id_products' });
Category.belongsToMany(Category, { through: Details_Category, foreignKey: 'id_category' });

module.exports = Details_Category;
