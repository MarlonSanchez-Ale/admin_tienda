import PropTypes from "prop-types";
import SearchForm from "@/app/components/elements/SearchForm/SearchForm";


export default SupplierListForm;

SupplierListForm.propTypes = {
  listCallback: PropTypes.func.isRequired,
  supplier: PropTypes.array,
};

function SupplierListForm({ listCallback, supplier }) {
  return (
    <SearchForm
      updateCallback={listCallback}
      dataForm={supplier}
      fileNameDownload="Reporte Proveedor"
      titleFileDownload="Reporte de Proveedor"
      titleForm="Listado de Proveedores"
      titleButtonCreate="Nueva Proveedor"
      urlCreate="/supplier/register"
      hasPermissionCreate="Registrar Proveedor"
    />
  );
}
