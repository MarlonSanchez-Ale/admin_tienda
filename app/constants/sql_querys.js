const _ = require('lodash');


export const searchPermissionUser = (username, permission) => {
    console.log("Imprimiendo desde sql query")
    console.log(username)
    console.log(permission)
    
    
    return `
    SELECT PD.id_permission , PD.permission , PD.de_permission 
    FROM users U
        INNER JOIN user_profile UP
            ON U.id_users = UP.id_users
        INNER JOIN profile P
            ON UP.id_profile  = P.id_profile 
        INNER JOIN profile_permission PP
            ON P.id_profile  = PP.id_profile 
        INNER JOIN permission_definition PD
            ON PP.id_permission  = PD.id_permission 
    where U.user_name  LIKE '%${username}%' AND PD.permission  LIKE '%${permission}%'
    ORDER BY U.user_name;

      `;
};