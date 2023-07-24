import { apiHandler } from "@/app/helpers/api/api-handler";
import sequelize from "@/database/config";
import Bills from '@/database/models/bills'


const moment = require('moment');
const { v4 } = require('uuid');

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return registerBills()
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function registerBills() {
        const newTransaction = await sequelize.transaction();

        try {

            const { bills, description, total } = req.body;

            //Realizando validaciones
            //Validando la llegada de un nombre de usuario
            //const esValido = /^\d{8}$/

            if (!bills) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el nombre del gasto.'
                });
            }

        

            if (!description) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar  la descripción del gasto.'
                });
            }

            if (!total) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar  el total del gasto.'
                });
            }

          

            const newRegister = {
                register: req.user.username,
                bill_date: moment().format('YYYY-MM-DD'),
                id_bills: v4(),
                bills: bills,
                description: description,
                total: total,
            }


            await Bills.create(newRegister, {
                transaction: newTransaction
            });

            await newTransaction.commit();

            return res.status(200).json({
                title: 'Operación exitosa',
                message: 'Se ha registrado el gasto correctamente.',
                status: 200
            });


        } catch (error) {
            await newTransaction.rollback()
            throw error;
        }
    }
}
 