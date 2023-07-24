import { apiHandler } from "@/app/helpers/api/api-handler";
import sequelize from "@/database/config";
import Products from '@/database/models/products'

const moment = require('moment');
const { v4 } = require('uuid');

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'PUT':
            return editPointSale()
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function editPointSale() {
        const newTransaction = await sequelize.transaction();

        try {

            const { id_products } = req.query;

            //Realizando validaciones
            //Validando la llegada de un nombre de usuario
            const esValido = /^\d{8}$/

            if (!id_products) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el id del producto.'
                });
            }

            const exist = await Products.findAll({
                where: {
                    id_products
                }
            })

            if (!exist.length > 0) {
                res.status(400).json({
                    title: 'Se ha detectado un error, dato inválido.',
                    message: 'El producto no existe en la base de datos.'
                });
                return;
            }

            const updateRegister = {
                user_update: req.user.username,
                date_update: moment().format('YYYY-MM-DD'),
                status: 'INACTIVO'
            }

            await Products.update(updateRegister, {
                where: {
                    id_products
                }
            });

            await newTransaction.commit();

            return res.status(200).json({
                title: 'Operación exitosa',
                message: 'El producto se ha desactivado correctamente.',
                status: 200
            });


        } catch (error) {
            await newTransaction.rollback()
            throw error;
        }
    }
}
