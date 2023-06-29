const _ = require('lodash');


export const searchPermissionUser = (username, permission) => {

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

export const searchUserProfile = (searchString) => {
    return `
    SELECT  U.id_users, U.user_name, U.name, U.email, U.phone, P.id_profile, P.profile , P.de_profile , U.status
    FROM users U
        INNER JOIN user_profile UP
            ON U.id_users  = UP.id_users 
        INNER JOIN profile P
            ON UP.id_profile  = P.id_profile 
    where U.id_users  LIKE '%${searchString}%'
    ORDER BY U.status ;
      `;
};

export const searchProfilePermission = (searchString) => {
    return `
    SELECT PD.id_permission , PD.permission , PD.de_permission 
    FROM users U
        INNER JOIN user_profile UP
            ON U.id_users  = UP.id_users 
        INNER JOIN profile P
            ON UP.id_profile  = P.id_profile 
        INNER JOIN profile_permission PP
            ON P.id_profile  = PP.id_profile 
        INNER JOIN permission_definition PD
            ON PP.id_permission  = PD.id_permission 
    where U.id_users  LIKE '%${searchString}%'
    ORDER BY U.user_name ;

      `;
};

export const activeUserProfile = (searchString) => {
    return `
    SELECT  U.id_users, U.user_name, U.name, P.profile , P.de_profile , U.status 
    FROM users U
        INNER JOIN user_profile UP
            ON U.id_users  = UP.id_users 
        INNER JOIN profile P
            ON UP.id_profile  = P.id_profile 
    where U.user_name  LIKE '%${searchString}%'
    ORDER BY U.status ;
      `;
};