import { Fragment, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Tooltip,
    IconButton
} from "@material-tailwind/react";
import Link from "next/link";
import { BellIcon } from "@heroicons/react/24/solid";
import { RiEraserLine } from "react-icons/ri";
import PropTypes from "prop-types";

DisableButton.propTypes = {
    callbackDelete: PropTypes.func.isRequired,
};

export default function DisableButton({ callbackDelete }) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpen = () => setOpen(!open);

    const onClickDelete = async () => {
        setOpen(false);
        setIsSubmitting(true);
        await callbackDelete();
        setIsSubmitting(false);
        return;
    };

    return (
        <Fragment>
            <Tooltip content="Desactivar">
                <Link href="">
                    <IconButton variant="outlined" onClick={handleOpen}>
                        <RiEraserLine size={20} />
                    </IconButton>
                </Link>
            </Tooltip>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>
                    <Typography variant="h5" color="blue-gray">
                        Confirmación de Operación
                    </Typography>
                </DialogHeader>
                <DialogBody divider className="grid place-items-center gap-4">
                    <BellIcon className="h-16 w-16 text-red-500" />
                    <Typography color="red" variant="h4">
                        Está seguro de desactivar este registro?
                    </Typography>
                    <Typography className="text-center font-normal">
                        Al desactivar el registro no podrá acceder a su información, ni realizar ningún tipo de operación con este registro.
                    </Typography>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="blue-gray" onClick={handleOpen}>
                        Cancelar
                    </Button>
                    <Button variant="gradient" onClick={onClickDelete}>
                        Desactivar
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    );
}