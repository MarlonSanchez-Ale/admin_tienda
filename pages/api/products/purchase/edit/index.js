import { apiHandler } from "@/app/helpers/api/api-handler";
import sequelize from "@/database/config";
import Products from "@/database/models/products";
import Purchase from '@/database/models/purchase'

const moment = require('moment');
const { v4 } = require('uuid');

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'PUT':
            return editPurchase()
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function editPurchase() {
        const newTransaction = await sequelize.transaction();

        try {

            const { id_purchase, id_supplier, id_products, quantity, unit_price } = req.body;

            //Realizando validaciones
            //Validando la llegada de un nombre de usuario



            if (!id_purchase) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe especificar la compra.'
                });
            }

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

            if (!quantity) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar la cantidad de producto comprado.'
                });
            }

            if (!unit_price) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el precio por unidad.'
                });
            }


            //quantity_products es la cantidad actual de producto comprado

            const exist = await Purchase.findAll({
                where: {
                    id_purchase: id_purchase
                }
            })



            console.log("-----------------------------------------------------------------")

            console.log(id_purchase)


            if (!exist) {
                res.status(400).json({
                    title: 'Se ha detectado un error, dato inválido.',
                    message: 'La compra no existe en la base de datos.'
                });
                return;
            }


            const updateRegister = {
                user_register: req.user.username,
                date_purchase: moment().format('YYYY-MM-DD'),
                id_supplier: id_supplier.value,
                quantity_products: quantity,
                unit_price: unit_price,
                total_cost: Number(unit_price) * Number(quantity)
            }

            const nuevoStock = Number(searchProducts(id_products)) - Number(searchQuantityProduct(id_purchase)) + Number(quantity);

            await Purchase.update(updateRegister, {
                where: {
                    id_purchase
                }
            });

            await Products.update({ user_update: req.user.username, date_update: moment().format('YYYY-MM-DD'), stock: nuevoStock }, {
                where: {
                    id_products: id_products
                }
            });

            await newTransaction.commit();

            return res.status(200).json({
                title: 'Operación exitosa',
                message: 'Se ha editado la información correctamente.',
                status: 200
            });


        } catch (error) {
            await newTransaction.rollback()
            throw error;
        }
    }
}


async function searchQuantityProduct(id_purchase) {

    const { quantity_products } = await Purchase.findOne({
        attributes: ['quantity_products'],
        where: {
            id_purchase: id_purchase
        }
    })

    return quantity_products
}

async function searchProducts(id_products) {
    const { stock } = await Products.findOne({
        attributes: ['stock'],
        where: {
            id_products: id_products
        }
    })
    return stock
}