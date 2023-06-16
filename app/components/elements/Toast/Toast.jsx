import React, { useState, useEffect, forwardRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { toastService, ToastType } from '../../../services/toast.service';
import { Alert, Typography  } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline"

export default ToastTP;

ToastTP.propTypes = {
    id: PropTypes.string,
    fade: PropTypes.bool
};

ToastTP.defaultProps = {
    id: 'default-toast',
    fade: true
};

/*const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});*/

function ToastTP({ id, fade }) {
    const router = useRouter();
    const [toasts, setToasts] = useState([]);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        // Subscripcion al nuevo notificador de toast
        const subscription = toastService.onToast(id)
            .subscribe(toast => {
                // Limpia los toast cuando se recibe un toast vacio
                if (!toast.message) {
                    setToasts(toasts => {
                        // filtra los toasts sin etiqueta 'keepAfterRouteChange' 
                        const filteredToasts = toasts.filter(x => x.keepAfterRouteChange);

                        // establece etiqueta 'keepAfterRouteChange' a false en el resto
                        filteredToasts.forEach(x => delete x.keepAfterRouteChange);
                        return filteredToasts;
                    });
                } else {
                    // add toast to array
                    setToasts(toasts => ([...toasts, toast]));

                    // auto close toast if required
                    if (toast.autoClose) {
                        setTimeout(() => removeToast(toast), 8000);
                    }
                }
            });


        // clear toasts on location change
        const clearToasts = () => {
            setTimeout(() => toastService.clear(id));
        };
        router.events.on('routeChangeStart', clearToasts);

        // clean up function that runs when the component unmounts
        return () => {
            // unsubscribe to avoid memory leaks
            subscription.unsubscribe();
            router.events.off('routeChangeStart', clearToasts);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function removeToast(toast) {
        if (fade) {
            // fade out toast
            const toastWithFade = { ...toast, fade: true };
            setToasts(toasts => toasts.map(x => x === toast ? toastWithFade : x));

            // remove toast after faded out
            setTimeout(() => {
                setToasts(toasts => toasts.filter(x => x !== toastWithFade));
            }, 250);
        } else {
            // remove toast
            setToasts(toasts => toasts.filter(x => x !== toast));
        }
    };

    function bgClass(toast) {
        if (!toast) return;

        const toastTypeClass = {
            [ToastType.Success]: 'blue',
            [ToastType.Error]: 'red',
            [ToastType.Info]: 'amber',
            [ToastType.Warning]: 'amber'
        }

        return toastTypeClass[toast.type];

        setOpen(false);
    }

    if (!toasts.length) return null;


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <>

            {toasts.map((toast, index) =>
                    <Alert color={bgClass(toast)} key={index} onClose={() => removeToast(toast)} >
                        <Typography >{toast.title}</Typography>
                        <span dangerouslySetInnerHTML={{ __html: toast.message }}></span>
                    </Alert>
            )}

        </>
    );
}

