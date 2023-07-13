import { fetchWrapper } from "../helpers/fetch-wrapper";

const baseUrl = `/api/points_sales`;

export const pointSalesService = {
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
    return fetchWrapper.post(`${baseUrl}/register`, data)
}

function edit(data) {
    return fetchWrapper.put(`${baseUrl}/edit`, data);
  }

  function disable(id_supplier) {
    return fetchWrapper.put(`${baseUrl}/disable/${id_supplier}`);
  }