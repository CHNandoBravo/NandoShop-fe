import axios from "axios";
import { PathsApi } from "../pathsApi";
import { toast } from "react-toastify";

export interface CreatePreferenceRequest {
    idProduct: number;
    quantity: number;
}

export interface CreatePreferenceResponse {
    preferenceId: string;
    initPoint: string;
}

export async function createPreference(data: CreatePreferenceRequest): Promise<CreatePreferenceResponse> {
    const url = PathsApi.getFullPath(PathsApi.Endpoints.createPreference);
    const token = localStorage.getItem("jwt");

    const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

    try {
        const response = await axios.post<CreatePreferenceResponse>(url, data);
        toast.success("Preferencia de pago creada con éxito.");
        return response.data;
    } catch (error: any) {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    toast.error("Sesión expirada. Iniciá sesión nuevamente.");
                    break;
                case 500:
                    toast.error("Error del servidor. Inténtalo más tarde.");
                    break;
                default:
                    toast.error(error.response.data.message || "Error inesperado.");
            }
        } else if (error.request) {
            toast.error("No se recibió respuesta del servidor. Verificá tu conexión.");
        } else {
            toast.error(`Error: ${error.message || "Error desconocido"}`);
        }
        throw error;
    }
}