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
    IconButton
} from "@material-tailwind/react";
import { RiLogoutBoxLine, RiDashboardLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { RiKey2Fill } from "react-icons/ri";
import EditProduct from "./editProducts";
import EditCatProduct from "./editCatProduct";

export { Details }

function Details(props) {
    const products = props?.products?.producto;
    const functionCallback = props?.callback;

    const product_details = products.dataProducts;

    const hasPermissionUpdate = useHasPermissionStatus("Editar Producto")

    return (
        <Fragment>
            {product_details.map(({ ID_PRODUCTO, IMAGEN, PRODUCTO, DESCRIPCION, PRECIO_VENTA, INVENTARIO, ID_CATEGORIA, CATEGORIA, DESCRIPCION_CATEGORIA }, index) => (
                <div className="container flex justify-center" key={index}>
                    <Card className="w-full max-w-[30rem]">
                        <CardHeader
                            color="blue"
                            floated={false}
                            shadow={false}
                            key={index}
                            className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                        >
                            <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white" key={index}>
                                <RiDashboardLine size={50} />
                            </div>
                            <Typography variant="h4" color="white">
                                Detalle de Producto
                            </Typography>
                            <Typography color="white" className="mt-1 font-normal">
                                Información del producto y categoría.
                            </Typography>

                            <div className="group mt-8 inline-flex flex-wrap items-center gap-3" key={index}>
                                <Link href="/products/">
                                    <Tooltip content="Regresar a lista">
                                        <IconButton>
                                            <RiLogoutBoxLine size={20} />
                                        </IconButton>
                                    </Tooltip>
                                </Link>
                                {hasPermissionUpdate && (
                                    <>
                                        <EditProduct id_products={ID_PRODUCTO} name={PRODUCTO} description={DESCRIPCION} sale_price={PRECIO_VENTA} callback={functionCallback}/>
                                        <EditCatProduct id_products={ID_PRODUCTO} id_category={ID_CATEGORIA} categoria={CATEGORIA} callback={functionCallback} />
                                    </>
                                )}

                            </div>
                        </CardHeader>
                        <CardBody className="flex justify-center flex-col gap-4"  key={index}>
                            <form className="mt-5 mb-2" key={index}>
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

                                <List className="overflow-auto max-h-[20rem] mt-5">
                                    <Typography variant="h5" color="black">
                                        Categoría de Producto
                                    </Typography>
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