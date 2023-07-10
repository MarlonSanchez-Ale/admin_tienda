import { useState } from "react";
import { supplierService } from "@/app/services/supplier.service";
import { toastService } from "@/app/services/toast.service";
import { SupplierList } from "@/app/components/templates/supplier/SupplierList/supplierList";

export default function Users() {
    const [suppliers, setSuppliers] = useState(null);

    function getSupplierCallback(filters) {
        setSuppliers(null);
        return supplierService.get(filters)
            .then(u => {
                setSuppliers(u.proveedores);
            });
    }

    function deleteSupplierCallback(id_supplier) {
        return supplierService.disable(id_supplier)
            .then((res) => {
                toastService.success(res.title, res.message, {
                    keepAfterRouteChange: true,
                });
                getSupplierCallback()
            })
            .catch((error) => {
                toastService.warn(error.message);
            });
    }

    return (
        <>
            <SupplierList
                supplier={suppliers}
                getCallback={getSupplierCallback}
                deleteCallback={deleteSupplierCallback}
            />
        </>
    )
}