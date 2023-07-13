import { apiHandler } from "@/app/helpers/api/api-handler";
import sequelize from "@/database/config";
import Point_Sales from '@/database/models/point_sales'

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

            const { id_point_sale, name, address, phone } = req.body;

            //Realizando validaciones
            //Validando la llegada de un nombre de usuario
            const esValido = /^\d{8}$/

            if (!id_point_sale) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el id del punto de venta.'
                });
            }

            if (!name) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el nombre del punto de venta.'
                });
            }



            if (!address) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar  la dirección del punto de venta.'
                });
            }

            if (!phone) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar  el número del punto de venta.'
                });
            }

            if (!esValido.test(phone)) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por dato inválido.',
                    message: 'El número de teléfono debe tener 8 digitos.'
                });
            }

            const exist = await Point_Sales.findAll({
                where: {
                    id_point_sale
                }
            })

            if (!exist.length > 0) {
                res.status(400).json({
                    title: 'Se ha detectado un error, dato inválido.',
                    message: 'El punto de vista ya existe en la base de datos.'
                });
                return;
            }

            const updateRegister = {
                user_update: req.user.username,
                date_update: moment().format('YYYY-MM-DD'),
                name: name,
                address: address,
                phone: phone
            }


            await Point_Sales.update(updateRegister, {
                where: {
                    id_point_sale
                }
            });

            await newTransaction.commit();

            return res.status(200).json({
                title: 'Operación exitosa',
                message: 'El punto de venta se ha editado correctamente.',
                status: 200
            });


        } catch (error) {
            await newTransaction.rollback()
            throw error;
        }
    }
}
