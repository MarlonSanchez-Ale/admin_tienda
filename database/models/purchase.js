import { Sequelize } from "sequelize";
const config = require('@/database/config');
import Products from '@/database/models/products'
import Supplier from '@/database/models/supplier'

const Purchase = config.define('purchase', {
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
    id_purchase: {
        type: Sequelize.STRING(40),
        allowNull: false,
        primaryKey: true
    },
    id_supplier: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    id_products: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    quantity_products: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    purchase_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING(15),
        allowNull: false
    }
}, {
    modelName: 'purchase',
    tableName: 'purchase',
    timestamps: false
})

Products.belongsToMany(Products, { through: Purchase, foreignKey: 'id_products' });
Supplier.belongsToMany(Supplier, { through: Purchase, foreignKey: 'id_supplier' });

module.exports = Purchase;
