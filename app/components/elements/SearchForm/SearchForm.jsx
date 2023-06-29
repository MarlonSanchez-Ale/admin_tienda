import { useRouter } from "next/router";
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toastService } from "@/app/services/toast.service";
import * as React from 'react';
import { useForm } from 'react-hook-form';
import ButtonDownload from "../forms/ButtonDownload";
import { useHasPermissionStatus } from "@/app/hook/useHasPermissionStatus";

import {
    Navbar,
    Typography,
    IconButton,
    Button,
    Input,
    Tooltip
} from "@material-tailwind/react";
import { BellIcon, Cog6ToothIcon, CloudArrowDownIcon } from "@heroicons/react/24/solid";
import { RiCloseFill, RiFolderAddFill, RiArrowDownCircleFill } from 'react-icons/ri'
import Link from "next/link";


export default SearchForm;

SearchForm.propTypes = {
    dataForm: PropTypes.array,
    updateCallback: PropTypes.func.isRequired,
    fileNameDownload: PropTypes.string.isRequired,
    titleFileDownload: PropTypes.string.isRequired,
    titleForm: PropTypes.string.isRequired,
    titleButtonCreate: PropTypes.string,
    urlCreate: PropTypes.string,
    hasPermissionCreate: PropTypes.string,
    //setUrlDownload: PropTypes.func.isRequired
};

function SearchForm({
    dataForm,
    updateCallback,
    fileNameDownload,
    titleFileDownload,
    titleForm,
    titleButtonCreate,
    urlCreate,
    hasPermissionCreate,
    }) {
    /**
     * Ya que hay varias vista que comparten esta forma de consultar datos
     * se hizo este componente para reutilizarlo en los sitios donde
     * hay una lista que es filtrada por un unico campo Buscar...
     * updateCallback: Es una funcion que conoce la funcionalidad de 
     *  actualizar sus datos para mostrarse en la tabla correspondiente
     * setUrlDownload: Es un metodo de useState() para actualizar la
     *  url dependiendo de la busqueda.
     */
    const [isSubmitting, setIsSubmitting] = useState(false);




    const formOptions = {};
    // Establecer los valores por defecto del formulario
    const router = useRouter();
    const { query } = useRouter();
    const filters_q = query?.filters
        ? JSON.parse(query?.filters)
        : {};

    if (!formOptions.defaultValues) {
        formOptions.defaultValues = {}
        formOptions.defaultValues.search = getDefaultValueSearchForm(filters_q);
    }

    function getDefaultValueSearchForm(filters_q) {
        return filters_q?.search || '';
    }


    const {
        handleSubmit,
        register,
        setValue,
        getValues,
    } = useForm(formOptions);

    useEffect(() => {
        executeCallback(formOptions.defaultValues);
    }, []);



    async function executeCallback(data) {
        // data son los datos del formulario tal y como los maneja el formulario
        var filters = data;

        const paramsUrlStr = `?filters=${encodeURIComponent(JSON.stringify(filters))}`;
        // https://www.codegrepper.com/code-examples/javascript/react+change+url+without+reload
        if (window.history.replaceState) {
            //prevents browser from storing history with each change:
            window.history.replaceState({ ...window.history.state, as: `${window.location.pathname}${paramsUrlStr}`, url: `${window.location.pathname}${paramsUrlStr}` }, '', `${window.location.pathname}${paramsUrlStr}`);
        }


        try {
            setIsSubmitting(true);
            await updateCallback(filters);
            setIsSubmitting(false);
        } catch (err) {
            setIsSubmitting(false);
            toastService.error(err.message);
        }
    }

    function onClearSearch() {
        setValue('search', '');
        executeCallback({});
    }

    async function onSubmit(data) {
        await executeCallback(data);
    }




    const hasPermissionNew = useHasPermissionStatus(hasPermissionCreate)

    return (
        <>
            <Navbar className="mx-auto max-w-screen-xl px-4 py-3" >
                <form className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900" onSubmit={handleSubmit(onSubmit)}>
                    <Typography
                        as="a"
                        href="#"
                        variant="h6"
                        className="mr-4 ml-2 cursor-pointer py-1.5"
                    >
                        {titleForm}
                    </Typography>
                    <div className="ml-auto flex gap-2 md:mr-4">
                        {hasPermissionNew && (
                            <Tooltip content={titleButtonCreate}>
                                <Link href={urlCreate}>
                                <IconButton variant="text" color="blue-gray" >
                                    <RiFolderAddFill size={20} />
                                </IconButton>
                                </Link>
                            </Tooltip>
                        )}


                        {dataForm && (
                            <ButtonDownload jsObjArray={dataForm}
                                filename={fileNameDownload}
                                workbookOptions={{ title: titleFileDownload }} />
                        )}
                    </div>
                    <div className="flex flex-row gap-5 ">

                        <div className="relative flex w-full max-w-[24rem]">
                            <Input
                                type="text"
                                label="Buscar..."
                                className="pr-20"
                                containerProps={{
                                    className: "min-w-0",
                                }}
                                {...register("search")}

                            />
                            <Button
                                size="sm"
                                className="!absolute right-1 top-1 rounded"
                                type="submit"
                            >
                                Buscar
                            </Button>
                        </div>
                        <Tooltip content="Borrar">
                            <IconButton variant="text" color="blue-gray" onClick={onClearSearch}>
                                <RiCloseFill className="h-4 w-4" />
                            </IconButton>
                        </Tooltip>
                    </div>
                </form>
            </Navbar>
        </>
    )
}

