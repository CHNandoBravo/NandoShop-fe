"use client"

// ProductDetailPage.tsx
import { initMercadoPago } from '@mercadopago/sdk-react'
import React, { useEffect } from 'react'

interface ProductDetailProps {
  image?: string
  name?: string
  description?: string
  price?: number
}

interface CheckoutButtonProps {
  preferenceId: string
}
declare global {
  interface Window {
    MercadoPago: any;
  }
}
const CheckoutButton: React.FC<CheckoutButtonProps> = ({ preferenceId }) => {
  useEffect(() => {
    initMercadoPago('APP_USR-f87d9376-8b7e-4980-8cf7-ace07d639ad0', { locale: 'es-AR' }) // Cambiá por tu public_key

    const renderWalletBrick = async () => {
      const mp = new window.MercadoPago('APP_USR-f87d9376-8b7e-4980-8cf7-ace07d639ad0', { locale: 'es-AR' })
      const bricksBuilder = mp.bricks()

      await bricksBuilder.create('wallet', 'wallet_container', {
        initialization: {
          preferenceId: preferenceId,
        },
        customization: {
          texts: {
            valueProp: 'smart_option',
          },
        },
      })
    }

    renderWalletBrick()
  }, [preferenceId])

  return <div id="wallet_container" className="mt-4" />
}

export default CheckoutButton
