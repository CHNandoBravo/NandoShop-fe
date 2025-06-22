import { AuthInterfaces } from "@/interfaces/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { PathsApi } from "../pathsApi";

export async function myProducts() {
    const url = PathsApi.getFullPath(PathsApi.Endpoints.my_products);
    const token = localStorage.getItem("jwt");
    const config = {
        headers: {
            Authorization: token ? `Bearer ${token}` : ""
        }
    };
    return axios.get(url, config)
        .then(response => response)
        .catch(error => {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        toast.error("Email y/o contraseña incorrectos.");
                        break;
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
