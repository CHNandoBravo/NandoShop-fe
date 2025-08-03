import { updateImageProduct } from "./auth/products";

export namespace PathsApi {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ""; 

    export const Endpoints = {
        login: "/v1/auth/login",
        register: "/v1/auth/register",
        user_me: "/v1/auth/me",
        my_products: "/v1/my_products",
        all_products: "/v1/products/all",
        random_8_products: "/v1/products/random/8",
        createProduct: "/v1/product",
        deleteProduct: "/v1/product",
        updateStockProduct: "/v1/product/stock",
        updateNameProduct: "/v1/product/name",
        updatePriceProduct: "/v1/product/price",
        updateImageProduct: "/v1/product/image",
        createPreference: "/v1/payments/create"
    };

    export const getFullPath = (path: string) => `${BASE_URL}${path}`;
}