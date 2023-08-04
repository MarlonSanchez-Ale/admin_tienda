import { apiHandler } from "@/app/helpers/api/api-handler";
import sequelize from "@/database/config";
import { Op, QueryTypes } from 'sequelize';
import Products from '@/database/models/products'
import Category from '@/database/models/category'
import Details_Products from '@/database/models/details_products'
import { searchProducts, searchProductsPurchase } from "@/app/constants/sql_querys";

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return detailProducts();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function detailProducts() {
        const { id_products } = req.query;
        if (!id_products) {
            throw 'No especificó el usuario que desea ver';
        }


        const products = await sequelize.query(`${searchProducts(id_products)}`, { type: QueryTypes.SELECT });

        const purchase = await sequelize.query(`${searchProductsPurchase(id_products)}`, { type: QueryTypes.SELECT })

        return res.status(200).json({
            producto: {
                dataProducts: products,
                dataPurchase: purchase
            }

        });
    }
}