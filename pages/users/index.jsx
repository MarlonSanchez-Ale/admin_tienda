import { useState } from "react";
import { userService } from "@/app/services/user.service";
import { toastService } from "@/app/services/toast.service";
import { UserList } from "@/app/components/templates/users/userList/UserList";
import ToastTP from "@/app/components/elements/Toast/Toast";

export default function Users() {
    const [users, setUsers] = useState(null);

    function updateUsersCallback(filters) {
        setUsers(null);
        return userService.getUsers(filters)
            .then(u => {
                setUsers(u.users);
            });
    }

    function deleteUserCallback(id_usuario) {
        return userService.DisableUser(id_usuario)
            .then((res) => {
                toastService.success(res.title, res.message, {
                    keepAfterRouteChange: true,
                });
                updateUsersCallback()
            })
            .catch((error) => {
                toastService.warn(error.message);
            });
    }

    return (
        <>
            <UserList
                users={users}
                updateUsersCallback={updateUsersCallback}
                deleteUserCallback={deleteUserCallback}
            />
            <ToastTP />
        </>
    )
}