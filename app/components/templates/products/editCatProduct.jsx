import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    IconButton,
    Tooltip
} from "@material-tailwind/react";

import { RiEditBoxLine } from "react-icons/ri";
import { productsService } from "@/app/services/products.service";
import { categoryService } from "@/app/services/category.service";
import { toastService } from "@/app/services/toast.service";
import Select from "react-tailwindcss-select";
import PropTypes from "prop-types";


EditCatProduct.prototype = {
    callback: PropTypes.func.isRequired
}

export default function EditCatProduct({ id_products, id_category, categoria, callback }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [categorias, setCategorias] = useState([]);


    const [message, setMessage] = useState({
        tittle: "",
        message: ""
    })

    const [viewMessage, setViewMessage] = useState(false)


    const [editProduct, setEditProduct] = useState({
        id_products: id_products ? id_products : "",
        id_category: id_category ? id_category : "",
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        return productsService.editCatProduct(editProduct)
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
                handleCancel();
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
        categoryService.get()
            .then(u => {
                if (isMounted) {
                    //console.log(u)
                    setCategorias(u.category)

                }
            }).catch((err) => {
                if (isMounted) {
                    setCategorias([]);
                    toastService.warn(err.message);
                }

            });
        return () => {
            isMounted = false;
        };
    }, []);

    categorias.map((a) => {
        options.push(({
            value: a.ID_CATEGORIA,
            label: a.CATEGORIA
        }))
    })



    const handleCancel = async (e) => {
        setEditProduct({
            ...editProduct,
            id_category: ""
        })
    }

    return (
        <React.Fragment>
            <Tooltip content="Editar Categoría">
                <IconButton onClick={handleOpen}>
                    <RiEditBoxLine size={20} />
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
                            Editar Categoría de Producto
                        </Typography>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardBody className="flex flex-col gap-4">
                            <div className="flex flex-col w-full gap-4">
                                <Typography variant="h6" color="black">Categoría actual: {categoria}</Typography>
                                <Select
                                    value={editProduct.id_category}
                                    onChange={(value) =>
                                        setEditProduct({
                                            ...editProduct,
                                            id_category: value,
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