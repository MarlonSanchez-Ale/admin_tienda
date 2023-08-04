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



module.exports = Details_Sales;
