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
export async function allProducts(
  onChunk: (product: any) => void,
  params: { offset: number; limit: number; category?: string }
) {
  const query = new URLSearchParams({
    offset: String(params.offset),
    limit: String(params.limit),
    ...(params.category && { category: params.category }),
  });

  const url = `${PathsApi.getFullPath(PathsApi.Endpoints.all_products)}?${query.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error en el servidor: ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("El cuerpo de la respuesta no tiene reader");
  }

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.trim()) {
        try {
          const product = JSON.parse(line);
          onChunk(product);
        } catch (e) {
          console.error("Error parseando producto:", e);
        }
      }
    }
  }

  if (buffer.trim()) {
    try {
      const product = JSON.parse(buffer);
      onChunk(product);
    } catch (e) {
      console.error("Error parseando último producto:", e);
    }
  }
}


export async function random8Products() {
    const url = PathsApi.getFullPath(PathsApi.Endpoints.random_8_products);
    return axios.get(url)
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

export async function updateImageProduct(
    id: number,
    request: ProductsInterfaces.ImageUploadRequest
) {
    const url = PathsApi.getFullPath(PathsApi.Endpoints.updateImageProduct + "/" + id);
    const config = { headers: getAuthHeaders() };
    const formData = new FormData()
    formData.append("image", request.image) 
    try {
        const response = await axios.put(url, formData, config);
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