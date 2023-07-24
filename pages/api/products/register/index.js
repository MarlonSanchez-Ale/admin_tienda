import { apiHandler } from "@/app/helpers/api/api-handler";
import sequelize from "@/database/config";
import Products from "@/database/models/products";
import Details_Products from '@/database/models/details_products'

const moment = require('moment');
const { v4 } = require('uuid');

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return registerPointSale()
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function registerPointSale() {
        const newTransaction = await sequelize.transaction();

        try {

            const { image, name, description, sale_price, stock, id_category } = req.body;

            //Realizando validaciones

            if (!name) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el nombre del producto.'
                });
            }



            if (!description) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar la descripción del producto.'
                });
            }

            if (!sale_price) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el precio de venta del producto.'
                });
            }

            if (!stock) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el inventario del producto.'
                });
            }

            if (!id_category) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar la categoría de producto.'
                });
            }

            const exist = await Products.findAll({
                where: {
                    name
                }
            })

            if (exist.length > 0) {
                res.status(400).json({
                    title: 'Se ha detectado un error, dato inválido.',
                    message: 'El producto ya existe en la base de datos.'
                });
                return;
            }

            const newRegister = {
                user_create: req.user.username,
                user_update: req.user.username,
                date_create: moment().format('YYYY-MM-DD'),
                date_update: moment().format('YYYY-MM-DD'),
                id_products: v4(),
                image: image,
                name: name,
                description: description,
                sale_price: sale_price,
                stock: stock,
                status: "ACTIVO"
            }


            await Products.create(newRegister, {
                transaction: newTransaction
            });

            const newDetails = {
                id_details_category: v4(),
                id_products: newRegister.id_products,
                id_category: id_category.value
            }

            await Details_Products.create(newDetails, {
                transaction: newTransaction
            });

            await newTransaction.commit();

            return res.status(200).json({
                title: 'Operación exitosa',
                message: 'El producto se ha registrado correctamente.',
                status: 200
            });


        } catch (error) {
            await newTransaction.rollback()
            throw error;
        }
    }
}
