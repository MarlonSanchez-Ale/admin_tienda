import * as React from 'react';
import PropTypes from "prop-types";
import { useHasPermissionStatus } from '@/app/hook/useHasPermissionStatus';
import { Card, Typography, Alert, IconButton, Tooltip } from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import Link from 'next/link';
import DisableButton from '@/app/components/elements/forms/disableButton';
import { RiEdit2Line, RiEraserLine, RiSearchEyeLine } from "react-icons/ri";
import AddPruchase from '../AddPurchase';

export { ProductsListTable };

ProductsListTable.propTypes = {
    products: PropTypes.array,
    getCallBack: PropTypes.func.isRequired,
    //urlDownload: PropTypes.string,
    deleteCallBack: PropTypes.func.isRequired,
};


function ProductsListTable({ products, getCallBack, deleteCallBack }) {
    //const hasPermissionDeleteUsers = useHasPermissionStatus("Eliminar Usuario")

    const TABLE_HEAD = ["USER CREADOR", "USUARIO EDITOR", "FECHA CREACIÓN", "FECHA EDICIÓN", "PRODUCTO", "DESCRIPCION", "PRECIO_VENTA", "INVENTARIO", "ESTADO", "OPCIONES"];

    return (
        <>
            <Card className="overflow-scroll h-full w-full mt-10">
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
                        {products && products.map(({ USER_CREATE, USER_UPDATE, FECHA_CREADO, FECHA_EDITADO, ID_PRODUCTO, PRODUCTO, DESCRIPCION, PRECIO_VENTA, INVENTARIO, ESTADO }, index) => (
                            <tr key={index} className="even:bg-blue-gray-50/50">
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {USER_CREATE}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {USER_UPDATE}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {FECHA_CREADO}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {FECHA_EDITADO}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {PRODUCTO}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {DESCRIPCION}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {PRECIO_VENTA}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {INVENTARIO}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography as="a" href="#" variant="small" color="blue" className="font-medium">
                                        {ESTADO}
                                    </Typography>
                                </td>
                                <td>
                                    <div className='flex flex-row justify-center gap-2'>
                                        <Tooltip content="Detalle">
                                            <Link href={`/products/details/${ID_PRODUCTO}`}>
                                                <IconButton variant="outlined">
                                                    <RiSearchEyeLine size={20} />
                                                </IconButton>
                                            </Link>
                                        </Tooltip>
                                        <AddPruchase id_products={ID_PRODUCTO} callback={getCallBack} />
                                        <DisableButton
                                            callbackDelete={() => {
                                                return deleteCallBack(ID_PRODUCTO);
                                            }} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {!products &&
                    <div role="status" className="space-y-2.5 animate-pulse w-full p-20">
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                    </div>
                }

                {products && !products.length && (
                    <Alert
                        icon={<ExclamationTriangleIcon className="mt-px h-6 w-6" />}
                        className="bg-[#e8d7d7] text-[#ff3939] border-l-4 border-[#c92e2e] rounded-none font-medium">
                        No hay datos para mostrar.
                    </Alert>
                )}
            </Card>
        </>
    )
}