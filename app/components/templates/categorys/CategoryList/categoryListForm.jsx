import PropTypes from "prop-types";
import SearchForm from "@/app/components/elements/SearchForm/SearchForm";


export default CategoryListForm;

CategoryListForm.propTypes = {
  listCategoryCallback: PropTypes.func.isRequired,
  category: PropTypes.array,
};

function CategoryListForm({ listCategoryCallback, category }) {
  return (
    <SearchForm
      updateCallback={listCategoryCallback}
      dataForm={category}
      fileNameDownload="Reporte Categoría"
      titleFileDownload="Reporte de Categoría"
      titleForm="Listado de Categorías"
      titleButtonCreate="Nueva Categoría"
      urlCreate="/categorys/create"
      hasPermissionCreate="Crear Categoría"
    />
  );
}
