import User from "@/database/models/user";
import { apiHandler } from "@/app/helpers/api/api-handler";
import sequelize from "@/database/config";
import { activeUserProfile } from "@/app/constants/sql_querys";
import { QueryTypes } from "sequelize";


export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return detailUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function detailUser() {
    const { user_name } = req.query;
    if (!user_name) {
      throw 'No especificó el usuario que desea ver';
    }


    const user_profile = await sequelize.query(`${activeUserProfile(user_name)}`, { type: QueryTypes.SELECT });


    return res.status(200).json({ user_profile });
  }
}