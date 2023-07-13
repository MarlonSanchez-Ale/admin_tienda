import PropTypes from "prop-types";
import { useState } from "react";
import PointSalesListForm from "./PointSalesListForm";
import { PointSalesListTable } from "./PointSalesTable";


export { PointSalesList };

PointSalesList.propTypes = {
    data: PropTypes.array,
    getCallback: PropTypes.func.isRequired,
    deleteCallback: PropTypes.func.isRequired,
};

function PointSalesList({ data, getCallback, deleteCallback }) {

    return (
        <>
            <PointSalesListForm
                listCallback={getCallback}
                pointSales={data}
            />
            <PointSalesListTable
                PointSales={data}
                getCallBack={getCallback}
                deleteCallBack={deleteCallback}
            />
        </>

    )
}