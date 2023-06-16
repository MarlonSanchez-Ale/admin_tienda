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
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router';
import { InformationCircleIcon } from "@heroicons/react/24/solid"
import { Fragment } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { userService } from "../app/services/user.service";
import { useState, useEffect } from "react";
import { toastService } from "@/app/services/toast.service";


export default function Login() {
    const router = useRouter();

    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push("/");
        }
    });

    const [credentials, setCredentials] = useState({
        userName: "",
        password: "",
        sessionActive: false
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        return userService.login(credentials)
            .then((res) => {
                // get return url from query parameters or default to '/'
                toastService.success(res.title, res.message, {
                    keepAfterRouteChange: true,
                });
                const returnUrl = router.query.returnUrl || '/';
                //console.log(returnUrl)
                router.push(returnUrl);
            })
            .catch(error => {
                toastService.error(error.title, error.message, { keepAfterRouteChange: true });
            });

    };

    return (
        <Fragment>

            <div className="container mx-auto my-10 flex justify-center">
                <Card className="w-full max-w-[30rem]">
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
                            Autenticación de Usuario
                        </Typography>
                        <Typography color="white" className="mt-1 font-normal">
                            Por favor ingresar sus credenciales
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex justify-center">

                        <form className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96 " onSubmit={handleSubmit}>
                            <div className="mb-4 flex flex-col gap-6 justify-center">
                                <Input
                                    size="lg"
                                    type="text"
                                    label="Nombre de usuario"
                                    onChange={(e) =>
                                        setCredentials({
                                            ...credentials,
                                            userName: e.target.value,
                                        })
                                    } />


                                <div className="relative flex w-full max-w-[24rem]">
                                    <Input
                                        type={isPasswordVisible ? "text" : "password"}
                                        size="lg"
                                        label="Password"
                                        onChange={(e) =>
                                            setCredentials({
                                                ...credentials,
                                                password: e.target.value,
                                            })
                                        }
                                        containerProps={{
                                            className: "min-w-0",
                                        }}
                                    />
                                    <Button
                                        size="sm"
                                        className="!absolute right-1 top-1 rounded"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {isPasswordVisible ? (
                                            <BsFillEyeSlashFill size={20} />
                                        ) : (<BsFillEyeFill size={20} />)}
                                    </Button>
                                </div>


                            </div>

                            <Checkbox label="Remember Me"
                                onClick={(e) => {
                                    setCredentials({
                                        ...credentials,
                                        sessionActive: e.target.checked,
                                    })
                                }} />

                            <Button type="submit" className="mt-6" fullWidth >
                                Ingresar
                            </Button>
                            <Typography color="gray" className="mt-4 text-center font-normal">
                                No tienes cuenta?{" "}
                                <Link href="/register" variant="body2" className="font-medium text-blue-500 transition-colors hover:text-blue-700">
                                    {"Registrate"}
                                </Link>

                            </Typography>
                        </form>
                    </CardBody>

                </Card>
            </div>
        </Fragment>

    );
}


