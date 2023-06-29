import { hasPermissionTo } from '@/app/helpers/api/has-permission-to';
import { isJsonString } from '@/app/helpers/api/util';

import sequelize from '@/database/config';
import Connection from '@/pages/api/connection/connection';
import User from '@/database/models/user';
const { Op } = require("sequelize");


export default async function listUsersCore(req, res) {

    await Connection();
    /** Valoraciones a considerar para los filtros especificados en el request */
    const filters_str = req.query?.filters || "{}";
    if (!filters_str) throw "filters: No especificó los filtros";
    const { isJson, jsonValue: filters } = isJsonString(filters_str);
    if (!isJson) throw "filters: No especificó un JSON válido";

    // Obtencion de la lista de usuarios
    let buildWhere = { status: "ACTIVO" };
    if (filters?.search)
        buildWhere["user_name"] = {
            [Op.and]: filters?.search
                .toLowerCase()
                .split(" ")
                .map((w) => {
                    return sequelize.where(
                        sequelize.fn(
                            "lower",
                            sequelize.fn(
                                "concat",
                                sequelize.col("user_name"),
                                sequelize.col("name"),
                                sequelize.col("email"),
                                sequelize.col("phone"),
                                sequelize.col("status"),
                            )
                        ),
                        {
                            [Op.substring]: w,
                        }
                    );
                }),
        };

    const dataUsersDB = await User.findAll({
        where: buildWhere,
    });

    const dataUsers = JSON.parse(JSON.stringify(dataUsersDB));

    //console.log(dataUsers)
    return dataUsers;

}