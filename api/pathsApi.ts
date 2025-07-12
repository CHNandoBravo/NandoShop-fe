export namespace PathsApi {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ""; 

    export const Endpoints = {
        login: "/v1/auth/login",
        register: "/v1/auth/register",
        user_me: "/v1/auth/me",
        my_products: "/v1/my_products",
        createProduct: "/v1/product",
        deleteProduct: "/v1/product",
        updateStockProduct: "/v1/product/stock",
        updateNameProduct: "/v1/product/name",
        updatePriceProduct: "/v1/product/price"
    };

    export const getFullPath = (path: string) => `${BASE_URL}${path}`;
}