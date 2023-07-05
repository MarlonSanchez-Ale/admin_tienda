import { apiHandler } from "@/app/helpers/api/api-handler";
import sequelize from "@/database/config";
import Category from '@/database/models/category'

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

            const { name, description } = req.body;

            //Realizando validaciones
            //Validando la llegada de un nombre de usuario

            if (!name) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el nombre de la categoría.'
                });
            }

            if (!description) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar  la descripción de la categoría.'
                });
            }

            const categoryExist = await Category.findAll({
                where: {
                    name
                }
            })

            if (categoryExist.length > 0) {
                res.status(400).json({
                    title: 'Se ha detectado un error, dato inválido.',
                    message: 'La categoría ya existe en la base de datos.'
                });
                return;
            }

            const newCategory = {
                user_create: req.user.username,
                user_update: req.user.username,
                date_create: moment().format('YYYY-MM-DD'),
                date_update: moment().format('YYYY-MM-DD'),
                id_category: v4(),
                name: name,
                description: description,
                status: "ACTIVO"
            }


            await Category.create(newCategory, {
                transaction: newTransaction
            });

            await newTransaction.commit();

            return res.status(200).json({
                title: 'Operación exitosa',
                message: 'La categoría se ha creado correctamente.',
                newCategory,
                status: 200
            });


        } catch (error) {
            await newTransaction.rollback()
            throw error;
        }
    }
}
