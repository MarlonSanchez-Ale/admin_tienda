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

export const searchProducts = (searchString) => {
    return `
    SELECT  p.id_products as ID_PRODUCTO, p.image as IMAGEN,  p.name as PRODUCTO, p.description as DESCRIPCION, p.sale_price as PRECIO_VENTA, p.stock as INVENTARIO, c.id_category as ID_CATEGORIA, c.name as CATEGORIA, c.description as DESCRIPCION_CATEGORIA
    FROM products p
        INNER JOIN details_products dp 
            ON p.id_products  = dp.id_products  
        INNER JOIN  category c 
        	ON c.id_category = dp.id_category 
    where p.id_products  LIKE '%${searchString}%'
    ORDER BY p.status ;
      `;
};

export const searchProductsPurchase = (searchString) => {
    return `
    select pu.user_register as USUARIO_REGISTRADOR, pu.date_purchase as FECHA_COMPRA, pu.id_purchase as ID_INGRESO, s.id_supplier as ID_PROVEEDOR, s.name as NOMBRE_PROVEEDOR, pu.quantity_products as CANTIDAD_PRODUCTO, pu.unit_price as PRECIO_UNIDAD, pu.total_cost as TOTAL_COSTO from purchase pu 
    inner join supplier s ON pu.id_supplier = s.id_supplier 
    where pu.id_products  LIKE '%${searchString}%'
    ORDER BY pu.date_purchase asc ;
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