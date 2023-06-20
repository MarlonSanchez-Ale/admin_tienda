import React, { useState, useEffect, forwardRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { toastService, ToastType } from '../../../services/toast.service';
import { Alert, Typography, Collapse, Card, CardBody, CardHeader } from "@material-tailwind/react";
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
    const toggleOpen = () => setOpen(cur => !cur);

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

                <Collapse open={open}>
                    <Card className="my-4 mx-auto w-8/12" color={bgClass(toast)}>
                        <CardBody>
                            <div className='flex flex-row justify-center gap-5'>
                                <div>
                                    <InformationCircleIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <Typography variant="h5" color="white" className="mb-2">
                                        {toast.title}
                                    </Typography>
                                    <span dangerouslySetInnerHTML={{ __html: toast.message }}></span>
                                </div>
                            </div>

                            
                        </CardBody>
                    </Card>
                </Collapse>
            )}

        </>
    );
}

/*

<div
      class="mx-2 sm:mx-auto max-w-sm  flex flex-row items-center justify-between bg-blue-200 p-3 text-sm leading-none font-medium rounded-xl whitespace-no-wrap">
      <div class="inline-flex items-center text-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd" />
        </svg>
        This is an info message!
      </div>
      <div class="text-blue-700 cursor-pointer hover:text-blue-800">
        Action(3s)
      </div>
    </div>


     <Alert 
                color={bgClass(toast)} 
                key={index}
                 animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 },
                }} 
                icon={
                    <InformationCircleIcon className="h-6 w-6" />
                  }
                onClose={() => removeToast(toast)} >
                    <Typography >{toast.title}</Typography>
                    <span dangerouslySetInnerHTML={{ __html: toast.message }}></span>
                </Alert>

*/