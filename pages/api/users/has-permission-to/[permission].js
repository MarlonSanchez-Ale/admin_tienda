import { apiHandler } from "@/app/helpers/api/api-handler";
import { hasPermissionTo } from "@/app/helpers/api/has-permission-to";
export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case "GET":
            return verifyPermission();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function verifyPermission() {
        const { permission } = req.query;

        if (permission.length <= 0) {
            throw "No especificó el permiso que desea consultar";
        }

        // hasPermissionTo retorna true si posee el permiso y false si no lo encuentra
        const permissionResponse = await hasPermissionTo(
            req.user.username,
            permission
        );

        return res.status(200).json({ has_permission: permissionResponse });
    }
}
