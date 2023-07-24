import { apiHandler } from "@/app/helpers/api/api-handler";
import sequelize from "@/database/config";
import Products from "@/database/models/products";
import Purchase from '@/database/models/purchase'

const moment = require('moment');
const { v4 } = require('uuid');

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return registerPurchase()
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function registerPurchase() {
        const newTransaction = await sequelize.transaction();

        try {

            const { id_supplier, id_products, quantity_products, purchase_price } = req.body;

            //Realizando validaciones

            if (!id_supplier) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe especificar el proveedor.'
                });
            }



            if (!id_products) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe especificar el producto'
                });
            }

            if (!quantity_products) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar la cantidad de producto comprado.'
                });
            }

            if (!purchase_price) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar precio total de la compra'
                });
            }


            const newRegister = {
                user_register: req.user.username,
                date_purchase: moment().format('YYYY-MM-DD'),
                id_purchase: v4(),
                id_supplier: id_supplier,
                id_products: id_products,
                quantity_products: quantity_products,
                purchase_price: purchase_price,
            }


            await Purchase.create(newRegister, {
                transaction: newTransaction
            });


            await newTransaction.commit();

            return res.status(200).json({
                title: 'Operación exitosa',
                message: 'Se ha registrado la compra de producto correctamente.',
                status: 200
            });


        } catch (error) {
            await newTransaction.rollback()
            throw error;
        }
    }
}
