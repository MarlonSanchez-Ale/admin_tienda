import React, { useState } from "react";
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

import { RiRotateLockFill } from "react-icons/ri";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { userService } from "@/app/services/user.service";
import { toastService } from "@/app/services/toast.service";
import ToastTP from "../../elements/Toast/Toast";

export default function ResetPassword({ user_name }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfigVisible, setIsConfigVisible] = useState(false);
    const [message, setMessage] = useState({
        tittle: "",
        message: ""
    })
    const [viewMessage, setViewMessage] = useState(false)

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    function toggleConfigVisibility() {
        setIsConfigVisible((prevState) => !prevState);
    }

    const [newPassword, setNewPassword] = useState({
        user_name: user_name ? user_name[0] : "",
        password: "",
        conf_pass: ""
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        return userService.resetPassword(newPassword)
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
                handleCancel();
                //handleOpen();
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

    }

    const handleCancel = async (e) => {
        setNewPassword({
            ...newPassword,
            password: "",
            conf_pass: ""
        })
    }


    return (
        <React.Fragment>


            <Tooltip content="Reestablecer contraseña">
                <IconButton onClick={handleOpen}>
                    <RiRotateLockFill size={20} />
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
                        <Typography variant="h4" color="white">
                            Nueva Contraseña
                        </Typography>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardBody className="flex flex-col gap-4">
                            <div className="relative flex w-full max-w-[24rem]">
                                <Input
                                    type={isPasswordVisible ? "text" : "password"}
                                    size="lg"
                                    label="Password"
                                    required
                                    value={newPassword.password}
                                    onChange={(e) =>
                                        setNewPassword({
                                            ...newPassword,
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
                                    value={newPassword.conf_pass}
                                    onChange={(e) =>
                                        setNewPassword({
                                            ...newPassword,
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
                        </CardBody>
                        <CardFooter className="pt-0">
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
                        </CardFooter>
                    </form>
                </Card>
            </Dialog>
        </React.Fragment >
    );
}