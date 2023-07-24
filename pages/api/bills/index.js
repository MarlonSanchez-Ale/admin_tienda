import { apiHandler } from "@/app/helpers/api/api-handler";
import listBillsCore from "@/app/api/bills";

export default apiHandler(handler);

async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return listPointSale();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function listPointSale() {

        const data = await listBillsCore(req, res);

        return res.status(200).json({
            pointsale: data.map((p) => ({
                USUARIO_REGISTRADOR: p.register,
                FECHA_REGISTRO: p.bill_date,
                ID_GASTO: p.id_bills,
                GASTO: p.bills,
                DESCRIPCION: p.description,
                TOTAL: p.total,
            }))
        });
    }
}