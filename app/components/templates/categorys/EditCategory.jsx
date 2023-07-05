import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { categoryService } from "@/app/services/category.service";
import { toastService } from "@/app/services/toast.service";
import { Fragment } from "react";
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

EditCategory.prototype = {
    callback: PropTypes.func.isRequired
}

export default function EditCategory({ id_category, name, description, callback }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    const [message, setMessage] = useState({
        tittle: "",
        message: ""
    })
    const [viewMessage, setViewMessage] = useState(false)

    const [editCategory, setEditCategory] = useState({
        id_category: id_category ? id_category : "",
        name: name ? name : "",
        description: description ? description : "",
    });

 

    const handleSubmit = async (e) => {
        e.preventDefault();

        return categoryService.edit(editCategory)
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
            <Tooltip content="Editar Categoría">
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
                            Crear Categoría
                        </Typography>
                        <Typography color="white" className="mt-1 font-normal">
                            Agregar los datos de la categoría
                        </Typography>
                    </CardHeader>
                    <CardBody >
                        <form className="my-5 gap-3" onSubmit={handleSubmit}>
                            <div className="flex flex-col justify-center gap-4">
                                <Input
                                    type="text"
                                    size="lg"
                                    label="Categoría"
                                    name="category"
                                    defaultValue={editCategory.name}
                                    onChange={(e) => {
                                        setEditCategory({
                                            ...editCategory,
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
                                    defaultValue={editCategory.description}
                                    onChange={(e) => {
                                        setEditCategory({
                                            ...editCategory,
                                            description: e.target.value,
                                        })
                                    }}
                                    required
                                />

                            </div>

                            <Button variant="gradient" type="submit" fullWidth>
                                Guardar
                            </Button>

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