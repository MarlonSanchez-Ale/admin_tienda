import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Textarea,
    IconButton,
    Tooltip
} from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { productsService } from "@/app/services/products.service";
import { toastService } from "@/app/services/toast.service";
import { Fragment } from "react";
import { RiDashboardLine, RiArrowLeftSLine, RiLogoutBoxLine } from "react-icons/ri";
import Select from "react-tailwindcss-select";
import { pointSalesService } from "@/app/services/pointSale.service";
import ToastTP from "@/app/components/elements/Toast/Toast";
import { salesService } from "@/app/services/sales.service";

export default function RegisterSales() {

    const router = useRouter()
    const [products, setProducts] = useState([]);
    const [pointSale, setPointSale] = useState([])


    const [create, setCreate] = useState("");


    const [productos, setProductos] = useState([]);
    const [total, setTotal] = useState(0);
    const [productoId, setProductoId] = useState({});
    const [puntoVenta, setPuntoVenta] = useState({})
    const [cantidad, setCantidad] = useState(0);
    const [descuento, setDescuento] = useState(0)
    const [venta, setVenta] = useState([])

    const options = [];
    const optionsPS = [];


    useEffect(() => {
        let isMounted = true;
        productsService.get()
            .then(u => {
                if (isMounted) {
                    //console.log(u)
                    setProducts(u.products)

                }
            }).catch((err) => {
                if (isMounted) {
                    setCategorias([]);
                    toastService.warn(err.message);
                }

            });
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let isMounted = true;
        pointSalesService.get()
            .then(u => {
                if (isMounted) {
                    //console.log(u)
                    setPointSale(u.pointsale)

                }
            }).catch((err) => {
                if (isMounted) {
                    setCategorias([]);
                    toastService.warn(err.message);
                }

            });
        return () => {
            isMounted = false;
        };
    }, []);

    products.map((a) => {
        options.push(({
            value: a.ID_PRODUCTO,
            label: a.PRODUCTO,
            price: a.PRECIO_VENTA
        }))
    })

    pointSale.map((a) => {
        optionsPS.push(({
            value: a.ID_PUNTO_VENTA,
            label: a.PUNTO_VENTA
        }))
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(create)

        /* return productsService.create(create)
             .then((res) => {
                 toastService.success(res.title, res.message, {
                     keepAfterRouteChange: true,
                 });
                 handleCancel()
                 router.push("/products");
             })
             .catch((error) => {
                 toastService.error(error.title, error.message, { keepAfterRouteChange: true });
                 //console.log(error)
             });*/
    }

    const handleCancel = async (e) => {
        setCreate({
            ...create,
            total_sale: 0,
            products: {
                id_products: "",
                id_point_sale: "",
                quantity: 0,
                price: 0,
                discount: 0
            }
        })
    }

    const agregarProducto = () => {

        // Validación básica, asegúrate de que los campos no estén vacíos
        if (!productoId || !cantidad) {
            alert('Completa todos los campos.');
            return;
        }

        // Verificar que la cantidad sea un número válido
        const cantidadNumerica = parseInt(cantidad, 10);
        if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
            alert('La cantidad debe ser un número mayor a cero.');
            return;
        }


        const precioFloat = parseFloat(productoId.price);
        const descuentoFloat = parseFloat(descuento);

        const totalVenta = precioFloat * cantidadNumerica;
        

         if (!isNaN(descuentoFloat)) {
            const descuentoAplicado = Number(totalVenta * (descuentoFloat / 100));
            const totalfactura = Number(Number((totalVenta - descuentoAplicado).toFixed(2)) + Number(total)); 
            setTotal(totalfactura);
        } else {
            const totalfactura = Number(totalVenta + total); 
            setTotal(totalfactura);
        }

        // Añadir el producto a la lista de productos
        const producto = { id_products: productoId.value, id_point_sale: puntoVenta.value, producto: productoId.label, punto_venta: puntoVenta.label, price: productoId.price, quantity: cantidadNumerica, discount: descuento };
        setProductos([...productos, producto]);


        // Reiniciar los campos de entrada
        setProductoId('');
        setPuntoVenta('')
        setCantidad(0);
        setDescuento(0)
    };

    const registrarVenta = () => {
        // Realizar la lógica para enviar los datos al servidor y registrar la venta
        // Aquí puedes hacer una solicitud HTTP POST a tu endpoint de registro de ventas
        // Pasando los datos de 'productos' y 'total' en el cuerpo de la solicitud

        // Luego, limpiar el estado para preparar una nueva venta


        //console.log(productos)
        //console.log("Total de Venta: " +total)

        const ventaTotal = { productos, total }

        //console.log(ventaTotal)

        return salesService.create(ventaTotal)
             .then((res) => {
                 toastService.success(res.title, res.message, {
                     keepAfterRouteChange: true,
                 });
                 handleCancel()
                 router.push("/sales");
             })
             .catch((error) => {
                 toastService.error(error.title, error.message, { keepAfterRouteChange: true });
                 //console.log(error)
             });

        setProductos([]);
        setTotal(0);
    };

    return (
        <Fragment>
            <div className="container flex justify-center">
                <Card className="w-full max-w-[50rem]">
                    <CardHeader
                        color="blue"
                        floated={false}
                        shadow={false}
                        className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                    >


                        <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
                            <RiDashboardLine size={50} />
                        </div>
                        <Typography variant="h4" color="white">
                            Registrar de Ventas
                        </Typography>
                        <Typography color="white" className="mt-1 font-normal">
                            Agregar los datos de la venta
                        </Typography>

                        <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                            <Link href="/sales/">
                                <Tooltip content="ir a lista">
                                    <IconButton>
                                        <RiLogoutBoxLine size={20} />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardBody >
                        <form className="my-5 gap-3" onSubmit={handleSubmit}>
                            <div className="p-4">
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <label className="block text-gray-700 font-bold mb-2">Producto:</label>
                                        <Select
                                            value={productoId}
                                            onChange={(value) =>
                                                setProductoId(value)}
                                            required
                                            options={options}
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-gray-700 font-bold mb-2">Punto Venta:</label>
                                        <Select
                                            value={puntoVenta}
                                            onChange={(value) =>
                                                setPuntoVenta(value)}
                                            required
                                            options={optionsPS}
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-gray-700 font-bold mb-2">Cantidad:</label>
                                        <input
                                            type="number"
                                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
                                            value={cantidad}
                                            onChange={(e) =>
                                                setCantidad(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block mb-2">Descuento(%):</label>
                                        <input
                                            type="number"
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                            value={descuento}
                                            onChange={(e) => setDescuento(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-1/4">
                                        <button
                                            className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none"
                                            onClick={agregarProducto}
                                        >
                                            Agregar Producto
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold mb-2">Productos Agregados:</h3>
                                    <ul className="list-disc pl-6">
                                        {productos.map((producto, index) => (
                                            <li key={index}>
                                                Producto: {producto.producto} - Precio: {producto.price} - Cantidad: {producto.quantity} - Descuento: {producto.discount + ' %'} 
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="font-semibold mt-2">Total Facturado: {total}</p>
                                </div>
                                <div className="mt-4">
                                    <button
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none"
                                        onClick={registrarVenta}
                                    >
                                        Registrar Venta
                                    </button>
                                </div>
                            </div>
                        </form>
                    </CardBody>

                </Card>
            </div>
        </Fragment>
    )
}