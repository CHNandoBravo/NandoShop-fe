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
    export interface UserMeResponse {
        email: string;
        role: Role;
        lastName: string;
        firstName: string;
    }
}
export enum Role {
  SELLER = "SELLER",
  USER = "USER",
}