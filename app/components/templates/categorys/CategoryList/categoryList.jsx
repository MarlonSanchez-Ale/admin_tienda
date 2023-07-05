import PropTypes from "prop-types";
import { useState } from "react";
import CategoryListForm from "./categoryListForm";
import { CategoryListTable } from "./categoryTable";


export { CategoryList };

CategoryList.propTypes = {
    categorys: PropTypes.array,
    getCategoryCallback: PropTypes.func.isRequired,
    deleteCategoryCallback: PropTypes.func.isRequired,
};

function CategoryList({ categorys, getCategoryCallback, deleteCategoryCallback }) {

    return (
        <>
            <CategoryListForm
                listCategoryCallback={getCategoryCallback}
                category={categorys}
            />
            <CategoryListTable
                categorys={categorys}
                getCategoryCallBack={getCategoryCallback}
                deleteCategoryCallback={deleteCategoryCallback}
            />
        </>

    )
}