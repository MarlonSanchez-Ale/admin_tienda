import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    IconButton,
    Tooltip
} from "@material-tailwind/react";

import { RiPencilFill } from "react-icons/ri";
import { productsService } from "@/app/services/products.service";
import { supplierService } from "@/app/services/supplier.service";
import { toastService } from "@/app/services/toast.service";
import PropTypes from "prop-types";
import Select from "react-tailwindcss-select";

EditPurchase.prototype = {
    callback: PropTypes.func.isRequired,
    id_products: PropTypes.string.isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    sale_price: PropTypes.number.isRequired
}

export default function EditPurchase({ id_purchase, id_supplier, id_products, quantity, unit_price, callback }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [message, setMessage] = useState({
        tittle: "",
        message: ""
    })
    const [viewMessage, setViewMessage] = useState(false)
    const [proveedores, setProveedores] = useState([]);


    const [editPurchase, setEditPurchase] = useState({
        id_purchase: id_purchase ? id_purchase : "",
        id_supplier: id_supplier ? id_supplier : "",
        id_products: id_products ? id_products : "",
        quantity: quantity ? quantity : "",
        unit_price: unit_price ? unit_price : 0,
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(editPurchase)
        return productsService.editPurchase(editPurchase)
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
                callback(id_products)
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

    const options = [];

    useEffect(() => {
        let isMounted = true;
        supplierService.get()
            .then(u => {
                if (isMounted) {
                    //console.log(u)
                    setProveedores(u.proveedores)

                }
            }).catch((err) => {
                if (isMounted) {
                    setProveedores([]);
                    toastService.warn(err.message);
                }

            });
        return () => {
            isMounted = false;
        };
    }, []);

    proveedores.map((a) => {
        options.push(({
            value: a.ID_PROVEEDOR,
            label: a.PROVEEDOR
        }))
    })


    const handleCancel = async (e) => {
        setEditProduct({
            ...editProduct,
            image: "",
            name: "",
            description: "",
            sale_price: "",
        })
    }

    return (
        <React.Fragment>
            <Tooltip content="Editar Ingreso de Producto">
                <IconButton onClick={handleOpen}>
                    <RiPencilFill size={20} />
                </IconButton>
            </Tooltip>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography color="white" variant="h4">
                            Editar Ingreso de Producto
                        </Typography>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardBody className="flex flex-col gap-4">

                            <div className="flex flex-col w-full gap-4">

                                <Input
                                    type="number"
                                    size="lg"
                                    label="Cantidad de Producto"
                                    name="name"
                                    value={editPurchase.quantity}
                                    onChange={(e) => {
                                        setEditPurchase({
                                            ...editPurchase,
                                            quantity: e.target.value,
                                        })
                                    }}
                                    required
                                />

                                <Input
                                    type="number"
                                    size="lg"
                                    label="Precio por Unidad"
                                    name="unit_price"
                                    value={editPurchase.unit_price}
                                    onChange={(e) => {
                                        setEditPurchase({
                                            ...editPurchase,
                                            unit_price: e.target.value,
                                        })
                                    }}
                                    required
                                />


                                <Typography variant="h6" color="black">Proveedores</Typography>
                                <Select
                                    value={editPurchase.id_supplier}
                                    onChange={(value) =>
                                        setEditPurchase({
                                            ...editPurchase,
                                            id_supplier: value,
                                        })
                                    }
                                    options={options}
                                />
                            </div>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <div className="flex flex-row gap-2 justify-center">
                                <Button color="red" fullWidth onClick={handleOpen}>
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
                        </CardFooter>
                    </form>
                </Card>
            </Dialog>
        </React.Fragment>
    );
}