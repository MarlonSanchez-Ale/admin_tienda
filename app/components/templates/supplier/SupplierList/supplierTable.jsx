import * as React from 'react';
import PropTypes from "prop-types";
import { useHasPermissionStatus } from '@/app/hook/useHasPermissionStatus';
import { Card, Typography, Alert, IconButton, Tooltip } from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import Link from 'next/link';
import DisableButton from '@/app/components/elements/forms/disableButton';
import EditSupplier from '../EditSupplier';

export { SupplierListTable };

SupplierListTable.propTypes = {
    supplier: PropTypes.array,
    getCallBack: PropTypes.func.isRequired,
    //urlDownload: PropTypes.string,
    deleteCallBack: PropTypes.func.isRequired,
};


function SupplierListTable({ supplier, getCallBack, deleteCallBack }) {
    //const hasPermissionDeleteUsers = useHasPermissionStatus("Eliminar Usuario")

    const TABLE_HEAD = ["USER CREADOR", "USUARIO EDITOR", "FECHA CREACIÓN", "FECHA EDICIÓN", "PROVEEDOR", "DESCRIPCIÓN", "DIRECCION", "TELEFONO", "ESTADO", "OPCIONES"];

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
                        {supplier && supplier.map(({ USER_CREATE, USER_UPDATE, FECHA_CREADO, FECHA_EDITADO, ID_PROVEEDOR, PROVEEDOR, DESCRIPCION, DIRECCION, TELEFONO, ESTADO }, index) => (
                            <tr key={index} className="even:bg-blue-gray-50/50">
                                <td className="p-4">
                                    <Link href={`/supplier/details/${ID_PROVEEDOR}`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {USER_CREATE}
                                        </Typography>
                                    </Link>
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
                                        {PROVEEDOR}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {DESCRIPCION}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {DIRECCION}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {TELEFONO}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography as="a" href="#" variant="small" color="blue" className="font-medium">
                                        {ESTADO}
                                    </Typography>
                                </td>
                                <td>
                                    <div className='flex flex-row justify-center gap-2'>
                                       <EditSupplier id_supplier={ID_PROVEEDOR} name={PROVEEDOR} description={DESCRIPCION} address={DIRECCION} phone={TELEFONO} callback={getCallBack}  />
                                        <DisableButton
                                            callbackDelete={() => {
                                                return deleteCallBack(ID_PROVEEDOR);
                                            }} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {!supplier &&
                    <div role="status" className="space-y-2.5 animate-pulse w-full p-20">
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[800px] mb-2.5 mx-auto"></div>
                    </div>
                }

                {supplier && !supplier.length && (
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