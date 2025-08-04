"use client"

import React, { useState } from "react"
import { toast } from "react-toastify"
import { createPreference } from "@/api/auth/payment"

interface Props {
  idProduct: number
  quantity: number
}

// Interfaz local para evitar conflictos con definiciones globales
interface MercadoPagoCheckout {
  checkout: (options: {
    preference: { id: string }
    autoOpen: boolean
  }) => void
}

const MercadoPagoButton = ({ idProduct, quantity }: Props) => {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    try {
      setLoading(true)

      const response = await createPreference({ idProduct, quantity })
      const preferenceId = response.preferenceId

      if (!preferenceId) {
        toast.error("No se pudo obtener el ID de la preferencia.")
        return
      }

      const MercadoPago = (window as unknown as { MercadoPago: new (
        publicKey: string,
        options?: { locale?: string }
      ) => MercadoPagoCheckout }).MercadoPago

      const mp = new MercadoPago(process.env.NEXT_PUBLIC_MP_TEST!, {
        locale: "es-AR",
      })

      mp.checkout({
        preference: { id: preferenceId },
        autoOpen: true,
      })
    } catch (error) {
      console.error("Error en el flujo de pago:", error)
      toast.error("Ocurrió un error al procesar el pago.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      className="bg-black text-white px-4 py-2 rounded-md disabled:opacity-50"
      disabled={loading}
    >
      {loading ? "Generando pago..." : "Pagar con MP"}
    </button>
  )
}

export default MercadoPagoButton
