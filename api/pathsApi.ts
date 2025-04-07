import { register } from "module";

export namespace PathsApi {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ""; // Aseguramos que no sea undefined

    export const Endpoints = {
        login: "/v1/auth/login",
        register: "/v1/auth/register"
    };

    export const getFullPath = (path: string) => `${BASE_URL}${path}`;
}