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
import { toastService } from "@/app/services/toast.service";
import PropTypes from "prop-types";

EditProduct.prototype = {
    callback: PropTypes.func.isRequired,
    id_products: PropTypes.string.isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    sale_price: PropTypes.number.isRequired
}

export default function EditProduct({ id_products, image, name, description, sale_price, callback }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [profile, setProfile] = useState([])
    const [message, setMessage] = useState({
        tittle: "",
        message: ""
    })
    const [viewMessage, setViewMessage] = useState(false)


    const arr = name ? name[0]?.split(' ') : "";



    const [editProduct, setEditProduct] = useState({
        id_products: id_products ? id_products : "",
        image: image ? image : "",
        name: name ? name: "",
        description: description ? description : "",
        sale_price: sale_price ? sale_price : "",
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        return productsService.edit(editProduct)
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
            <Tooltip content="Editar Producto">
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
                            Editar Producto
                        </Typography>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardBody className="flex flex-col gap-4">

                            <Input
                                type="text"
                                size="lg"
                                label="Nombre de Producto"
                                name="name"
                                value={editProduct.name}
                                onChange={(e) => {
                                    setEditProduct({
                                        ...editProduct,
                                        name: e.target.value,
                                    })
                                }}
                                required
                            />

                            <Input
                                type="text"
                                size="lg"
                                label="Descripción"
                                name="description"
                                defaultValue={editProduct.description}
                                onChange={(e) => {
                                    setEditProduct({
                                        ...editProduct,
                                        name: e.target.value,
                                    })
                                }}
                                required
                            />

                            <Input
                                type="number"
                                size="lg"
                                label="Precio de Venta"
                                name="sale_price"
                                defaultValue={editProduct.sale_price}
                                onChange={(e) => {
                                    setEditProduct({
                                        ...editProduct,
                                        sale_price: e.target.value,
                                    })
                                }}
                                required
                            />
                           


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