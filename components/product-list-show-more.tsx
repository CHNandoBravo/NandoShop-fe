import { allProducts } from "@/api/auth/products";
import { ProductsInterfaces } from "@/interfaces/products";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ProductListShowMore () {
    const [loading, setLoading] = useState(false);
    const [productsData, setProductsData] = useState<ProductsInterfaces.myProducts[]>([]);
    useEffect(()=>{
           const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await allProducts();
                setProductsData(res.data);
            } catch (error) {
            console.error("Error al obtener productos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    },[])
    return (
        <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 ">Nuestros Productos Destacados</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productsData.map((product) => (
            <div key={product.id} className="group relative">
              <img
                alt={product.image}
                src={product.image}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={"#"}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex w-full justify-center">
          <Button>
            Ver mas
          </Button>
        </div>
      </div>
    </div>
    );
}