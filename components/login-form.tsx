"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

//
import {useFormik} from "formik"
import { LoginInitialValue, loginSchema } from "../schemasYup/loginSchema"
import { toast } from "react-toastify"
import { login } from "@/api/auth/login"
import { GoogleLoginButton } from "./ui/google-button"
import { useRouter } from 'next/navigation';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) { 
  
  // Validacion y envio por el formulario
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Si hay un error mandar un toast
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      // Forzar que todos los campos estén como "touched"
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {} as Record<string, boolean>)
      );

      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }
    // formik procesa el envio
    formik.handleSubmit();
  }
  const router = useRouter();

  const formik = useFormik({
    initialValues: LoginInitialValue,
    onSubmit: async (values) => {
      try {
        await login(values);
        toast.success("Inicio de sesión exitoso.");
        router.push("/");
      } catch (error){
        toast.error("Ocurrió un error inesperado.");
        console.log(error)
      }
    },
    validationSchema: loginSchema
  });
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenido de nuevo</CardTitle>
          <CardDescription>
          Inicie sesión con su cuenta de Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                {/* <Button variant="outline" className="w-full" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Iniciar sesión con Apple
                </Button> */}
                <GoogleLoginButton text="signin_with"/>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                O continuar con
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="m@example.com"
                    required
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">{formik.errors.email}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Contraseña</Label>
                    {/* <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Olvidaste tu contraseña?
                    </a> */}
                  </div>
                  <Input id="password" 
                    type="password" 
                    required 
                    value={formik.values.password}
                    onChange={formik.handleChange}/>
                    {formik.touched.password && formik.errors.password && (
                      <p className="text-red-500 text-sm">{formik.errors.password}</p>
                    )}
                </div>
                <Button type="submit" className="w-full">
                  Iniciar Sesión
                </Button>
              </div>
              {/* <div className="text-center text-sm">
                No tienes una cuenta?{" "}
                <a href="#" className="underline underline-offset-4">
                  Registrarse
                </a>
              </div> */}
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        Al hacer clic en continuar, aceptas nuestros <a href="/terms_and_conditions">términos y condiciones.</a>{" "}
        y <a href="/privacy_policy">política de privacidad</a>.
      </div>
    </div>
  )
}
