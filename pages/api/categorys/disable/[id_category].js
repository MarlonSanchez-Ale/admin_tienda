import { apiHandler } from '@/app/helpers/api/api-handler';
import sequelize from '@/database/config';
const moment = require('moment');
import Category from '@/database/models/category'


export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'PUT':
            return disableCategory();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function disableCategory() {
        const newTransaction = await sequelize.transaction();


        try {
            const { id_category } = req.query;

            //Realizando validaciones
            //Validando la llegada de un nombre de usuario

            if (!id_category) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el id de categoría.'
                });
            }

          

            await Category.update({ user_update: req.user.username, date_update: moment().format('YYYY-MM-DD') ,status: "INACTIVO" } , {
                where: {
                    id_category: id_category
                }
            });

            await newTransaction.commit();

            return res.status(200).send({ title: 'Operación exitosa', message: 'Se eliminado la categoría.', status: 200 })


        } catch (error) {
            await newTransaction.rollback()
            throw error;
        }

    }
}