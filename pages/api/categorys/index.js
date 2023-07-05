import { apiHandler } from "@/app/helpers/api/api-handler";
import listCategoryCore from "@/app/api/category";

export default apiHandler(handler);

async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return listCategorys();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function listCategorys() {

        const dataCategory = await listCategoryCore(req, res);

        return res.status(200).json({
            category: dataCategory.map((p) => ({
                USER_CREATE: p.user_create,
                USER_UPDATE: p.user_update,
                FECHA_CREADO: p.date_create,
                FECHA_EDITADO: p.date_update,
                ID_CATEGORIA: p.id_category,
                CATEGORIA: p.name,
                DESCRIPCION: p.description,
                ESTADO: p.status
            }))
        });
    }
}