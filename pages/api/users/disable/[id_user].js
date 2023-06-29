import { apiHandler } from '@/app/helpers/api/api-handler';
import sequelize from '@/database/config';
const moment = require('moment');
import User from '@/database/models/user';


export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'PUT':
            return changePassword();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function changePassword() {
        const newUserTransaction = await sequelize.transaction();
        const { id_user } = req.query;

        try {

            //validaciones 

            //validando que ha sido recibido el dato a cambiar
            // validando que se ha enviado un userName

            if (!id_user) {
                res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'No se ha recibido el id del usuario.'
                });
                return;
            }

            const userSearched = await User.findOne({
                where: {
                    id_users: id_user,
                },
                order: [
                    ['id_users', 'DESC']
                ]
            });

            if (!userSearched) {
                res.status(400).json({
                    title: 'Se ha detectado un error.',
                    message: 'El usuario ingresado no existe'
                });
                return;
            }


            await User.update({ user_update: req.user.username, date_update: moment().format('YYYY-MM-DD') ,status: "INACTIVO" }, {
                where: {
                    id_users: id_user
                }
            });


            await newUserTransaction.commit();

            return res.status(200).send({ title: 'Operación exitosa', message: 'Se desactivado el usuario correctamente.', status: 200 })
        } catch (error) {
            await newUserTransaction.rollback();
            throw error;
        }
    }

}