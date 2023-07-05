import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Tooltip,
    Alert,
    IconButton
} from "@material-tailwind/react";
import { BsPersonCircle } from 'react-icons/bs'
import Link from "next/link";
import { useRouter } from 'next/router';
import { userService } from "@/app/services/user.service";
import { toastService } from "@/app/services/toast.service";
import Select from "react-tailwindcss-select";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { RiLogoutBoxLine } from "react-icons/ri";

import { Fragment } from "react";


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

    const [profile, setProfile] = useState([])
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfigVisible, setIsConfigVisible] = useState(false);
  


    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    function toggleConfigVisibility() {
        setIsConfigVisible((prevState) => !prevState);
    }

    const router = useRouter()
    const passwordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

    const [newUser, setNewUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: 0,
        password: "",
        conf_pass: "",
        id_profile: ""
    });


    const options = [];

    useEffect(() => {
        let isMounted = true;
        userService.getProfiles()
            .then(u => {
                if (isMounted) {
                    //console.log(u)
                    setProfile(u.dataProfiles)

                }
            }).catch((err) => {
                if (isMounted) {
                    setProfile([]);
                    toastService.warn(err.message);
                }

            });
        return () => {
            isMounted = false;
        };
    }, []);

    profile.map((a) => {
        options.push(({
            value: a.id_profile,
            label: a.profile
        }))
    })


    const handleSubmit = async (e) => {
        e.preventDefault();

        //console.log(newUser)

        return userService.register(newUser)
            .then((res) => {
                toastService.success(res.title, res.message, {
                    keepAfterRouteChange: true,
                });
                handleCancel()
                router.push("/users");
            })
            .catch((error) => {
                toastService.error(error.title, error.message, { keepAfterRouteChange: true });
                //console.log(error)
            });
    }

    const handleCancel = async (e) => {
        setNewUser({
            ...newUser,
            firstname: "",
            lastname: "",
            email: "",
            phone: 0,
            password: "",
            conf_pass: "",
            id_profile: ""
        })
    }





    //console.log(idProfile.value)

    return (
        <Fragment>
            <div className="container flex justify-center">
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

                        <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                            <Link href="/users/">
                                <Tooltip content="ir a lista">
                                    <IconButton>
                                        <RiLogoutBoxLine size={20} />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardBody className="flex justify-center">

                        <form className="mt-5 mb-2 " onSubmit={handleSubmit}>
                            <div className="my-4 flex flex-row gap-3 justify-center">
                                <Input
                                    type="text"
                                    size="lg"
                                    label="Primer Nombre"
                                    name="firstname"
                                    value={newUser.firstname}
                                    onChange={(e) => {
                                        setNewUser({
                                            ...newUser,
                                            firstname: e.target.value,
                                        })
                                    }}
                                    required
                                />
                                <Input
                                    type="text"
                                    size="lg"
                                    label="Primer Apellido"
                                    name="lastname"
                                    value={newUser.lastname}
                                    onChange={(e) => {
                                        setNewUser({
                                            ...newUser,
                                            lastname: e.target.value,
                                        })
                                    }}
                                    required
                                />
                            </div>

                            <div className="my-4 flex flex-row gap-3 justify-center">
                                <Input
                                    type="email"
                                    size="lg"
                                    label="Email"
                                    name="email"
                                    value={newUser.email}
                                    onChange={(e) => {
                                        setNewUser({
                                            ...newUser,
                                            email: e.target.value,
                                        })
                                    }}
                                    required
                                />
                                <Input
                                    type="number"
                                    size="lg"
                                    label="Teléfono"
                                    name="email"
                                    value={newUser.phone}
                                    onChange={(e) => {
                                        setNewUser({
                                            ...newUser,
                                            phone: e.target.value,
                                        })
                                    }}
                                    required
                                />

                            </div>


                            <div className="my-4 flex flex-row gap-4 justify-center">

                                <div className="relative flex w-full max-w-[24rem]">
                                    <Input
                                        type={isPasswordVisible ? "text" : "password"}
                                        size="lg"
                                        label="Password"
                                        required
                                        value={newUser.password}
                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                password: e.target.value,
                                            })
                                        }
                                        containerProps={{
                                            className: "min-w-0",
                                        }}
                                    />

                                    <IconButton
                                        variant="text"
                                        className="!absolute right-1 top-1 rounded"
                                        onClick={togglePasswordVisibility}>
                                        {isPasswordVisible ? (
                                            <BsFillEyeSlashFill size={20} />
                                        ) : (<BsFillEyeFill size={20} />)}
                                    </IconButton>
                                </div>

                                <div className="relative flex w-full max-w-[24rem]">
                                    <Input
                                        type={isConfigVisible ? "text" : "password"}
                                        size="lg"
                                        label="Confirmación"
                                        required
                                        value={newUser.conf_pass}
                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                conf_pass: e.target.value,
                                            })
                                        }
                                        containerProps={{
                                            className: "min-w-0",
                                        }}
                                    />
                                    <IconButton
                                        variant="text"
                                        className="!absolute right-1 top-1 rounded"
                                        onClick={toggleConfigVisibility}>
                                        {isConfigVisible ? (
                                            <BsFillEyeSlashFill size={20} />
                                        ) : (<BsFillEyeFill size={20} />)}
                                    </IconButton>
                                </div>


                            </div>


                            <div className="flex flex-col w-full gap-4">
                                <Typography variant="h6" color="black">Seleccionar Perfile del usuario</Typography>
                                <Select
                                    value={newUser.id_profile}
                                    onChange={(value) =>
                                        setNewUser({
                                            ...newUser,
                                            id_profile: value,
                                        })
                                    }
                                    required
                                    options={options}
                                />
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

        </Fragment >

    );
}


/*
<Typography variant="small" color="gray" className="flex items-center gap-2 font-normal mt-5">
                                    <InformationCircleIcon className="w-4 h-4 -mt-px" />
                                    La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.
                                </Typography>
*/

