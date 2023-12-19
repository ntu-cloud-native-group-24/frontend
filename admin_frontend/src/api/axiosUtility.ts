import api from "./axiosClient";

export const setToken = (token: string) => {
    api.defaults.headers.common['x-api-key'] = token;
}