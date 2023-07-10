import { apiHandler } from "@/app/helpers/api/api-handler";
import sequelize from "@/database/config";
import Supplier from '@/database/models/supplier'

const moment = require('moment');
const { v4 } = require('uuid');

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return createCategory()
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function createCategory() {
        const newTransaction = await sequelize.transaction();

        try {

            const { name, description, address, phone } = req.body;

            //Realizando validaciones
            //Validando la llegada de un nombre de usuario
            const esValido = /^\d{8}$/

            if (!name) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el nombre del proveedor.'
                });
            }

            if (!description) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar  la descripción del proveedor.'
                });
            }

            if (!address) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar  la dirección del proveedor.'
                });
            }

            if (!phone) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar  el número del proveedor.'
                });
            }

            if (!esValido.test(phone)) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por dato inválido.',
                    message: 'El número de teléfono debe tener 8 digitos.'
                });
            }

            const exist = await Supplier.findAll({
                where: {
                    name
                }
            })

            if (exist.length > 0) {
                res.status(400).json({
                    title: 'Se ha detectado un error, dato inválido.',
                    message: 'La categoría ya existe en la base de datos.'
                });
                return;
            }

            const newRegister = {
                user_create: req.user.username,
                user_update: req.user.username,
                date_create: moment().format('YYYY-MM-DD'),
                date_update: moment().format('YYYY-MM-DD'),
                id_supplier: v4(),
                name: name,
                description: description,
                address: address,
                phone: phone,
                status: "ACTIVO"
            }


            await Supplier.create(newRegister, {
                transaction: newTransaction
            });

            await newTransaction.commit();

            return res.status(200).json({
                title: 'Operación exitosa',
                message: 'El proveedor se ha creado correctamente.',
                status: 200
            });


        } catch (error) {
            await newTransaction.rollback()
            throw error;
        }
    }
}
 