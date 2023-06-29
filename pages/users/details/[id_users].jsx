import { userService } from "@/app/services/user.service";
import { useState, useEffect } from "react";
import { Details } from "@/app/components/templates/users/details";
import loadingGeneral from '@/public/lottie/loadingGeneral.json'
import Lottie from "lottie-react";
import { Fragment } from "react";
export default detailsUser;

function detailsUser({ id_users }) {
    const [user, setUser] = useState(null);

    //ingresar validacion de permisos

    useEffect(() => {
        getDetails(id_users)
    }, []);

    function getDetails(id_users) {
        userService.getUserById(id_users).then((x) => {
            setUser(x);
            //console.log(x)
        });
    }
    
    return (
        <Fragment>
            <div className="container flex justify-center">
                {user ? <Details user={user} callback={getDetails} /> :
                    <Lottie animationData={loadingGeneral} loop={true} />
                }
            </div>
        </Fragment>
    )
}

export async function getServerSideProps({ params }) {
    /* Esta funcion es propia del framework nextjs
    Se ejecuta en el servidor y lo que hacemos es capturar los 
    parametros para injectarlo en las propiedades del componente
    de este archivo por lo que le pasamos el id_user, que
    va en la url. */
    const { id_users } = params;
    if (!id_users) {
        return {
            notFound: true,
        };
    }

    return {
        props: { id_users },
    };
}