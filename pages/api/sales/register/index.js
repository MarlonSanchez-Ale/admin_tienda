import { apiHandler } from "@/app/helpers/api/api-handler";
import sequelize from "@/database/config";
import Products from "@/database/models/products";
import Sales from '@/database/models/sales'
import Details_Sales from '@/database/models/details_sales'

const moment = require('moment');
const { v4 } = require('uuid');

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return registerSale()
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function registerSale() {
        const transaction = await sequelize.transaction();

        try {

            const { productos, total } = req.body;

            //Realizando validaciones

            if (!productos || productos.length === 0) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'La venta debe tener al menos un producto.'
                });
            }



            const newRegister = {
                id_sale: v4(),
                user_create: req.user.username,
                user_update: req.user.username,
                date_create: moment().format('YYYY-MM-DD'),
                date_update: moment().format('YYYY-MM-DD'),
                total_sale: total,
                status: "ACTIVO"
            }

            await Sales.create(newRegister, {
                transaction: transaction
            });

            for (const productoVenta of productos) {

                const { id_products, id_point_sale, price, quantity, discount } = productoVenta


                const data = await Products.findOne({
                    where: {
                        id_products
                    }
                })

                if (!data) {
                    // Si el producto no existe, cancelamos la transacción y retornamos un mensaje de error
                    await transaction.rollback();
                    return res.status(404).json({ message: `Producto ${data.name} no se a encontrado.` });
                }

                if (data.stock === 0) {
                    // Si el producto no existe, cancelamos la transacción y retornamos un mensaje de error
                    await transaction.rollback();
                    return res.status(404).json({ message: `Producto ${data.name} no cuenta con inventario disponible.` });
                }

                // Restamos la cantidad vendida al stock actual del producto
                const nuevoStock = Number(data.stock) - Number(quantity);

                await Details_Sales.create({
                    id_details_sales: v4(),
                    id_sale: newRegister.id_sale,
                    id_products: id_products,
                    id_point_sale: id_point_sale,
                    quantity: quantity,
                    price: price,
                    discount: discount
                },
                    { transaction })

                // Actualizamos el stock del producto en la tabla de Productos
                await Products.update({ stock: nuevoStock }, { where: { id_products }, transaction });

            }


            await transaction.commit();

            return res.status(200).json({
                title: 'Operación exitosa',
                message: 'La venta se ha registrado correctamente.',
                status: 200
            });


        } catch (error) {
            await transaction.rollback()
            throw error;
        }
    }
}


/*

 productos.map(async ({ id_producto, id_punto_venta, cantidad, precio, descuento }, index) => {

                const { stock } = await Products.findOne({
                    attributes: ['stock'],
                    where: {
                        id_products: id_producto
                    }
                })

                if (!stock) {
                    // Si el producto no existe, cancelamos la transacción y retornamos un mensaje de error
                    await transaction.rollback();
                    return res.status(404).json({ mensaje: `Producto con ID ${id} no encontrado.` });
                }

                // Restamos la cantidad vendida al stock actual del producto
                const nuevoStock = stock - cantidad;


                //Ingresando a detalle de venta
                await Details_Sales.create({
                    id_details_sales: v4(),
                    id_sale: newRegister.id_sale,
                    id_products: id_producto,
                    id_point_sale: id_punto_venta,
                    quantity: cantidad,
                    price: precio,
                    discount: descuento
                },
                    { transaction })

                // Actualizamos el stock del producto en la tabla de Productos
                await Products.update({ stock: nuevoStock }, { where: { id_producto }, transaction });

            })

*/