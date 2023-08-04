import PropTypes from "prop-types";
import { useState } from "react";
import SalesListForm from "./SalesListForm";
import { SalesListTable } from "./SalesTable";


export { SalesList };

SalesList.propTypes = {
    data: PropTypes.array,
    getCallback: PropTypes.func.isRequired,
    deleteCallback: PropTypes.func.isRequired,
};

function SalesList({ data, getCallback, deleteCallback }) {

    return (
        <>
            <SalesListForm
                listCallback={getCallback}
                sales={data}
            />
            <SalesListTable
                sales={data}
                getCallBack={getCallback}
                deleteCallBack={deleteCallback}
            />
        </>

    )
}