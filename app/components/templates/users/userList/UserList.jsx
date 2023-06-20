import PropTypes from "prop-types";
import { useState } from "react";
import { UserListTable } from "./UserListTable";
import UserListForm from "./UserListForm";

export { UserList };

UserList.propTypes = {
    users: PropTypes.array,
    updateUsersCallback: PropTypes.func.isRequired,
    deleteUserCallback: PropTypes.func.isRequired,
};

function UserList({ users, updateUsersCallback, deleteUserCallback }) {

    return (
        <>

            <UserListForm
                updateUsersCallback={updateUsersCallback}
                user={users}
            />
            <UserListTable
                users={users}
                //urlDownload={urlDownload}
                deleteUserCallback={deleteUserCallback}
            />
        </>
    );
}
