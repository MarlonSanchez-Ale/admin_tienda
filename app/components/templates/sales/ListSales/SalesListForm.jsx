import PropTypes from "prop-types";
import SearchForm from "@/app/components/elements/SearchForm/SearchForm";


export default SalesListForm;

SalesListForm.propTypes = {
  listCallback: PropTypes.func.isRequired,
  sales: PropTypes.array,
};

function SalesListForm({ listCallback, sales }) {
  return (
    <SearchForm
      updateCallback={listCallback}
      dataForm={sales}
      fileNameDownload="Reporte Ventas"
      titleFileDownload="Reporte de Ventas"
      titleForm="Listado de Ventas"
      titleButtonCreate="Nueva Venta"
      urlCreate="/sales/register"
      hasPermissionCreate="Registrar Venta"
    />
  );
}