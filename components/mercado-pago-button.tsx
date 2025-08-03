"use client"

import { createPreference } from "@/api/auth/payment"
import React, { useState } from "react"
import { toast } from "react-toastify"

interface Props {
  idProduct: number
  quantity: number
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

      const mp = new window.MercadoPago(
        "TEST-2be7f803-8980-4710-aebb-0346766c0310",
        { locale: "es-AR" }
      )

      mp.checkout({
        preference: {
          id: preferenceId,
        },
        autoOpen: true,
      })
    } catch (error) {
      // El error ya se maneja en createPreference, opcional mostrar algo extra acá
      console.error("Error en el flujo de pago:", error)
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
