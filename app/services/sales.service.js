import { fetchWrapper } from "../helpers/fetch-wrapper";

const baseUrl = `/api/sales`;

export const salesService = {
    get,
    create,
    edit,
    disable,
    details,
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


function details(id) {
    return fetchWrapper.get(`${baseUrl}/details/${id}`);
}


function disable(id) {
    return fetchWrapper.put(`${baseUrl}/disable/${id}`);
}

