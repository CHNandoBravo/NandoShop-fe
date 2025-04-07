export namespace AuthInterfaces {
    export interface LoginInterface {
        email: string;
        password: string;
    }
    export interface RegisterInterface {
        email: string;
        password: string;
        first_name: string;
        last_name: string;
    }
}