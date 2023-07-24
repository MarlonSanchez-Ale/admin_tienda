import { productsService } from "@/app/services/products.service";
import { useState, useEffect } from "react";
import { Details } from "@/app/components/templates/products/detailsProducts";
import loadingGeneral from '@/public/lottie/loadingGeneral.json'
import Lottie from "lottie-react";
import { Fragment } from "react";

export default detailsProducts;

function detailsProducts({ id_products }) {
    const [products, setProducts] = useState(null);

    //ingresar validacion de permisos

    useEffect(() => {
        getDetails(id_products)
    }, []);

    function getDetails(id_products) {
        productsService.details(id_products).then((x) => {
            setProducts(x);
        });
    }
    
    return (
        <Fragment>
            <div className="container flex justify-center">
                {products ? <Details products={products} callback={getDetails} /> :
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
    const { id_products } = params;
    if (!id_products) {
        return {
            notFound: true,
        };
    }

    return {
        props: { id_products },
    };
}