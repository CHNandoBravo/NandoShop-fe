import * as Yup from "yup";
import yupCommon from "@/schemasYup/yupCommon"

export const loginSchema = Yup.object({
  email: yupCommon.email(),
  password: yupCommon.password()
});

export const LoginInitialValue = {
    email: "",
    password: ""
}