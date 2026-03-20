import axios, { AxiosError, HttpStatusCode } from "axios";

export const urlBackend = import.meta.env.VITE_API_BACKEND
export const urlImagen =`${urlBackend}/imagenPublico`

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
        if (e.status == HttpStatusCode.Forbidden) {
            window.location.href = '/'
        } else {
            return Promise.reject(error);
        }

    }
);
