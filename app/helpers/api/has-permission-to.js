const { sequelize } = require("../../../db/databaseIndex");
const logger = require("../../services/logger.service");
import { searchPermissionUser } from "app/constants/sql_querys";
import { QueryTypes } from 'sequelize'

export { hasPermissionTo };

async function hasPermissionTo(username, id_permission) {
    try {
        
        if (username && id_permission) {
           
            const permits = await sequelize.query(`${searchPermissionUser(username, id_permission)}`, { type: QueryTypes.SELECT });
  
           if (permits.length) return true;
        }

        return false;

    } catch (error) {
        logger.error(
            `-has-permission-to- Verificando el permiso de un usuario: ${error}`
        );
        return false;
    }
}
