import { random8Products } from "@/api/auth/products";
import { ProductsInterfaces } from "@/interfaces/products";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ProductCard } from "./ui/product-card";

export default function ProductListShowMore() {
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState<ProductsInterfaces.Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await random8Products();
        setProductsData(res.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [])
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-7xl">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 ">Nuestros Productos Destacados</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productsData.map((product) => (
            <ProductCard id={product.id} image={product.image} name={product.name} price={product.price} />
          ))}
        </div>

        <div className="mt-12 flex w-full justify-center">
          <a href={`/products`}>
            <Button>
              Ver mas
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}