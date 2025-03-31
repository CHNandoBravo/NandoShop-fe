import * as Yup from "yup";

// Este archivo contiene validaciones comunes que se pueden reutilizar en múltiples formularios.
// Importar este archivo y utilizar las validaciones disponibles a traves de 'yupCommon'.

const yupCommon = {
    email: () => Yup.string()
        .email("Formato de correo electrónico incorrecto.")
        .required("El correo electrónico es requerido."),
    password: () => Yup.string()
        .min(8, "Minimo 8 caracteres")
        .matches(/[A-Z]/, "Debe contener una mayúscula")
        .matches(/[a-z]/, "Debe contener una minúscula")
        .matches(/\d/, "Debe contener un número")
        .matches(/[@$!%*?&]/, "Debe contener un carácter especial (@$!%*?&)")
        .required("Contraseña requerida"),
}

export default yupCommon;