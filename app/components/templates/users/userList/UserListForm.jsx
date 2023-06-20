import PropTypes from "prop-types";
import SearchForm from "@/app/components/elements/SearchForm/SearchForm";
import { RiUserAddFill } from "react-icons/ri";

export default UserListForm;

UserListForm.propTypes = {
  updateUsersCallback: PropTypes.func.isRequired,
  user: PropTypes.array,
};

function UserListForm({ updateUsersCallback, user }) {
  return (
    <SearchForm
      updateCallback={updateUsersCallback}
      dataForm={user}
      fileNameDownload="Reporte Usuarios"
      titleFileDownload="Reporte de Usuarios"
      titleForm="Listado de Usuarios"
      titleButtonCreate="Nuevo Usuario"
      urlCreate="/accounts/register"
      iconButtonCreate={<RiUserAddFill />}
      hasPermissionCreate="Crear Usuario"
      buttonDownload={true}
    />
  );
}
