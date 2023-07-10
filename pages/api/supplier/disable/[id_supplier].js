import { apiHandler } from "@/app/helpers/api/api-handler";
import sequelize from "@/database/config";
import Supplier from '@/database/models/supplier'

const moment = require('moment');

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'PUT':
            return createCategory()
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function createCategory() {
        const newTransaction = await sequelize.transaction();

        try {

            const { id_supplier } = req.query;

            //Realizando validaciones
            //Validando la llegada de un nombre de usuario

            if (!id_supplier) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el id del proveedor.'
                });
            }

          
            const exist = await Supplier.findAll({
                where: {
                    id_supplier
                }
            })

            if (!exist.length > 0) {
                res.status(400).json({
                    title: 'Se ha detectado un error, dato inválido.',
                    message: 'El proveedor no existe en la base de datos.'
                });
                return;
            }

            const updateRegister = {
                user_update: req.user.username,
                date_update: moment().format('YYYY-MM-DD'),
                status: 'INACTIVO'
            }


            await Supplier.update(updateRegister, {
                where: {
                    id_supplier
                }
            });

            await newTransaction.commit();

            return res.status(200).json({
                title: 'Operación exitosa',
                message: 'Se ha inhabilitado el proveedor correctamente.',
                status: 200
            });


        } catch (error) {
            await newTransaction.rollback()
            throw error;
        }
    }
}
