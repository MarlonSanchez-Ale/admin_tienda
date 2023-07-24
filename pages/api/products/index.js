import { apiHandler } from "@/app/helpers/api/api-handler";
import listProductsCore from "@/app/api/products";

export default apiHandler(handler);

async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return listProducts();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function listProducts() {

        const data = await listProductsCore(req, res);

        return res.status(200).json({
            products: data.map((p) => ({
                USER_CREATE: p.user_create,
                USER_UPDATE: p.user_update,
                FECHA_CREADO: p.date_create,
                FECHA_EDITADO: p.date_update,
                ID_PRODUCTO: p.id_products,
                IMAGEN: p.image,
                PRODUCTO: p.name,
                DESCRIPCION: p.description,
                PRECIO_VENTA: p.sale_price,
                INVENTARIO: p.stock,
                ESTADO: p.status
            }))
        });
    }
}