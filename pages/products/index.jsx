import { useState } from "react";
import { productsService } from "@/app/services/products.service";
import { toastService } from "@/app/services/toast.service";
import { ProductsList } from "@/app/components/templates/products/List/ProductsList";

export default function Products() {
    const [products, setProducts] = useState(null);

    function listCallback(filters) {
        setProducts(null);
        return productsService.get(filters)
            .then(u => {
                setProducts(u.products);
            });
    }

    function deleteCallback(id_products) {
        return productsService.disable(id_products)
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
            <ProductsList
                data={products}
                getCallback={listCallback}
                deleteCallback={deleteCallback}
            />
        </>
    )
}