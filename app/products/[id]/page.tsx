// app/products/[id]/page.tsx
import { allProducts } from "@/api/auth/products";
import CheckoutButton from "@/components/checkout-bricks";
import HeroSidebar from "@/components/hero-sidebar";
import MercadoPagoButton from "@/components/mercado-pago-button";
import { CustomBreadcrumb } from "@/components/ui/breadcrumb";
import { ProductsInterfaces } from "@/interfaces/products";
import { FormatterNumberUtils } from "@/utils/FormatterNumberUtils";
 // ajustá el path según tu estructura

export async function generateStaticParams() {
  const products: ProductsInterfaces.Product[] = [];

  await allProducts((product) => {
    products.push(product);
  }, { offset: 0, limit: 100, query: "" }); // podés ajustar limit si necesitás más productos

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

type Props = {
  params: { id: string };
};

export default async function ProductPage({ params }: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/product/${params.id}`);
  
  if (!res.ok) {
    throw new Error(`Producto no encontrado: ${params.id}`);
  }

  const product: ProductsInterfaces.ProductDetail = await res.json();
    const preferenceId = '291547864-84086603-b0c4-499c-9e7a-fa9255a7192b'
  return (
    <div className="mt-20 flex flex-col">
        <CustomBreadcrumb
                items={[
                    { label: "Inicio", href: "/" },
                    { label: "Productos", href: "/products" },
                    { label: product.name } // sin href => página actual
                ]}/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          {/* Imagen */}
          <div className="w-full h-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg object-cover shadow-md"
            />
          </div>

          {/* Información del producto */}
          <div className="flex flex-col justify-start">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-700 text-base mb-6">{product.description}</p>
            <div className="text-2xl font-semibold text-primary text-indigo-600">{FormatterNumberUtils.toARS(product.price)}</div>
            <div className="pt-10">
                <MercadoPagoButton idProduct={product.id} quantity={1}/>
            </div>
          </div>
        </div>
    </div>
  );
}
