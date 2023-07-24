import { Sequelize } from "sequelize";
const config = require('@/database/config');

const Products = config.define('products', {
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
    id_products: {
        type: Sequelize.STRING(40),
        allowNull: false,
        primaryKey: true
    },
    image: {
        type: Sequelize.STRING(300),
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    sale_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING(15),
        allowNull: false
    }
}, {
    modelName: 'products',
    tableName: 'products',
    timestamps: false
})


module.exports = Products;
