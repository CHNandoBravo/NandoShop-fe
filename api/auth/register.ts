import { AuthInterfaces } from "@/interfaces/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { PathsApi } from "../pathsApi";

export async function register(data: AuthInterfaces.RegisterInterface) {
    const url = PathsApi.getFullPath(PathsApi.Endpoints.register);

    return axios.post(url, data)
        .then(response => response)
        .catch(error => {
            if (error.response) {
                switch (error.response.status) {
                    case 500:
                        toast.error("Error del servidor. Inténtalo de nuevo más tarde.");
                        break;
                    default:
                        toast.error(error.response.data.message || "Ha ocurrido un error inesperado.");
                }
            } else if (error.request) {
                toast.error("No se recibió respuesta del servidor. Verifica tu conexión.");
            } else {
                toast.error(`Error: ${error.message || "Error desconocido"}`);
            }
            throw error; // Lanza el error para que `useAsync` lo maneje
        });
}
