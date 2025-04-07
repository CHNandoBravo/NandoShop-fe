import * as Yup from "yup";
import yupCommon from "@/schemasYup/yupCommon"

export const registerSchema = Yup.object({
  email: yupCommon.email(),
  password: yupCommon.password(),
  first_name: yupCommon.first_name(),
  last_name: yupCommon.last_name()
});

export const registerInitialValue = {
    email: "",
    password: "",
    first_name: "",
    last_name: ""
}