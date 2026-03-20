import axios, { AxiosError } from "axios";

export const urlBackend = import.meta.env.VITE_API_BACKEND

export const instanceAxios = axios.create({
    baseURL: `${urlBackend}/api/`,
    headers: {
        "Content-Type": "application/json",

    },
    withCredentials: true,
})


instanceAxios.interceptors.response.use(
    (response) => {

        return response;
    },
    (error) => {

        const e = error as AxiosError<any>
        console.log(e);


        return Promise.reject(error);
    }
);
