// ProductDetailPage.tsx
import CheckoutButton from '@/components/checkout-bricks'
import React from 'react'

interface ProductDetailProps {
  image?: string
  name?: string
  description?: string
  price?: number
}

const ProductDetailPage: React.FC<ProductDetailProps> = ({
  image = 'https://via.placeholder.com/500',
  name = 'Producto Genérico',
  description = 'Este es un producto de ejemplo con una descripción breve y clara. Ideal para mostrar cómo se ve una página de detalle de producto.',
  price = 0.00,
}) => {
    const preferenceId = 'tu_preference_id_generada_en_el_backend'

  return (
    <div className="bg-white section-container pt-4">
      {/* Header */}
      <div className="flex justify-between">
        <div className="playwrite h-full flex justify-center items-center">
          <i className="text-xl">NandoShop</i>
        </div>
        {/* <HeroSidebar /> */}
      </div>

      {/* Contenido principal */}
      <main className="mx-auto max-w-5xl pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Imagen */}
          <div className="w-full h-auto">
            <img
              src={image}
              alt={name}
              className="w-full rounded-lg object-cover shadow-md"
            />
          </div>

          {/* Información del producto */}
          <div className="flex flex-col justify-start">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{name}</h1>
            <p className="text-gray-700 text-base mb-6">{description}</p>
            <div className="text-2xl font-semibold text-indigo-600">${price.toFixed(2)}</div>
            <button className="mt-8 w-full md:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
            <CheckoutButton preferenceId={preferenceId} />
            </button>

          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductDetailPage
