import { apiHandler } from '@/app/helpers/api/api-handler';
import sequelize from '@/database/config';
import User from '@/database/models/user';
import User_Profile from '@/database/models/user_profile'


export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'PUT':
            return EditProfile();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function EditProfile() {
        const newUserTransaction = await sequelize.transaction();

        const { id_user, id_profile } = req.body;

        try {


            //Validaciones

            //Validando que el usuario esta llegando como parametro

            if (!id_user) {
                res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el nombre de usuario'
                });
                return;
            }

            // Validando que se esta recibiendo un nuvo id group

            if (!id_profile) {
                res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el rol de usuario'
                });
                return;
            }

            const userProfileExit = await User_Profile.findAll({
                where: {
                    id_users: id_user,
                    id_profile: id_profile.value
                }
            });

            if (userProfileExit.length > 0) {
                res.status(400).json({
                    title: 'Se ha detectado un error, dato inválido.',
                    message: 'El usuario ya contiene ese perfil, seleccione otro.'
                });
                return;
            }

            const updateUserRole = {
                id_users: id_user,
                id_profile: id_profile.value
            };

            await User_Profile.update({ id_profile: updateUserRole.id_profile }, {
                where: {
                    id_users: updateUserRole.id_users
                }
            });

            await newUserTransaction.commit();

            return res.status(200).json({
                title: 'Operación exitosa',
                message: 'El rol de usuario se ha editado correctamente.'
            })

        } catch (error) {
            await newUserTransaction.rollback();
            throw error;
        }
    }
}