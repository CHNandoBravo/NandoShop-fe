"use client"
import { useEffect, useRef } from "react"
import { toast } from "react-toastify"
import axios from "axios"

interface CredentialResponse {
  credential: string
  select_by: string
}

interface Google {
  accounts: {
    id: {
      initialize: (config: {
        client_id: string
        callback: (response: CredentialResponse) => void
      }) => void
      renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void
    }
  }
}

declare global {
  interface Window {
    google: Google
  }
}

interface GoogleLoginButtonProps {
  text?: "signin_with" | "signup_with" | "continue_with" | "signup" // valores válidos
}

export const GoogleLoginButton = ({ text = "continue_with" }: GoogleLoginButtonProps ) => {
  const googleDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.google || !googleDivRef.current) return

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: async (response: CredentialResponse) => {
        try {
          const { credential } = response
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/google`,
            { token: credential }
          )

          if (res.data?.token) {
            localStorage.setItem("jwt", res.data.token)
            toast.success("Inicio de sesión con Google exitoso.")
          } else {
            toast.error("Error al recibir el token del backend.")
          }
        } catch (err) {
          toast.error("Error al autenticar con Google.")
          console.error(err)
        }
      },
    })

    window.google.accounts.id.renderButton(googleDivRef.current, {
      theme: "outline",
      size: "large",
      width: "100%",
      text: text
    })
  }, [text])

  return <div ref={googleDivRef} className="w-full flex justify-center" />
}
