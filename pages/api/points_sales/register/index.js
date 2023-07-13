import { apiHandler } from "@/app/helpers/api/api-handler";
import sequelize from "@/database/config";
import Point_Sales from '@/database/models/point_sales'

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

            const { name, address, phone } = req.body;

            //Realizando validaciones
            //Validando la llegada de un nombre de usuario
            const esValido = /^\d{8}$/

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
                    name
                }
            })

            if (exist.length > 0) {
                res.status(400).json({
                    title: 'Se ha detectado un error, dato inválido.',
                    message: 'El punto de vista ya existe en la base de datos.'
                });
                return;
            }

            const newRegister = {
                user_create: req.user.username,
                user_update: req.user.username,
                date_create: moment().format('YYYY-MM-DD'),
                date_update: moment().format('YYYY-MM-DD'),
                id_point_sale: v4(),
                name: name,
                address: address,
                phone: phone,
                status: "ACTIVO"
            }


            await Point_Sales.create(newRegister, {
                transaction: newTransaction
            });

            await newTransaction.commit();

            return res.status(200).json({
                title: 'Operación exitosa',
                message: 'El punto de venta se ha creado correctamente.',
                status: 200
            });


        } catch (error) {
            await newTransaction.rollback()
            throw error;
        }
    }
}
 