import { Sequelize } from "sequelize";
const config = require('@/database/config');
import Products from '@/database/models/products'
import Supplier from '@/database/models/supplier'

const Purchase = config.define('purchase', {
    user_register: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
    date_purchase: {
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
    unit_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total_cost: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    modelName: 'purchase',
    tableName: 'purchase',
    timestamps: false
})

//Products.belongsToMany(Products, { through: Purchase, foreignKey: 'id_products' });
//Supplier.belongsToMany(Supplier, { through: Purchase, foreignKey: 'id_supplier' });

module.exports = Purchase;
