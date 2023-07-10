import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Tooltip,
    Alert,
    IconButton,
    Textarea
} from "@material-tailwind/react";
import { BsPersonCircle } from 'react-icons/bs'
import Link from "next/link";
import { useRouter } from 'next/router';
import { supplierService } from "@/app/services/supplier.service";
import { toastService } from "@/app/services/toast.service";
import { RiLogoutBoxLine, RiDashboardLine } from "react-icons/ri";

import { Fragment } from "react";


export default function Register() {

    
   
    const router = useRouter()

    const [newSupplier, setNewSupplier] = useState({
        name: "",
        description: "",
        address: "",
        phone: 0
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        //console.log(newUser)

        return supplierService.create(newSupplier)
            .then((res) => {
                toastService.success(res.title, res.message, {
                    keepAfterRouteChange: true,
                });
                handleCancel()
                router.push("/supplier");
            })
            .catch((error) => {
                toastService.error(error.title, error.message, { keepAfterRouteChange: true });
                //console.log(error)
            });
    }

    const handleCancel = async (e) => {
        setNewSupplier({
            ...newSupplier,
            name: "",
            description: "",
            address: "",
            phone: 0,
        })
    }

    return (
        <Fragment>
            <div className="container flex justify-center">
                <Card className="w-full max-w-[30rem]">
                    <CardHeader
                        color="blue"
                        floated={false}
                        shadow={false}
                        className="m-0 grid place-items-center rounded-b-none py-4 px-4 text-center"
                    >
                        <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
                            <RiDashboardLine size={50} />
                        </div>
                        <Typography variant="h4" color="white">
                            Registro de Proveedor
                        </Typography>
                        <Typography color="white" className="mt-1 font-normal">
                            Agregar datos del proveedor
                        </Typography>

                        <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                            <Link href="/supplier/">
                                <Tooltip content="ir a lista">
                                    <IconButton>
                                        <RiLogoutBoxLine size={20} />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardBody className="flex justify-center">

                        <form className="mt-5 mb-2 " onSubmit={handleSubmit}>
                            <div className="my-2 flex flex-col gap-4 justify-center">
                                <Input
                                    type="text"
                                    size="lg"
                                    label="Nombre de Proveedor"
                                    name="name"
                                    value={newSupplier.name}
                                    onChange={(e) => {
                                        setNewSupplier({
                                            ...newSupplier,
                                            name: e.target.value,
                                        })
                                    }}
                                    required
                                />
                                <Textarea
                                    type="text"
                                    size="lg"
                                    label="Descripción"
                                    name="description"
                                    value={newSupplier.description}
                                    onChange={(e) => {
                                        setNewSupplier({
                                            ...newSupplier,
                                            description: e.target.value,
                                        })
                                    }}
                                    required
                                />
                            </div>

                            <div className="my-4 flex flex-row gap-3 justify-center">
                                <Input
                                    type="text"
                                    size="lg"
                                    label="Dirección"
                                    name="address"
                                    value={newSupplier.address}
                                    onChange={(e) => {
                                        setNewSupplier({
                                            ...newSupplier,
                                            address: e.target.value,
                                        })
                                    }}
                                    required
                                />
                                <Input
                                    type="number"
                                    size="lg"
                                    label="Teléfono"
                                    name="email"
                                    value={newSupplier.phone}
                                    onChange={(e) => {
                                        setNewSupplier({
                                            ...newSupplier,
                                            phone: e.target.value,
                                        })
                                    }}
                                    required
                                />

                            </div>

                            

                            <Button type="submit" className="mt-6" fullWidth >
                                Guardar
                            </Button>
                            
                        </form>
                    </CardBody>

                </Card>
            </div>

        </Fragment >

    );
}



