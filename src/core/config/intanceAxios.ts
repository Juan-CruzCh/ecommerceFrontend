import axios from "axios";

export const instanceAxios = axios.create({
    baseURL: "http://localhost:3000/api/"
})


instanceAxios.interceptors.response.use(
    (response) => {

        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
