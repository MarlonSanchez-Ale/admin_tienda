import { useState } from "react";
import { salesService } from "@/app/services/sales.service";
import { toastService } from "@/app/services/toast.service";
import { SalesList } from "@/app/components/templates/sales/ListSales/SalesList";

export default function Sales() {
    const [sales, setSales] = useState(null);

    function listCallback(filters) {
        setSales(null);
        return salesService.get(filters)
            .then(u => {
                setSales(u.ventas);
            });
    }

    function deleteCallback(id_sales) {
        return salesService.disable(id_sales)
            .then((res) => {
                toastService.success(res.title, res.message, {
                    keepAfterRouteChange: true,
                });
                listCallback()
            })
            .catch((error) => {
                toastService.warn(error.message);
            });
    }

    return (
        <>
            <SalesList
                data={sales}
                getCallback={listCallback}
                deleteCallback={deleteCallback}
            />
        </>
    )
}