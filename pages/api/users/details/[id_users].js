import { apiHandler } from "@/app/helpers/api/api-handler";
import sequelize from "@/database/config";
import { searchUserProfile, searchProfilePermission } from "@/app/constants/sql_querys";
import { Op, QueryTypes } from 'sequelize'

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return detailUser();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function detailUser() {
        const { id_users } = req.query;
        if (!id_users) {
            throw 'No especificó el usuario que desea ver';
        }


        const user_profile = await sequelize.query(`${searchUserProfile(id_users)}`, { type: QueryTypes.SELECT });

        const profile_permission = await sequelize.query(`${searchProfilePermission(id_users)}`, { type: QueryTypes.SELECT })

        return res.status(200).json({
            usuario: {
                dataUser: user_profile,
                dataProfile: profile_permission
            }

        });
    }
}