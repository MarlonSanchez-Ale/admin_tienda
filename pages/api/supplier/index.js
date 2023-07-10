import { apiHandler } from "@/app/helpers/api/api-handler";
import listSupplierCore from "@/app/api/supplier";

export default apiHandler(handler);

async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return listPurchase();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function listPurchase() {

        const dataSupplier = await listSupplierCore(req, res);

        return res.status(200).json({
            proveedores: dataSupplier.map((p) => ({
                USER_CREATE: p.user_create,
                USER_UPDATE: p.user_update,
                FECHA_CREADO: p.date_create,
                FECHA_EDITADO: p.date_update,
                ID_PROVEEDOR: p.id_supplier,
                PROVEEDOR: p.name,
                DESCRIPCION: p.description,
                DIRECCION: p.address,
                TELEFONO: p.phone,
                ESTADO: p.status
            }))
        });
    }
}