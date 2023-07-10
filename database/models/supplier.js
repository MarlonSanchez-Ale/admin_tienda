import { Sequelize } from "sequelize";
const config = require('@/database/config');

const Supplier = config.define('supplier', {
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
    id_supplier: {
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
    address: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    phone: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
}, {
    modelName: 'supplier',
    tableName: 'supplier',
    timestamps: false
})

module.exports = Supplier;
