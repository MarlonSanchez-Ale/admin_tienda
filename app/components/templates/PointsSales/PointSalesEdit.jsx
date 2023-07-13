import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { pointSalesService } from "@/app/services/pointSale.service";
import { toastService } from "@/app/services/toast.service";
import { RiDashboardLine, RiPencilFill } from "react-icons/ri";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Textarea,
    Tooltip,
    IconButton,
    Dialog
} from "@material-tailwind/react";

PointSalesEdit.prototype = {
    callback: PropTypes.func.isRequired,
    id_point_sale: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phone: PropTypes.number.isRequired


}

export default function PointSalesEdit({ id_point_sale, name, address, phone, callback }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    const [message, setMessage] = useState({
        tittle: "",
        message: ""
    })
    const [viewMessage, setViewMessage] = useState(false)

    const [editPointSale, setEditPointSale] = useState({
        id_point_sale: id_point_sale ? id_point_sale : "",
        name: name ? name : "",
        address: address ? address : "",
        phone: phone ? phone : "",
    });



    const handleSubmit = async (e) => {
        e.preventDefault();

        return pointSalesService.edit(editPointSale)
            .then((res) => {
                toastService.success(res.title, res.message, {
                    keepAfterRouteChange: true,
                });
                setMessage({
                    ...message,
                    tittle: res.title,
                    message: res.message
                })

                setViewMessage(true)
                callback()
                //handleCancel();
                handleOpen();
                //console.log(res)
            })
            .catch((error) => {
                toastService.error(error.title, error.message, { keepAfterRouteChange: true });
                setMessage({
                    ...message,
                    tittle: error.title,
                    message: error.message
                })

                setViewMessage(true)
            });
        //handleCancel();
    }

    return (
        <React.Fragment>
            <Tooltip content="Editar Punto de Venta">
                <IconButton onClick={handleOpen} variant="outlined">
                    <RiPencilFill size={20} />
                </IconButton>
            </Tooltip>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
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
                            Editar Punto de Venta
                        </Typography>
                        <Typography color="white" className="mt-1 font-normal">
                            Agregar los datos del Punto de Venta
                        </Typography>
                    </CardHeader>
                    <CardBody >
                        <form className="my-5 gap-3" onSubmit={handleSubmit}>
                            <div className="my-2 flex flex-col gap-4 justify-center">
                                <Input
                                    type="text"
                                    size="lg"
                                    label="Nombre"
                                    name="name"
                                    value={editPointSale.name}
                                    onChange={(e) => {
                                        setEditPointSale({
                                            ...editPointSale,
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
                                    value={editPointSale.address}
                                    onChange={(e) => {
                                        setEditPointSale({
                                            ...editPointSale,
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
                                    value={editPointSale.phone}
                                    onChange={(e) => {
                                        editPointSale({
                                            ...editPointSale,
                                            phone: e.target.value,
                                        })
                                    }}
                                    required
                                />

                            </div>

                            <div className="flex flex-row gap-2 justify-center">
                                <Button color="red"  fullWidth onClick={handleOpen}>
                                    Cancelar
                                </Button>
                                <Button variant="gradient" type="submit" fullWidth>
                                    Guardar
                                </Button>
                            </div>

                            {viewMessage ? (
                                <>
                                    <Typography variant="h6" className="mt-3">{message.tittle}</Typography>
                                    <Typography >{message.message}</Typography>
                                </>
                            )
                                : (<></>)}

                        </form>
                    </CardBody>

                </Card>
            </Dialog>
        </React.Fragment>
    )

}