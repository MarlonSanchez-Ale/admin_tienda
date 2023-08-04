import { fetchWrapper } from "../helpers/fetch-wrapper";

const baseUrl = `/api/products`;

export const productsService = {
    get,
    create,
    edit,
    editCatProduct,
    disable,
    details,
    getPurchase,
    registerPurchase,
    editPurchase
}

function get(filters = {}) {
    return fetchWrapper.get(
        `${baseUrl}?filters=${encodeURIComponent(JSON.stringify(filters))}`
    );
}

function create(data) {
    return fetchWrapper.post(`${baseUrl}/register`, data)
}

function edit(data) {
    return fetchWrapper.put(`${baseUrl}/edit`, data);
}

function editCatProduct(data) {
    return fetchWrapper.put(`${baseUrl}/EditCatProduct`, data);
}

function details(id_products) {
    return fetchWrapper.get(`${baseUrl}/details/${id_products}`);
}


function disable(id) {
    return fetchWrapper.put(`${baseUrl}/disable/${id}`);
}

function getPurchase(id) {
    return fetchWrapper.get(`${baseUrl}/purchase/list/${id}`);
}

function registerPurchase(data) {
    return fetchWrapper.post(`${baseUrl}/purchase/register`, data);
    
}

function editPurchase(data) {
    return fetchWrapper.put(`${baseUrl}/purchase/edit`, data)
}