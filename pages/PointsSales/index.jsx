import { useState } from "react";
import { pointSalesService } from "@/app/services/pointSale.service";
import { toastService } from "@/app/services/toast.service";
import { PointSalesList } from "@/app/components/templates/PointsSales/List/PointSalesList";

export default function PointSales() {
    const [pointSales, setPointSales] = useState(null);

    function getListCallback(filters) {
        setPointSales(null);
        return pointSalesService.get(filters)
            .then(u => {
                setPointSales(u.pointsale);
            });
    }

    function deleteCallback(id_point_sale) {
        return pointSalesService.disable(id_point_sale)
            .then((res) => {
                toastService.success(res.title, res.message, {
                    keepAfterRouteChange: true,
                });
                getListCallback()
            })
            .catch((error) => {
                toastService.warn(error.message);
            });
    }

    return (
        <>
            <PointSalesList
                data={pointSales}
                getCallback={getListCallback}
                deleteCallback={deleteCallback}
            />
        </>
    )
}