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
import { productsService } from "@/app/services/products.service";
import { categoryService } from "@/app/services/category.service";
import { toastService } from "@/app/services/toast.service";
import { Fragment } from "react";
import { RiDashboardLine, RiArrowLeftSLine, RiLogoutBoxLine } from "react-icons/ri";
import Select from "react-tailwindcss-select";

export default function CreatePointSale() {

    const router = useRouter()
    const [categorias, setCategorias] = useState([]);

    const [create, setCreate] = useState({
        name: "",
        description: "",
        sale_price: 0,
        stock: 0,
        id_category: ""
    });

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


    const handleSubmit = async (e) => {
        e.preventDefault();

        //console.log(create)

        return productsService.create(create)
            .then((res) => {
                toastService.success(res.title, res.message, {
                    keepAfterRouteChange: true,
                });
                handleCancel()
                router.push("/products");
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
            description: "",
            sale_price: 0,
            stock: 0
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
                            Registrar Producto
                        </Typography>
                        <Typography color="white" className="mt-1 font-normal">
                            Agregar los datos del producto
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
                                    label="Descripción"
                                    name="address"
                                    value={create.description}
                                    onChange={(e) => {
                                        setCreate({
                                            ...create,
                                            description: e.target.value,
                                        })
                                    }}
                                    required
                                />
                                <Input
                                    type="number"
                                    size="lg"
                                    label="Precio de Venta"
                                    name="sale_price"
                                    value={create.sale_price}
                                    onChange={(e) => {
                                        setCreate({
                                            ...create,
                                            sale_price: e.target.value,
                                        })
                                    }}
                                    required
                                />
                                <Input
                                    type="number"
                                    size="lg"
                                    label="Inventario"
                                    name="stock"
                                    value={create.stock}
                                    onChange={(e) => {
                                        setCreate({
                                            ...create,
                                            stock: e.target.value,
                                        })
                                    }}
                                    required
                                />
                            </div>

                            <div className="flex flex-col w-full gap-4">
                                <Typography variant="h6" color="black">Seleccionar la catergoría del producto</Typography>
                                <Select
                                    value={create.id_category}
                                    onChange={(value) =>
                                        setCreate({
                                            ...create,
                                            id_category: value,
                                        })
                                    }
                                    required
                                    options={options}
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