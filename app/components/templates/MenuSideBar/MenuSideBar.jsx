import React, { useEffect, useState } from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Alert,
    IconButton,
    Tooltip
} from "@material-tailwind/react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import {
    RiDashboard2Line, RiNumbersLine, RiSurveyLine, RiAttachment2,
    RiAccountPinCircleLine, RiLogoutCircleRLine, RiSpyFill, RiAccountPinBoxFill
} from 'react-icons/ri'

import Link from "next/link";
import { userService } from "@/app/services/user.service";
import { useHasPermissionStatus } from "@/app/hook/useHasPermissionStatus";


export default function MenuSideBar(props) {

    const [open, setOpen] = React.useState(1);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const [user, setUser] = useState(null);



    function logout() {
        userService.logout();
    }



    // Permisos de Reportes
    const hasPermissionListReport = useHasPermissionStatus("Listar Reporte")

    // Permisos de venta
    const hasPermissionListSales = useHasPermissionStatus("Listar Ventas");
    const hasPermissionRegisterSales = useHasPermissionStatus("Registrar Venta")
    const hasPermissionSalesPoint = useHasPermissionStatus("Listar Punto Venta")
    const hasPermissionRegisterSalesPoint = useHasPermissionStatus("Registrar Punto Venta")

    // Permisos de inventarios
    const hasPermissionListProducts = useHasPermissionStatus("Listar Productos")
    const hasPermissionRegisterProducts = useHasPermissionStatus("Registrar Producto")
    const hasPermissionListCategory = useHasPermissionStatus("Listar Categorias")
    const hasPermissionRegisterCategory = useHasPermissionStatus("Crear Categoria")
    const hasPermissionListBuy = useHasPermissionStatus("Listar Compra Producto")
    const hasPermissionRegisterBuy = useHasPermissionStatus("Registrar Compra Producto")

    // Permisos de proveedores

    const hasPermissionListSupplier = useHasPermissionStatus("Listar Proveedor")
    const hasPermissionRegisterSupplier = useHasPermissionStatus("Registrar Proveedor")

    //Permisos de gastos
    const hasPermissionListBills = useHasPermissionStatus("Listar Gastos")
    const hasPermissionRegisterBills = useHasPermissionStatus("Registrar Gasto")


    // Permisos de usuario
    const hasPermissionListUser = useHasPermissionStatus("Listar Usuario")
    const hasPermissionRegisterUser = useHasPermissionStatus("Crear Usuario")

    const [on, setOn] = React.useState(false);
    const openDrawer = () => setOn(true);
    const closeDrawer = () => setOn(false);
    const [userActive, setUserActive] = useState([])

    useEffect(() => {
        userService.getUserProfileById(userService.userValue?.username)
            .then(u => {
                setUserActive(u.user_profile)
            });
    }, []);

    return (

        <div className="flex flex-row gap-5">

            <Card className="h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 my-3 mx-3">
                <div className="mb-2 p-4">
                    {userActive && userActive.map(({ id_users, user_name, name, profile }, index) => (
                        <div key={index} className="flex justify-center flex-col gap-2">
                            <div className="flex justify-center">
                                <RiSpyFill size={40} />
                            </div>

                            <Typography variant="h6" className="mt-2 text-center" color="blue-gray" >
                                {name}
                            </Typography>
                            <Typography className="text-center" color="blue-gray">{profile}</Typography>
                            <div className="flex justify-center">
                                <Link href={`/users/details/${id_users}`}>
                                    <Tooltip content="Mi Cuenta">
                                        <IconButton variant="text" className="rounded-full">
                                            <RiAccountPinBoxFill size={30} color="black"/>
                                        </IconButton>
                                    </Tooltip>
                                </Link>

                            </div>

                        </div>
                    ))}

                    {!userActive &&
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    }

                    {userActive && !userActive.length && (
                        <Alert
                            icon={<ExclamationTriangleIcon className="mt-px h-6 w-6" />}
                            className="bg-[#2ec946]/10 text-[#2ec946] border-l-4 border-[#2ec946] rounded-none font-medium">
                            No se ha Encontrado el Usuario, iniciar sesión.
                        </Alert>
                    )}

                </div>

                <List>
                    {hasPermissionListReport && (
                        <Link href="/">
                            <ListItem>
                                <ListItemPrefix>
                                    <RiDashboard2Line className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="mr-auto font-normal">
                                    Dashboard
                                </Typography>
                            </ListItem>
                        </Link>
                    )}
                    {hasPermissionListSales && (
                        <Accordion
                            open={open === 1}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                                />
                            }
                        >
                            <ListItem className="p-0" selected={open === 1}>
                                <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                                    <ListItemPrefix>
                                        <RiNumbersLine className="h-5 w-5" />
                                    </ListItemPrefix>
                                    <Typography color="blue-gray" className="mr-auto font-normal">
                                        Registro de Ventas
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                <List className="p-0">
                                    <Link href="/sales/">
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            Listar venta
                                        </ListItem>
                                    </Link>
                                    {hasPermissionRegisterSales && (
                                        <Link href="/sales/register">
                                            <ListItem>
                                                <ListItemPrefix>
                                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                </ListItemPrefix>
                                                Registrar Venta
                                            </ListItem>
                                        </Link>
                                    )}
                                    {hasPermissionSalesPoint && (
                                        <Link href="/PointsSales/">
                                            <ListItem>
                                                <ListItemPrefix>
                                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                </ListItemPrefix>
                                                Puntos de Venta
                                            </ListItem>
                                        </Link>
                                    )}
                                    {hasPermissionRegisterSalesPoint && (
                                        <Link href="/PointsSales/create">
                                            <ListItem>
                                                <ListItemPrefix>
                                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                </ListItemPrefix>
                                                Añadir P. Venta
                                            </ListItem>
                                        </Link>
                                    )}

                                </List>
                            </AccordionBody>
                        </Accordion>
                    )}
                    {hasPermissionListProducts && (

                        <Accordion
                            open={open === 2}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                                />
                            }
                        >
                            <ListItem className="p-0" selected={open === 2}>
                                <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                                    <ListItemPrefix>
                                        <RiSurveyLine className="h-5 w-5" />
                                    </ListItemPrefix>
                                    <Typography color="blue-gray" className="mr-auto font-normal">
                                        Inventario de Productos
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                <List className="p-0">
                                    <Link href="/products/">
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            Listar Productos
                                        </ListItem>
                                    </Link>
                                    {hasPermissionRegisterProducts && (
                                        <Link href="/products/register/">
                                            <ListItem>
                                                <ListItemPrefix>
                                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                </ListItemPrefix>
                                                Agregar Productos
                                            </ListItem>
                                        </Link>
                                    )}
                                    {hasPermissionListCategory && (
                                        <Link href="/categorys/">
                                            <ListItem>
                                                <ListItemPrefix>
                                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                </ListItemPrefix>
                                                Listar Categorías
                                            </ListItem>
                                        </Link>
                                    )}
                                    {hasPermissionRegisterCategory && (
                                        <Link href="/categorys/create">
                                            <ListItem>
                                                <ListItemPrefix>
                                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                </ListItemPrefix>
                                                Agregar Categoría
                                            </ListItem>
                                        </Link>
                                    )}
                                    {hasPermissionListSupplier && (
                                        <Link href="/supplier/">
                                            <ListItem>
                                                <ListItemPrefix>
                                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                </ListItemPrefix>
                                                Listar Proveedores
                                            </ListItem>
                                        </Link>
                                    )}
                                    {hasPermissionRegisterSupplier && (
                                        <Link href="/supplier/register">
                                            <ListItem>
                                                <ListItemPrefix>
                                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                </ListItemPrefix>
                                                Registrar Proveedor
                                            </ListItem>
                                        </Link>
                                    )}
                                </List>
                            </AccordionBody>
                        </Accordion>
                    )}

                    {hasPermissionListUser && (
                        <Accordion
                            open={open === 4}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
                                />
                            }
                        >
                            <ListItem className="p-0" selected={open === 4}>
                                <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
                                    <ListItemPrefix>
                                        <RiAccountPinCircleLine className="h-5 w-5" />
                                    </ListItemPrefix>
                                    <Typography color="blue-gray" className="mr-auto font-normal">
                                        Usuarios
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                <List className="p-0">
                                    {hasPermissionListUser && (
                                        <Link href="/users/">
                                            <ListItem>
                                                <ListItemPrefix>
                                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                </ListItemPrefix>
                                                Listar Usuarios
                                            </ListItem>
                                        </Link>
                                    )}
                                    {hasPermissionRegisterUser && (
                                        <Link href="/users/create/register">
                                            <ListItem>
                                                <ListItemPrefix>
                                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                </ListItemPrefix>
                                                Crear Usuario
                                            </ListItem>
                                        </Link>
                                    )}

                                </List>
                            </AccordionBody>
                        </Accordion>
                    )}

                    <ListItem onClick={logout}>
                        <ListItemPrefix>
                            <RiLogoutCircleRLine className="h-5 w-5" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </List>
            </Card>


            <main className='p-10 overflow-scroll h-full w-full'>
                {props.mainPage}
            </main>
        </div>
    );
}

