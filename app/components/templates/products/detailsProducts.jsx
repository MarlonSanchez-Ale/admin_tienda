import Link from "next/link";
import { Fragment } from "react";
import { useHasPermissionStatus } from "@/app/hook/useHasPermissionStatus";

import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Input,
    List,
    ListItem,
    ListItemPrefix,
    Tooltip,
    IconButton,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Alert
} from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { RiLogoutBoxLine, RiDashboardLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { RiKey2Fill } from "react-icons/ri";
import EditProduct from "./editProducts";
import EditCatProduct from "./editCatProduct";
import AddPruchase from "./AddPurchase";
import EditPurchase from "./EditPurchase";

export { Details }

function Details(props) {
    const products = props?.products?.producto;
    const functionCallback = props?.callback;

    const product_details = products.dataProducts;
    const product_purchase = products.dataPurchase

    const [open, setOpen] = useState(1);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    const hasPermissionUpdate = useHasPermissionStatus("Editar Producto")

    const TABLE_HEAD = ["USUARIO REGISTRADOR", "FECHA COMPRA", "PROVEEDOR", "CANTIDAD PRODUCTO", "PRECIO UNIDAD", "TOTAL COSTO", "OPCIONES"];

    return (
        <Fragment>
            {product_details.map(({ ID_PRODUCTO, IMAGEN, PRODUCTO, DESCRIPCION, PRECIO_VENTA, INVENTARIO, ID_CATEGORIA, CATEGORIA, DESCRIPCION_CATEGORIA }, index) => (
                <div className="container flex justify-center" key={index}>
                    <Card className="w-full max-w-[30rem]">
                        <CardHeader
                            color="blue"
                            floated={false}
                            shadow={false}
                            className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                        >
                            <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white" >
                                <RiDashboardLine size={50} />
                            </div>
                            <Typography variant="h4" color="white">
                                Detalle de Producto
                            </Typography>
                            <Typography color="white" className="mt-1 font-normal">
                                Información del producto y categoría.
                            </Typography>

                            <div className="group mt-8 inline-flex flex-wrap items-center gap-3" >
                                <Link href="/products/">
                                    <Tooltip content="Regresar a lista">
                                        <IconButton>
                                            <RiLogoutBoxLine size={20} />
                                        </IconButton>
                                    </Tooltip>
                                </Link>
                                {hasPermissionUpdate && (
                                    <>
                                        <EditProduct id_products={ID_PRODUCTO} name={PRODUCTO} description={DESCRIPCION} sale_price={PRECIO_VENTA} callback={functionCallback} />
                                        <EditCatProduct id_products={ID_PRODUCTO} id_category={ID_CATEGORIA} categoria={CATEGORIA} callback={functionCallback} />
                                    </>
                                )}

                            </div>
                        </CardHeader>
                        <CardBody className="flex justify-center flex-col gap-4" key={index}>
                            <form className="mt-5 mb-2" >
                                <div className="my-2 flex flex-col gap-4 justify-center">
                                    <Input
                                        type="text"
                                        size="lg"
                                        label="Nombre de Producto"
                                        name="firstname"
                                        value={PRODUCTO}
                                        readOnly
                                    />

                                    <Input
                                        type="email"
                                        size="lg"
                                        label="Descripción"
                                        name="email"
                                        value={DESCRIPCION}
                                        readOnly
                                    />
                                    <Input
                                        type="number"
                                        size="lg"
                                        label="Precio de Venta"
                                        name="phone"
                                        value={PRECIO_VENTA}
                                        readOnly
                                    />
                                    <Input
                                        type="number"
                                        size="lg"
                                        label="Cantidad de Producto"
                                        name="phone"
                                        value={INVENTARIO}
                                        readOnly
                                    />
                                </div>

                                <Accordion open={open === 1} className="mt-5">
                                    <AccordionHeader onClick={() => handleOpen(1)}>Categoría de Producto</AccordionHeader>
                                    <AccordionBody>
                                        <List className="overflow-auto max-h-[20rem] mt-5">
                                            <ListItem key={index}>
                                                <ListItemPrefix>
                                                    <RiKey2Fill size={30} />
                                                </ListItemPrefix>
                                                <div>
                                                    <Typography variant="h6" color="blue-gray">
                                                        {CATEGORIA}
                                                    </Typography>
                                                    <Typography variant="small" color="gray" className="font-normal">
                                                        {DESCRIPCION_CATEGORIA}
                                                    </Typography>
                                                </div>
                                            </ListItem>
                                        </List>
                                    </AccordionBody>
                                </Accordion>

                                <Accordion open={open === 2} className="mb-5">
                                    <AccordionHeader onClick={() => handleOpen(2)}>
                                        Ingreso de Producto
                                    </AccordionHeader>
                                    <AccordionBody>
                                        <div className="overflow-scroll h-full w-full mt-10">
                                            <table className="w-full min-w-max table-auto text-left">
                                                <thead>
                                                    <tr>
                                                        {TABLE_HEAD.map((head) => (
                                                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal leading-none opacity-70"
                                                                >
                                                                    {head}
                                                                </Typography>
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {product_purchase.map(({ USUARIO_REGISTRADOR, FECHA_COMPRA, ID_INGRESO, ID_PROVEEDOR, NOMBRE_PROVEEDOR, CANTIDAD_PRODUCTO, PRECIO_UNIDAD, TOTAL_COSTO }, index) => (
                                                        <tr key={index} className="even:bg-blue-gray-50/50">
                                                            <td className="p-4">
                                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                                    {USUARIO_REGISTRADOR}
                                                                </Typography>
                                                            </td>
                                                            <td className="p-4">
                                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                                    {FECHA_COMPRA}
                                                                </Typography>
                                                            </td>
                                                            <td className="p-4">
                                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                                    {NOMBRE_PROVEEDOR}
                                                                </Typography>
                                                            </td>
                                                            <td className="p-4">
                                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                                    {CANTIDAD_PRODUCTO}
                                                                </Typography>
                                                            </td>
                                                            <td className="p-4">
                                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                                    {PRECIO_UNIDAD}
                                                                </Typography>
                                                            </td>
                                                            <td className="p-4">
                                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                                    {TOTAL_COSTO}
                                                                </Typography>
                                                            </td>
                                                            <td>
                                                                <div className='flex flex-row justify-center gap-2'>
                                                                    {hasPermissionUpdate && (
                                                                        <>
                                                                            <EditPurchase id_purchase={ID_INGRESO} id_supplier={ID_PROVEEDOR} id_products={ID_PRODUCTO} quantity={CANTIDAD_PRODUCTO} unit_price={PRECIO_UNIDAD} callback={functionCallback}  />

                                                                        </>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            {!product_purchase &&
                                                <div role="status" className="space-y-2.5 animate-pulse w-full p-20">
                                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                                                </div>
                                            }

                                            {product_purchase && !product_purchase.length && (
                                                <Alert
                                                    icon={<ExclamationTriangleIcon className="mt-px h-6 w-6" />}
                                                    className="bg-[#e8d7d7] text-[#ff3939] border-l-4 border-[#c92e2e] rounded-none font-medium">
                                                    No hay datos para mostrar. Deberá  registrar su primer ingreso de productos.
                                                </Alert>
                                            )}
                                        </div>

                                    </AccordionBody>
                                </Accordion>

                            </form>

                        </CardBody>
                    </Card>
                </div>
            ))}

        </Fragment >
    )
}

/*
<div className="container flex justify-center">
                <Card className="w-full max-w-[30rem]">
                    <CardHeader
                        color="blue"
                        floated={false}
                        shadow={false}
                        className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                    >
                        <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
                            <RiAccountPinCircleFill size={50} />
                        </div>
                        <Typography variant="h4" color="white">
                            {user_name}
                        </Typography>
                        <Typography variant="h4" color="white">
                            Detalle de Usuario
                        </Typography>
                        <Typography color="white" className="mt-1 font-normal">
                            Información del usuario y perfil.
                        </Typography>

                        <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                            <Link href="/users/">
                                <Tooltip content="Regresar a lista">
                                    <IconButton>
                                        <RiLogoutBoxLine size={20} />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                            {hasPermissionUpdateUsers && (
                                <>
                                    <EditUser id_user={user_id} user_name={user_name} name={name} email={email} phone={phone} user_profile={user_profile} callback={functionCallback} />
                                    <EditProfile id_user={user_id} user_profile={user_profile} callback={functionCallback} />
                                    <ResetPassword user_name={user_name} />
                                </>
                            )}

                        </div>
                    </CardHeader>
                    <CardBody className="flex justify-center flex-col gap-4">


                        {user_details.map(({ name, email, phone }, index) => (
                            <form className="mt-5 mb-2" key={index}>
                                <div className="my-4 flex flex-col justify-center">
                                    <Input
                                        type="text"
                                        size="lg"
                                        label="Nombre Completo"
                                        name="firstname"
                                        value={name}
                                        readOnly
                                    />

                                </div>

                                <div className="my-4 flex flex-row gap-3 justify-center">
                                    <Input
                                        type="email"
                                        size="lg"
                                        label="Email"
                                        name="email"
                                        value={email}
                                        readOnly
                                    />
                                    <Input
                                        type="number"
                                        size="lg"
                                        label="Teléfono"
                                        name="phone"
                                        value={phone}
                                        readOnly
                                    />

                                </div>
                            </form>

                        ))}

                        <Accordion
                            open={open === 1}
                            className="border border-blue-gray-200 px-4 rounded-lg mb-2"
                        >
                            <AccordionHeader
                                onClick={() => handleOpen(1)}
                                className="text-gray-600"
                            >
                                {user_profile}
                            </AccordionHeader>
                            <AccordionBody className="text-base font-normal pt-0">
                                <List className="overflow-auto max-h-[20rem] mt-5">
                                    {profile_details.map(({ permission, de_permission }, index) => (
                                        <ListItem key={index}>
                                            <ListItemPrefix>
                                                <RiKey2Fill size={30} />
                                            </ListItemPrefix>
                                            <div>
                                                <Typography variant="h6" color="blue-gray">
                                                    {permission}
                                                </Typography>
                                                <Typography variant="small" color="gray" className="font-normal">
                                                    {de_permission}
                                                </Typography>
                                            </div>
                                        </ListItem>
                                    ))}
                                </List>
                            </AccordionBody>
                        </Accordion>
                    </CardBody>
                </Card>
            </div>

*/