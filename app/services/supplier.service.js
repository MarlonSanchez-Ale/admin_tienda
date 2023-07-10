import { fetchWrapper } from "../helpers/fetch-wrapper";

const baseUrl = `/api/supplier`;

export const supplierService = {
    get,
    create,
    edit,
    disable
}

function get(filters = {}) {
    return fetchWrapper.get(
        `${baseUrl}?filters=${encodeURIComponent(JSON.stringify(filters))}`
    );
}

function create(data) {
    return fetchWrapper.post(`${baseUrl}/create`, data)
}

function edit(data) {
    return fetchWrapper.put(`${baseUrl}/edit`, data);
  }

  function disable(id_supplier) {
    return fetchWrapper.put(`${baseUrl}/disable/${id_supplier}`);
  }