/*
  <React.Fragment>
                <div className="sticky top p-5">
                    <IconButton onClick={openDrawer} size="lg" >
                        <RiBarChartHorizontalFill size={30} />
                    </IconButton>
                </div>


                <Drawer open={on} onClose={closeDrawer} className="overflow-auto ">
                    <div className="flex justify-end p-5">
                        <IconButton onClick={closeDrawer} color="blue" size="lg" >
                            <RiArrowLeftCircleFill size={20} />
                        </IconButton>
                    </div>
                    <div className="mb-2 p-4">
                        {userActive && userActive.map(({ user_name, name, profile }, index) => (
                            <div key={index} className="flex justify-center flex-col gap-2">
                                <div className="flex justify-center">
                                    <RiSpyFill size={40} />
                                </div>

                                <Typography variant="h6" className="mt-2 text-center" color="blue-gray" >
                                    {name}
                                </Typography>
                                <Typography className="text-center" color="blue-gray">{profile}</Typography>
                            </div>
                        ))}

                        {!userActive &&
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        }

                        {userActive && !userActive.length && (
                            <Alert
                                icon={<ExclamationTriangleIcon className="mt-px h-6 w-6" />}
                                className="bg-[#2ec946]/10 text-[#2ec946] border-l-4 border-[#2ec946] rounded-none font-medium">
                                No se ha Encontrado el Usuario, iniciar sesión.
                            </Alert>
                        )}


                    </div>
                    <List>
                        {hasPermissionListReport && (
                            <Link href="/">
                                <ListItem>
                                    <ListItemPrefix>
                                        <RiDashboard2Line className="h-5 w-5" />
                                    </ListItemPrefix>
                                    <Typography color="blue-gray" className="mr-auto font-normal">
                                        Dashboard
                                    </Typography>
                                </ListItem>
                            </Link>
                        )}
                        {hasPermissionListSales && (
                            <Accordion
                                open={open === 1}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                                    />
                                }
                            >
                                <ListItem className="p-0" selected={open === 1}>
                                    <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                                        <ListItemPrefix>
                                            <RiNumbersLine className="h-5 w-5" />
                                        </ListItemPrefix>
                                        <Typography color="blue-gray" className="mr-auto font-normal">
                                            Registro de Ventas
                                        </Typography>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody className="py-1">
                                    <List className="p-0">
                                        <Link href="/sales/">
                                            <ListItem>
                                                <ListItemPrefix>
                                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                </ListItemPrefix>
                                                Listar venta
                                            </ListItem>
                                        </Link>
                                        {hasPermissionRegisterSales && (
                                            <Link href="/sales/register">
                                                <ListItem>
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    Registrar Venta
                                                </ListItem>
                                            </Link>
                                        )}
                                        {hasPermissionSalesPoint && (
                                            <Link href="/PointsSales/">
                                                <ListItem>
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    Puntos de Venta
                                                </ListItem>
                                            </Link>
                                        )}
                                        {hasPermissionRegisterSalesPoint && (
                                            <Link href="/PointsSales/create">
                                                <ListItem>
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    Añadir P. Venta
                                                </ListItem>
                                            </Link>
                                        )}

                                    </List>
                                </AccordionBody>
                            </Accordion>
                        )}
                        {hasPermissionListProducts && (

                            <Accordion
                                open={open === 2}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                                    />
                                }
                            >
                                <ListItem className="p-0" selected={open === 2}>
                                    <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                                        <ListItemPrefix>
                                            <RiSurveyLine className="h-5 w-5" />
                                        </ListItemPrefix>
                                        <Typography color="blue-gray" className="mr-auto font-normal">
                                            Inventario de Productos
                                        </Typography>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody className="py-1">
                                    <List className="p-0">
                                        <Link href="/products/">
                                            <ListItem>
                                                <ListItemPrefix>
                                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                </ListItemPrefix>
                                                Listar Productos
                                            </ListItem>
                                        </Link>
                                        {hasPermissionRegisterProducts && (
                                            <Link href="/products/register/">
                                                <ListItem>
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    Agregar Productos
                                                </ListItem>
                                            </Link>
                                        )}
                                        {hasPermissionListCategory && (
                                            <Link href="/categorys/">
                                                <ListItem>
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    Listar Categorías
                                                </ListItem>
                                            </Link>
                                        )}
                                        {hasPermissionRegisterCategory && (
                                            <Link href="/categorys/create">
                                                <ListItem>
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    Agregar Categoría
                                                </ListItem>
                                            </Link>
                                        )}
                                        {hasPermissionListSupplier && (
                                            <Link href="/supplier/">
                                                <ListItem>
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    Listar Proveedores
                                                </ListItem>
                                            </Link>
                                        )}
                                        {hasPermissionRegisterSupplier && (
                                            <Link href="/supplier/register">
                                                <ListItem>
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    Registrar Proveedor
                                                </ListItem>
                                            </Link>
                                        )}
                                    </List>
                                </AccordionBody>
                            </Accordion>
                        )}

                        {hasPermissionListUser && (
                            <Accordion
                                open={open === 4}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
                                    />
                                }
                            >
                                <ListItem className="p-0" selected={open === 4}>
                                    <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
                                        <ListItemPrefix>
                                            <RiAccountPinCircleLine className="h-5 w-5" />
                                        </ListItemPrefix>
                                        <Typography color="blue-gray" className="mr-auto font-normal">
                                            Usuarios
                                        </Typography>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody className="py-1">
                                    <List className="p-0">
                                        {hasPermissionListUser && (
                                            <Link href="/users/">
                                                <ListItem>
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    Listar Usuarios
                                                </ListItem>
                                            </Link>
                                        )}
                                        {hasPermissionRegisterUser && (
                                            <Link href="/users/create/register">
                                                <ListItem>
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    Crear Usuario
                                                </ListItem>
                                            </Link>
                                        )}

                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            Mi Cuenta
                                        </ListItem>
                                    </List>
                                </AccordionBody>
                            </Accordion>
                        )}

                        <ListItem onClick={logout}>
                            <ListItemPrefix>
                                <RiLogoutCircleRLine className="h-5 w-5" />
                            </ListItemPrefix>
                            Log Out
                        </ListItem>
                    </List>
                </Drawer>
            </React.Fragment>

*/