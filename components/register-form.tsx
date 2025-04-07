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
import { toast } from "react-toastify"
import { GoogleLoginButton } from "./ui/google-button"
import { registerInitialValue, registerSchema } from "@/schemasYup/registerSchema"
import { register } from "@/api/auth/register"

export function RegisterForm({
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
  const formik = useFormik({
    initialValues: registerInitialValue,
    onSubmit: async (values) => {
      try {
        await register(values);
        toast.success("Inicio de sesión exitoso.")
      } catch (error){
        toast.error("Ocurrió un error inesperado.");
        console.log(error)
      }
    },
    validationSchema: registerSchema
  });
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenido a NandoShop!!!</CardTitle>
          <CardDescription>
            Únete usando Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                
                <GoogleLoginButton text="signup_with"/>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                O continuar con
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="first_name">Nombre</Label>
                        <Input
                            id="first_name"
                            type="text"
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            placeholder="Nando"
                        />
                        {formik.touched.first_name && formik.errors.first_name && (
                            <p className="text-red-500 text-sm">{formik.errors.first_name}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last_name">Apellido</Label>
                        <Input
                            id="last_name"
                            type="last_name"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            placeholder="Bravo"
                        />
                        {formik.touched.last_name && formik.errors.last_name && (
                            <p className="text-red-500 text-sm">{formik.errors.last_name}</p>
                        )}
                    </div>
                </div>
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
                Registrarme
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
