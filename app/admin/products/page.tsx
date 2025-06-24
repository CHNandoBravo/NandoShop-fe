"use client"
import { FormBuilder } from "@/components/FormBuilder";
import { CreateProduct, fields, formSchema, initialData } from "./form-data";
import { useEffect, useState } from "react";
import { ProductsInterfaces } from "@/interfaces/products";
import { createProduct, myProducts } from "@/api/auth/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";

export default function CreateProductPage() {
    const [loading, setLoading] = useState(false);
    const [createProductData, setCreateProduct] = useState<ProductsInterfaces.myProducts[]>([]);
    const [productsData, setProductsData] = useState<ProductsInterfaces.myProducts[]>([]);

    useEffect(()=>{
       const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await myProducts();
            setProductsData(res.data);
        } catch (error) {
        console.error("Error al obtener productos:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchProducts();
    },[])

    const handleSubmit = async (data: CreateProduct) => {
        try {
            setLoading(true);
            const res = await createProduct(data);
            setCreateProduct(res.data);
            const resProducts = await myProducts();
            setProductsData(resProducts.data);
        } catch (error) {
            console.error("Fallo en fetch:", error);
        } finally {
            setLoading(false);
        }
        
    };
  return (
    <div className="w-full flex flex-wrap">
      <Card className="w-full lg:w-1/3 py-4 h-fit">
        <CardHeader>
            <CardTitle>Crear producto</CardTitle>
        </CardHeader>
        <CardContent>
            <FormBuilder defaultValues={initialData} fields={fields} onSubmit={handleSubmit} schema={formSchema}/>
        </CardContent>
      </Card>
      <div className="w-full lg:w-2/3">
        {loading ? (
            <div className="text-center py-8">Cargando productos...</div>
            ) : (
            <DataTable data={productsData} />
            )}
      </div>
    </div>
  );
}
