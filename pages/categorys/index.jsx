import { useState } from "react";
import { categoryService } from "@/app/services/category.service";
import { CategoryList } from "@/app/components/templates/categorys/CategoryList/categoryList";
import { toastService } from "@/app/services/toast.service";
export default ListCategory;

function ListCategory() {

    const [category, setCategory] = useState(null);


    function getCategoryCallback(filters) {
        setCategory(null);
        return categoryService.getCategory(filters)
            .then(u => {
                setCategory(u.category)
            })
    }

    function deleteCategoryCallback(id_category) {
        return categoryService.disable(id_category)
            .then((res) => {
                toastService.success(res.title, res.message, {
                    keepAfterRouteChange: true,
                });
                getCategoryCallback()
            })
            .catch((error) => {
                toastService.warn(error.message);
            });
    }

    return (
        <>
            <CategoryList
                categorys={category}
                getCategoryCallback={getCategoryCallback}
                deleteCategoryCallback={deleteCategoryCallback}
            />
        </>
    )

}