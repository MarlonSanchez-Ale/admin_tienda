import { isJsonString } from "@/app/helpers/api/util";
import sequelize from "@/database/config";
import Connection from "@/pages/api/connection/connection";
import Sales from '@/database/models/sales'

const { Op } = require("sequelize")

export default async function listSalesCore(req, res) {

    await Connection();

    /** Valoraciones a considerar para los filtros especificados en el request */
    const filters_str = req.query?.filters || "{}";
    if (!filters_str) throw "filters: No especificó los filtros";
    const { isJson, jsonValue: filters } = isJsonString(filters_str);
    if (!isJson) throw "filters: No especificó un JSON válido";

    // Obtencion de la lista de usuarios
    let buildWhere = { status: "ACTIVO" };
    if (filters?.search)
        buildWhere["name"] = {
            [Op.and]: filters?.search
                .toLowerCase()
                .split(" ")
                .map((w) => {
                    return sequelize.where(
                        sequelize.fn(
                            "lower",
                            sequelize.fn(
                                "concat",
                                sequelize.col("date_create"),
                                sequelize.col("description"),
                                sequelize.col("date_update"),
                                sequelize.col("total_sale"),
                                sequelize.col("transportation_price"),
                                sequelize.col("status"),
                            )
                        ),
                        {
                            [Op.substring]: w,
                        }
                    );
                }),
        };

    const data = await Sales.findAll({
        where: buildWhere,
    })

    const dataSale = JSON.parse(JSON.stringify(data));

    return dataSale;

}