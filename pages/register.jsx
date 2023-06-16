import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Checkbox,

} from "@material-tailwind/react";
import { BsPersonCircle } from 'react-icons/bs'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Link from "next/link";
import { useRouter } from 'next/router';
import { InformationCircleIcon } from "@heroicons/react/24/solid"

import { Fragment } from "react";

const schema = yup.object({
    userName: yup.string().required(),
    password: yup.string().required(),
}).required();


function Copyright(props) {
    return (
        <Typography variant="paragraph" color="blue"  {...props}>
            {'Copyright ©admin_tienda '}
            <Link color="inherit" href="">
                developed by Marlon Sánchez
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Register() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const router = useRouter()


    const onSubmit = async (data) => {
        //console.log(data)

        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }

        await fetch('http://localhost:3000/api/users/register', options)
            .then(res => res.json())
            .then(data => {
                //if (data) router.push('/login')
                console.log(data)
            })

    }


    return (
        <Fragment>

            <div className="container mx-auto my-10 flex justify-center">
                <Card className="w-full max-w-[40rem]">
                    <CardHeader
                        color="blue"
                        floated={false}
                        shadow={false}
                        className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                    >
                        <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
                            <BsPersonCircle size={50} />
                        </div>
                        <Typography variant="h4" color="white">
                            Registro de Usuario
                        </Typography>
                        <Typography color="white" className="mt-1 font-normal">
                            Agrega tus datos e ingresa
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex justify-center">

                        <form className="mt-5 mb-2 " onSubmit={handleSubmit(onSubmit)}>
                            <div className="my-4 flex flex-col gap-4 justify-center w-full">
                                <Input size="lg" type="text" label="Nombre Completo" name="name" {...register("name")} />
                                <p>{errors.name?.message}</p>

                            </div>
                            <div className="my-4 flex flex-col gap-4 justify-center w-full">
                                <Input size="lg" type="text" label="Nombre de Usuario" name="name" {...register("userName")} />
                                <p>{errors.userName?.message}</p>

                            </div>
                            <div className="my-4 flex flex-row gap-3 justify-center">
                                <Input type="text" size="lg" label="Email" name="email" {...register("email")} />
                                <Input type="number" size="lg" label="Teléfono" name="email" {...register("phone")} />

                            </div>
                            <div className="my-4 flex flex-row gap-4 justify-center">
                                <p>{errors.password?.message}</p>
                                <p>{errors.password?.message}</p>
                            </div>

                            <div className="my-4 flex flex-row gap-4 justify-center">
                                <Input type="password" size="lg" label="Contraseña" name="email" {...register("password")} />
                                <Input type="password" size="lg" label="Confirmación" name="configpass" {...register("configpass")} />
                            </div>

                            <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-1">
                                <InformationCircleIcon className="w-4 h-4 -mt-px" />
                                La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.
                            </Typography>

                            <div className="my-4 flex flex-row gap-4 justify-center">
                                <p>{errors.password?.message}</p>

                                <p>{errors.password?.message}</p>
                            </div>

                            <Button type="submit" className="mt-6" fullWidth >
                                Registrar
                            </Button>
                            <Typography color="gray" className="mt-4 text-center font-normal">
                                Ya tienes una cuenta?{" "}
                                <Link href="/login" variant="body2" className="font-medium text-blue-500 transition-colors hover:text-blue-700">
                                    {"Ingresar"}
                                </Link>
                            </Typography>
                        </form>
                    </CardBody>

                </Card>
            </div>
            <div className="container mx-auto my-10 flex justify-center">
                <Copyright sx={{ mt: 5 }} />
            </div>
        </Fragment>

    );
}


