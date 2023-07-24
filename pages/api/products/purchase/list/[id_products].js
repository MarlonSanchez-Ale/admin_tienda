import { apiHandler } from "@/app/helpers/api/api-handler";
import Purchase from '@/database/models/purchase'

export default apiHandler(handler);

async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return listPurchase();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function listPurchase() {

        const { id_products } = req.query;

        const data = await Purchase.findAll({
            where: {
                id_products: id_products
            },
            order: [
                ['date_purchase', 'ASC']
            ]
        })

        return res.status(200).json({ data });
    }
}