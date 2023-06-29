import React, { useState, useEffect } from "react";

import { userService } from "../services/user.service";
import { toastService } from "../services/toast.service";

export function useHasPermissionStatus(permission, callback) {
    const [hasPermission, setHasPermission] = useState();
    
    useEffect(() => {
        let isMounted = true;

        (async () => {
            /*
                  Se verifica que el usuario tenga el permiso indicado por parametro.
                  */
            try {
                const hasPermissionResponse = await userService.hasPermissionTo(
                    permission
                );
                if (isMounted) {

                    setHasPermission(hasPermissionResponse);

                }

                if (callback) callback(setHasPermission, hasPermissionResponse);
            } catch (error) {
                if (isMounted) {
                    toastService.error(error.message);
                }
            }
        })();

        return () => {
            isMounted = false;
        };
    }, []);

    return hasPermission;
}