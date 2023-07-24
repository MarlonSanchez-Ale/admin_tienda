import { isJsonString } from "@/app/helpers/api/util";
import sequelize from "@/database/config";
import Connection from "@/pages/api/connection/connection";
import Bills from '@/database/models/bills'

const { Op } = require("sequelize")

export default async function listBillsCore(req, res) {

    await Connection();

    /** Valoraciones a considerar para los filtros especificados en el request */
    const filters_str = req.query?.filters || "{}";
    if (!filters_str) throw "filters: No especificó los filtros";
    const { isJson, jsonValue: filters } = isJsonString(filters_str);
    if (!isJson) throw "filters: No especificó un JSON válido";

    // Obtencion de la lista de usuarios
    let buildWhere = {};
    if (filters?.search)
        buildWhere["bills"] = {
            [Op.and]: filters?.search
                .toLowerCase()
                .split(" ")
                .map((w) => {
                    return sequelize.where(
                        sequelize.fn(
                            "lower",
                            sequelize.fn(
                                "concat",
                                sequelize.col("bills"),
                                sequelize.col("description"),
                                sequelize.col("total"),
                            )
                        ),
                        {
                            [Op.substring]: w,
                        }
                    );
                }),
        };

    const data = await Bills.findAll({
        where: buildWhere,
    })

    const dataPointSale = JSON.parse(JSON.stringify(data));

    return dataPointSale;

}