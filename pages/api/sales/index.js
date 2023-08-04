import { apiHandler } from "@/app/helpers/api/api-handler";
import listSalesCore from "@/app/api/sales";

export default apiHandler(handler);

async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return listSales();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function listSales() {

        const data = await listSalesCore(req, res);

        return res.status(200).json({
            ventas: data.map((p) => ({
                ID_VENTA: p.id_sale,
                USER_CREATE: p.user_create,
                USER_UPDATE: p.user_update,
                FECHA_CREADO: p.date_create,
                FECHA_EDITADO: p.date_update,
                TOTAL_INGRESO: p.total_sale,
                ESTADO: p.status
            }))
        });
    }
}