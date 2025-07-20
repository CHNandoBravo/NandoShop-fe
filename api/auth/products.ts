import { AuthInterfaces } from "@/interfaces/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { PathsApi } from "../pathsApi";
import { ProductsInterfaces } from "@/interfaces/products";

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

export async function createProduct(data: FormData) {
    const url = PathsApi.getFullPath(PathsApi.Endpoints.createProduct);
    const token = localStorage.getItem("jwt");
    const config = {
        headers: {
            Authorization: token ? `Bearer ${token}` : ""
        }
    };
    
    return axios.post(url, data, config)
        .then(response => {
            toast.success("Producto creado con éxito."); 
            return response;
        })
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

export async function deleteProduct(id: Number) {
    const url = PathsApi.getFullPath(PathsApi.Endpoints.createProduct+"/"+id);
    const token = localStorage.getItem("jwt");
    const config = {
        headers: {
            Authorization: token ? `Bearer ${token}` : ""
        }
    };
    return axios.delete(url, config)
        .then(response => {
            toast.success("Producto eliminado con éxito."); 
            return response;
        })
        .catch(error => {
            if (error.response) {
                switch (error.response.status) {
                    default:
                        toast.error(error.response.data.message || "Ha ocurrido un error inesperado.");
                }
            } else if (error.request) {
                toast.error("No se recibió respuesta del servidor. Verifica tu conexión.");
            } else {
                toast.error(`Error: ${error.message || "Error desconocido"}`);
            }
            throw error;
    });
}

export async function updateStockProduct(
    id: number,
    request: ProductsInterfaces.updateStockProduct
) {
    const url = PathsApi.getFullPath(PathsApi.Endpoints.updateStockProduct + "/" + id);
    const config = { headers: getAuthHeaders() };

    try {
        const response = await axios.put(url, request, config);
        toast.success("Producto actualizado con éxito.");
        return response;
    } catch (error) {
        handleAxiosError(error);
    }
}

export async function updatePriceProduct(
    id: number,
    request: ProductsInterfaces.updatePriceProduct
) {
    const url = PathsApi.getFullPath(PathsApi.Endpoints.updatePriceProduct + "/" + id);
    const config = { headers: getAuthHeaders() };

    try {
        const response = await axios.put(url, request, config);
        toast.success("Producto actualizado con éxito.");
        return response;
    } catch (error) {
        handleAxiosError(error);
    }
}

export async function updateNameProduct(
    id: number,
    request: ProductsInterfaces.updateNameProduct
) {
    const url = PathsApi.getFullPath(PathsApi.Endpoints.updateNameProduct + "/" + id);
    const config = { headers: getAuthHeaders() };

    try {
        const response = await axios.put(url, request, config);
        toast.success("Producto actualizado con éxito.");
        return response;
    } catch (error) {
        handleAxiosError(error);
    }
}

function getAuthHeaders() {
    const token = localStorage.getItem("jwt");
    return {
        Authorization: token ? `Bearer ${token}` : ""
    };
}
function handleAxiosError(error: any) {
    if (error.response) {
        switch (error.response.status) {
            default:
                toast.error(error.response.data.message || "Ha ocurrido un error inesperado.");
        }
    } else if (error.request) {
        toast.error("No se recibió respuesta del servidor. Verifica tu conexión.");
    } else {
        toast.error(`Error: ${error.message || "Error desconocido"}`);
    }
    throw error;
}