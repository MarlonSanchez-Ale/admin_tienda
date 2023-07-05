import { isJsonString } from "@/app/helpers/api/util";
import sequelize from "@/database/config";
import Connection from "@/pages/api/connection/connection";
import Category from '@/database/models/category'
const { Op } = require("sequelize")

export default async function listCategoryCore(req, res) {

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
                                sequelize.col("name"),
                                sequelize.col("description"),
                                sequelize.col("status"),
                            )
                        ),
                        {
                            [Op.substring]: w,
                        }
                    );
                }),
        };

    const dataCategoryDB = await Category.findAll({
        where: buildWhere,
    })

    const dataCategory = JSON.parse(JSON.stringify(dataCategoryDB));

    return dataCategory;

}