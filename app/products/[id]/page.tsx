import { allProducts } from "@/api/auth/products";
import MercadoPagoButton from "@/components/mercado-pago-button";
import { CustomBreadcrumb } from "@/components/ui/breadcrumb";
import { ProductsInterfaces } from "@/interfaces/products";
import { FormatterNumberUtils } from "@/utils/FormatterNumberUtils";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const products: ProductsInterfaces.Product[] = [];

  await allProducts(
    (product) => {
      products.push(product);
    },
    { offset: 0, limit: 100, query: "" }
  );

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/product/${id}`);

  if (!res.ok) {
    // Aquí podrías lanzar un error personalizado, o mejor devolver un componente con mensaje
    // para no romper la app con un error 500.
    // Por ejemplo:
    return (
      <div className="mt-20 text-center text-red-600">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
        <p>El producto con ID {id} no existe o no está disponible.</p>
      </div>
    );
  }

  const product: ProductsInterfaces.ProductDetail = await res.json();

  return (
    <div className="mt-20 flex flex-col">
      <CustomBreadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Productos", href: "/products" },
          { label: product.name },
        ]}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        <div className="w-full h-auto">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg object-cover shadow-md"
          />
        </div>

        <div className="flex flex-col justify-start">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-700 text-base mb-6">{product.description}</p>
          <div className="text-2xl font-semibold text-indigo-600">
            {FormatterNumberUtils.toARS(product.price)}
          </div>
          <div className="pt-10">
            <MercadoPagoButton idProduct={product.id} quantity={1} />
          </div>
        </div>
      </div>
    </div>
  );
}
