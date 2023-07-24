import PropTypes from "prop-types";
import { useState } from "react";
import ProductsListForm from "./ProductsListForm";
import { ProductsListTable } from "./ProductsTable";


export { ProductsList };

ProductsList.propTypes = {
    data: PropTypes.array,
    getCallback: PropTypes.func.isRequired,
    deleteCallback: PropTypes.func.isRequired,
};

function ProductsList({ data, getCallback, deleteCallback }) {

    return (
        <>
            <ProductsListForm
                listCallback={getCallback}
                products={data}
            />
            <ProductsListTable
                products={data}
                getCallBack={getCallback}
                deleteCallBack={deleteCallback}
            />
        </>

    )
}