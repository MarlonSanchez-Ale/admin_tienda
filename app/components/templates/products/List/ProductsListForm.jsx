import PropTypes from "prop-types";
import SearchForm from "@/app/components/elements/SearchForm/SearchForm";


export default ProductsListForm;

ProductsListForm.propTypes = {
  listCallback: PropTypes.func.isRequired,
  products: PropTypes.array,
};

function ProductsListForm({ listCallback, products }) {
  return (
    <SearchForm
      updateCallback={listCallback}
      dataForm={products}
      fileNameDownload="Reporte Productos"
      titleFileDownload="Reporte de Productos"
      titleForm="Listado de Productos"
      titleButtonCreate="Nueva Producto"
      urlCreate="/products/register"
      hasPermissionCreate="Registrar Producto"
    />
  );
}