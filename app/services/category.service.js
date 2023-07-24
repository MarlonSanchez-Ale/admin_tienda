import { fetchWrapper } from "../helpers/fetch-wrapper";

const baseUrl = `/api/categorys`;

export const categoryService = {
    getCategorys,
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

function create(category) {
    return fetchWrapper.post(`${baseUrl}/create`, category)
}

function edit(data) {
    return fetchWrapper.put(`${baseUrl}/edit`, data);
  }

  function disable(id_category) {
    return fetchWrapper.put(`${baseUrl}/disable/${id_category}`);
  }

  function getCategorys(){
    return fetchWrapper.get(`${baseUrl}`);
  }