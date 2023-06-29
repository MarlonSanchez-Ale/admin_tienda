import { userService } from "@/app/services/user.service";
import Link from "next/link";
const moment = require("moment");
import { Fragment } from "react";

//import ResetPassword from "./ResetPassword";
//import EditProfile from "./EditProfile";
import { useHasPermissionStatus } from "@/app/hook/useHasPermissionStatus";

import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Input,
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Tooltip,
    IconButton
} from "@material-tailwind/react";
import { RiAccountPinCircleFill, RiLogoutBoxLine, RiPencilFill, RiRefreshLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { RiKey2Fill } from "react-icons/ri";
import ResetPassword from "./ResetPassword";
import EditUser from "./editUser";
import ToastTP from "../../elements/Toast/Toast";
import EditProfile from "./EditProfile";



export { Details }

function Details(props) {
    const user = props?.user?.usuario;
    const functionCallback = props?.callback;

    const user_details = user.dataUser;
    const profile_details = user.dataProfile;

    const hasPermissionUpdateUsers = useHasPermissionStatus("Editar Usuario")
    const [profile, setProfile] = useState([])


    const user_name = user_details.map((u) => {
        return u.user_name
    })

    const name = user_details.map((u) => {
        return u.name
    })

    const email = user_details.map((a) => {
        return a.email
    })

    const phone = user_details.map((a) => {
        return a.phone
    })

    const user_profile = user_details.map((m) => {
        return m.profile
    })

    const user_id = user_details.map((u) => {
        return u.id_users
    })

    const id_profile = user_details.map((u) => {
        return u.id_profile
    })


    if (!user) return null

    const [open, setOpen] = useState(1);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };


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
                            <RiAccountPinCircleFill size={50} />
                        </div>
                        <Typography variant="h4" color="white">
                            {user_name}
                        </Typography>
                        <Typography variant="h4" color="white">
                            Detalle de Usuario
                        </Typography>
                        <Typography color="white" className="mt-1 font-normal">
                            Información del usuario y perfil.
                        </Typography>

                        <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                            <Link href="/users/">
                                <Tooltip content="Regresar a lista">
                                    <IconButton>
                                        <RiLogoutBoxLine size={20} />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                            {hasPermissionUpdateUsers && (
                                <>
                                    <EditUser id_user={user_id} user_name={user_name} name={name} email={email} phone={phone} user_profile={user_profile} callback={functionCallback} />
                                    <EditProfile id_user={user_id} user_profile={user_profile} callback={functionCallback} />
                                    <ResetPassword user_name={user_name} />
                                </>
                            )}

                        </div>
                    </CardHeader>
                    <CardBody className="flex justify-center flex-col gap-4">


                        {user_details.map(({ name, email, phone }, index) => (
                            <form className="mt-5 mb-2" key={index}>
                                <div className="my-4 flex flex-col justify-center">
                                    <Input
                                        type="text"
                                        size="lg"
                                        label="Nombre Completo"
                                        name="firstname"
                                        value={name}
                                        readOnly
                                    />

                                </div>

                                <div className="my-4 flex flex-row gap-3 justify-center">
                                    <Input
                                        type="email"
                                        size="lg"
                                        label="Email"
                                        name="email"
                                        value={email}
                                        readOnly
                                    />
                                    <Input
                                        type="number"
                                        size="lg"
                                        label="Teléfono"
                                        name="phone"
                                        value={phone}
                                        readOnly
                                    />

                                </div>
                            </form>

                        ))}

                        <Accordion
                            open={open === 1}
                            className="border border-blue-gray-200 px-4 rounded-lg mb-2"
                        >
                            <AccordionHeader
                                onClick={() => handleOpen(1)}
                                className="text-gray-600"
                            >
                                {user_profile}
                            </AccordionHeader>
                            <AccordionBody className="text-base font-normal pt-0">
                                <List className="overflow-auto max-h-[20rem] mt-5">
                                    {profile_details.map(({ permission, de_permission }, index) => (
                                        <ListItem key={index}>
                                            <ListItemPrefix>
                                                <RiKey2Fill size={30} />
                                            </ListItemPrefix>
                                            <div>
                                                <Typography variant="h6" color="blue-gray">
                                                    {permission}
                                                </Typography>
                                                <Typography variant="small" color="gray" className="font-normal">
                                                    {de_permission}
                                                </Typography>
                                            </div>
                                        </ListItem>
                                    ))}
                                </List>
                            </AccordionBody>
                        </Accordion>
                    </CardBody>
                </Card>
            </div>

        </Fragment >
    )
}

/*

<React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper sx={{ bgcolor: 'white', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} >
                        <Typography component="h3" variant="h4" >
                            Detalle de Usuario
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={3}
                        >
                            <Typography variant="body1" gutterBottom mt={1}>
                                Información de usuario, perfil y permisos
                            </Typography>
                            <Tooltip title="Lista de Usuarios">
                                <IconButton color="black"
                                    aria-label="directions"
                                    href='/accounts/'
                                >
                                    <ListIcon />
                                </IconButton>
                            </Tooltip>

                            {hasPermissionUpdateUsers && (
                                <ResetPassword user_name={user_name} />

                            )}

                            {hasPermissionUpdateUsers && (
                                <EditProfile user_id={user_id} />
                            )}
                        </Stack>

                        <Divider sx={{ my: 2 }} />


                        {user_details.map((ud) => (
                            <Stack
                                direction="row"
                                spacing={10}
                                key={ud.userId}
                            >
                                <TextField
                                    label="Nombre de Usuario"
                                    defaultValue={ud.userName}
                                    variant="filled"
                                />
                                <TextField
                                    label="Estado de usuario"
                                    defaultValue={ud.userStatus}
                                    variant="filled"
                                />
                            </Stack>
                        ))}
                        {user_details && !user_details.length && (
                            <Stack sx={{ width: '100%', color: 'grey.500', padding: 5 }} spacing={2}>
                                <Alert severity="warning">Lo sentimos, pero no hay detalles del usuario para mostrar.</Alert>
                            </Stack>
                        )}

                        <Divider sx={{ my: 2 }} />

                        <Grid item xs={12} md={6}>
                            {user_details.map((ud) => (
                                <div key={ud.userId}>
                                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                                        Perfil de {ud.PROFILE}
                                    </Typography>
                                </div>

                            ))}
                            <Demo>
                                <List dense={dense}
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader">
                                            Listado de Permisos
                                        </ListSubheader>
                                    }
                                    sx={{
                                        width: '100%',
                                        bgcolor: 'background.paper',
                                        position: 'relative',
                                        overflow: 'auto',
                                        maxHeight: 300,
                                        '& ul': { padding: 0 },
                                    }}>
                                    {profile_details.map((pd) => (
                                        <ListItem key={pd.ID_PERMISSION}>
                                            <ListItemIcon>
                                                <LibraryAddCheckIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={pd.PERMISSION}
                                                secondary={pd.DE_PERMISSION}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Demo>
                        </Grid>
                    </Paper>
                </Container>
            </React.Fragment>
 */