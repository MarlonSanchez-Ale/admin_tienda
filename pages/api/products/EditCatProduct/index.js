import { apiHandler } from '@/app/helpers/api/api-handler';
import sequelize from '@/database/config';
import Details_Products from '@/database/models/details_products'


export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'PUT':
            return EditCatProduct();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function EditCatProduct() {
        const newUserTransaction = await sequelize.transaction();

        const { id_products, id_category } = req.body;

        try {


            //Validaciones

            //Validando que el usuario esta llegando como parametro

            if (!id_products) {
                res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el id del producto.'
                });
                return;
            }

            // Validando que se esta recibiendo un nuvo id group

            if (!id_category) {
                res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar la categoría del producto.'
                });
                return;
            }

            const existUpdate = await Details_Products.findAll({
                where: {
                    id_products: id_products,
                    id_category: id_category.value
                }
            });

            if (existUpdate.length > 0) {
                res.status(400).json({
                    title: 'Se ha detectado un error, dato inválido.',
                    message: 'El producto ya tiene la categoría seleccionada, seleccione otra.'
                });
                return;
            }

            const update = {
                id_products: id_products,
                id_category: id_category.value
            };

            await Details_Products.update({ id_category: update.id_category }, {
                where: {
                    id_products: update.id_products
                }
            });

            await newUserTransaction.commit();

            return res.status(200).json({
                title: 'Operación exitosa',
                message: 'La categoría del producto se ha editado correctamente.'
            })

        } catch (error) {
            await newUserTransaction.rollback();
            throw error;
        }
    }
}