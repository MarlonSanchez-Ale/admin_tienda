import { apiHandler } from '../../../app/helpers/api/api-handler';
import listUsersCore from '@/app/api/accounts';

export default apiHandler(handler);

async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return listUsers();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function listUsers() {

        const dataUsers = await listUsersCore(req, res);

        return res.status(200).json({
            users: dataUsers.map((p) => ({
                USER_CREATE: p.user_create,
                USER_UPDATE: p.user_update,
                FECHA_CREADO: p.date_create,
                FECHA_EDITADO: p.date_update,
                ID_USUARIO: p.id_users,
                USUARIO: p.user_name,
                NOMBRE: p.name,
                EMAIL: p.email,
                TELEFONO: p.phone,
                ESTADO: p.status
            }))
        });
    }
}
