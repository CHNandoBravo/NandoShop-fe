"use client"

import { initMercadoPago } from "@mercadopago/sdk-react"
import React, { useEffect, useRef } from "react"

interface CheckoutButtonProps {
  preferenceId: string
}

declare global {
  interface Window {
    MercadoPago: any
  }
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ preferenceId }) => {
  const alreadyRendered = useRef(false)

  useEffect(() => {
    if (!preferenceId || alreadyRendered.current) return

    initMercadoPago("APP_USR-f87d9376-8b7e-4980-8cf7-ace07d639ad0", { locale: "es-AR" })

    const renderWalletBrick = async () => {
      const mp = new window.MercadoPago("APP_USR-f87d9376-8b7e-4980-8cf7-ace07d639ad0", { locale: "es-AR" })
      const bricksBuilder = mp.bricks()

      await bricksBuilder.create("wallet", "wallet_container", {
        initialization: {
          preferenceId,
        },
        customization: {
          texts: {
            valueProp: "smart_option",
          },
        },
      })
    }

    renderWalletBrick()
    alreadyRendered.current = true

    // Opcional: cleanup cuando se desmonte
    return () => {
      const walletContainer = document.getElementById("wallet_container")
      if (walletContainer) walletContainer.innerHTML = ""
      alreadyRendered.current = false
    }
  }, [preferenceId])

  return <div id="wallet_container" className="mt-4 w-1/2" />
}

export default CheckoutButton
