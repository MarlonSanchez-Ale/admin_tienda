import sequelize from "@/database/config";
const logger = require("../../services/logger.service");
import { searchPermissionUser } from "@/app/constants/sql_querys";
import { QueryTypes } from 'sequelize'

export { hasPermissionTo };

async function hasPermissionTo(username, permission) {
    try {
        
        if (username && permission) {
           
            const hasPermission = await sequelize.query(`${searchPermissionUser(username, permission)}`, { type: QueryTypes.SELECT });
  
           if (hasPermission .length) return true;
        }

        return false;

    } catch (error) {
        logger.error(
            `-has-permission-to- Verificando el permiso de un usuario: ${error}`
        );
        return false;
    }
}
