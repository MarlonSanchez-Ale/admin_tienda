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
import { categoryService } from "@/app/services/category.service";
import { toastService } from "@/app/services/toast.service";
import { Fragment } from "react";
import { RiDashboardLine, RiArrowLeftSLine, RiLogoutBoxLine } from "react-icons/ri";

export default function CreateCategory() {

    const router = useRouter()
    const [newCategory, setNewCategory] = useState({
        name: "",
        description: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        //console.log(newUser)

        return categoryService.create(newCategory)
            .then((res) => {
                toastService.success(res.title, res.message, {
                    keepAfterRouteChange: true,
                });
                handleCancel()
                router.push("/categorys");
            })
            .catch((error) => {
                toastService.error(error.title, error.message, { keepAfterRouteChange: true });
                //console.log(error)
            });
    }

    const handleCancel = async (e) => {
        setNewCategory({
            ...newCategory,
            name: "",
            description: ""
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
                            Crear Categoría
                        </Typography>
                        <Typography color="white" className="mt-1 font-normal">
                            Agregar los datos de la categoría
                        </Typography>

                        <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                            <Link href="/categorys/">
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
                            <div className="flex flex-col justify-center gap-4">
                                <Input
                                    type="text"
                                    size="lg"
                                    label="Categoría"
                                    name="category"
                                    value={newCategory.name}
                                    onChange={(e) => {
                                        setNewCategory({
                                            ...newCategory,
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
                                    value={newCategory.description}
                                    onChange={(e) => {
                                        setNewCategory({
                                            ...newCategory,
                                            description: e.target.value,
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