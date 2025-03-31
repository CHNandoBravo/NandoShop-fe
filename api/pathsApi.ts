export namespace PathsApi {
    const BASE_URL = process.env.API_URL ?? "http://localhost:8080"; // Aseguramos que no sea undefined

    export const Endpoints = {
        login: "/v1/auth/login",
    };

    export const getFullPath = (path: string) => `${BASE_URL}${path}`;
}