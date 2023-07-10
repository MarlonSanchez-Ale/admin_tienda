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

import { RiFileUserLine } from "react-icons/ri";
import { userService } from "@/app/services/user.service";
import { toastService } from "@/app/services/toast.service";
import Select from "react-tailwindcss-select";
import PropTypes from "prop-types";


EditProfile.prototype = {
    callback: PropTypes.func.isRequired
}

export default function EditProfile({ id_user, user_name, user_profile, callback }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [profile, setProfile] = useState([])

    const [message, setMessage] = useState({
        tittle: "",
        message: ""
    })

    const [viewMessage, setViewMessage] = useState(false)


    const [editUser, setEditUser] = useState({
        id_user: id_user ? id_user[0] : "",
        user_name: user_name ? user_name : "",
        id_profile: ""
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        return userService.EditProfile(editUser)
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
                callback(id_user)
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

    const handleCancel = async (e) => {
        setEditUser({
            ...editUser,
            id_profile: ""
        })
    }

    return (
        <React.Fragment>
            <Tooltip content="Editar Perfil">
                <IconButton onClick={handleOpen}>
                    <RiFileUserLine size={20} />
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
                            Editar Perfil
                        </Typography>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardBody className="flex flex-col gap-4">
                            <div className="flex flex-col w-full gap-4">
                                <Typography variant="h6" color="black">Perfil actual: {user_profile}</Typography>
                                <Select
                                    value={editUser.id_profile}
                                    onChange={(value) =>
                                        setEditUser({
                                            ...editUser,
                                            id_profile: value,
                                        })
                                    }
                                    options={options}
                                />
                            </div>
                        </CardBody>
                        <CardFooter className="pt-0">
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
                        </CardFooter>
                    </form>
                </Card>
            </Dialog>
        </React.Fragment>
    );
}