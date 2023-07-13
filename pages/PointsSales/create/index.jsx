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
import { pointSalesService } from "@/app/services/pointSale.service";
import { toastService } from "@/app/services/toast.service";
import { Fragment } from "react";
import { RiDashboardLine, RiArrowLeftSLine, RiLogoutBoxLine } from "react-icons/ri";

export default function CreatePointSale() {

    const router = useRouter()
    const [create, setCreate] = useState({
        name: "",
        address: "",
        phone: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        //console.log(newUser)

        return pointSalesService.create(create)
            .then((res) => {
                toastService.success(res.title, res.message, {
                    keepAfterRouteChange: true,
                });
                handleCancel()
                router.push("/PointsSales");
            })
            .catch((error) => {
                toastService.error(error.title, error.message, { keepAfterRouteChange: true });
                //console.log(error)
            });
    }

    const handleCancel = async (e) => {
        setCreate({
            ...create,
            name: "",
            address: "",
            phone: ""
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
                        className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                    >


                        <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
                            <RiDashboardLine size={50} />
                        </div>
                        <Typography variant="h4" color="white">
                            Registrar Punto de Venta
                        </Typography>
                        <Typography color="white" className="mt-1 font-normal">
                            Agregar los datos del punto de venta
                        </Typography>

                        <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                            <Link href="/PointsSales/">
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
                            <div className="my-2 flex flex-col gap-4 justify-center">
                                <Input
                                    type="text"
                                    size="lg"
                                    label="Nombre"
                                    name="name"
                                    value={create.name}
                                    onChange={(e) => {
                                        setCreate({
                                            ...create,
                                            name: e.target.value,
                                        })
                                    }}
                                    required
                                />

                            </div>

                            <div className="my-4 flex flex-col gap-3 justify-center">
                                <Input
                                    type="text"
                                    size="lg"
                                    label="Dirección"
                                    name="address"
                                    value={create.address}
                                    onChange={(e) => {
                                        setCreate({
                                            ...create,
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
                                    value={create.phone}
                                    onChange={(e) => {
                                        setCreate({
                                            ...create,
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
        </Fragment>
    )
}