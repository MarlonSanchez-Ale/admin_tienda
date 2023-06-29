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
        const { id_user, user_name, firstname, lastname, email, phone } = req.body;

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

            if (!firstname) {
                res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el primer nombre.'
                });
                return;
            }

            // validando si el password nuevo cumple con las expresiones regulares
            if (!lastname) {
                res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el apellido'
                });
                return;
            }

            // Validando confirmacion de password

            if (!email) {
                res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el correo'
                });
                return;
            }

            // Validando que la contraseñas sean iguales

            if (!phone) {
                res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el número de celular'
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


            const updateUser = {
                user_update: req.user.username,
                date_update: moment().format('YYYY-MM-DD'),
                name: firstname + " " +lastname,
                email: email,
                phone: phone
            };

            await User.update(updateUser , {
                where: {
                    id_users: id_user
                }
            });


            await newUserTransaction.commit();

            return res.status(200).send({ title: 'Operación exitosa', message: 'Se editado el usuario correctamente.', status: 200 })
        } catch (error) {
            await newUserTransaction.rollback();
            throw error;
        }
    }

}