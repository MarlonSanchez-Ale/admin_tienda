import PropTypes from "prop-types";
import { useState } from "react";
import SupplierListForm from "./supplierListForm";
import { SupplierListTable } from "./supplierTable";


export { SupplierList };

SupplierList.propTypes = {
    supplier: PropTypes.array,
    getCallback: PropTypes.func.isRequired,
    deleteCallback: PropTypes.func.isRequired,
};

function SupplierList({ supplier, getCallback, deleteCallback }) {

    return (
        <>
            <SupplierListForm
                listCallback={getCallback}
                supplier={supplier}
            />
            <SupplierListTable
                supplier={supplier}
                getCallBack={getCallback}
                deleteCallBack={deleteCallback}
            />
        </>

    )
}