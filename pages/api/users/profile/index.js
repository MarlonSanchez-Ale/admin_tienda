import { apiHandler } from "@/app/helpers/api/api-handler";
import sequelize from "@/database/config";
import Profile from '@/database/models/profile'

export default apiHandler(handler)

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return listProfiles();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }


    async function listProfiles() {
        const dataProfiles = await Profile.findAll();

        return res.status(200).json({
           dataProfiles
        });
    }

}