import PropTypes from "prop-types";
import SearchForm from "@/app/components/elements/SearchForm/SearchForm";


export default PointSalesListForm;

PointSalesListForm.propTypes = {
  listCallback: PropTypes.func.isRequired,
  pointSales: PropTypes.array,
};

function PointSalesListForm({ listCallback, pointSales }) {
  return (
    <SearchForm
      updateCallback={listCallback}
      dataForm={pointSales}
      fileNameDownload="Reporte Proveedor"
      titleFileDownload="Reporte de Proveedor"
      titleForm="Listado de Proveedores"
      titleButtonCreate="Nueva Proveedor"
      urlCreate="/PointsSales/create"
      hasPermissionCreate="Registrar Proveedor"
    />
  );
}
