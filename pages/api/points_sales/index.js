import { apiHandler } from "@/app/helpers/api/api-handler";
import listPointSaleCore from "@/app/api/point_sale";

export default apiHandler(handler);

async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return listPointSale();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function listPointSale() {

        const data = await listPointSaleCore(req, res);

        return res.status(200).json({
            pointsale: data.map((p) => ({
                USER_CREATE: p.user_create,
                USER_UPDATE: p.user_update,
                FECHA_CREADO: p.date_create,
                FECHA_EDITADO: p.date_update,
                ID_PUNTO_VENTA: p.id_point_sale,
                PUNTO_VENTA: p.name,
                DIRECCION: p.address,
                TELEFONO: p.phone,
                ESTADO: p.status
            }))
        });
    }
}