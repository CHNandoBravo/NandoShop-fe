"use client"
import { FormBuilder } from "@/components/FormBuilder";
import { CreateProduct, fieldsCreateProduct, formSchema } from "./form-data";
import { useEffect, useState } from "react";
import { ProductsInterfaces } from "@/interfaces/products";
import { createProduct, myProducts } from "@/api/auth/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTableProducts } from "@/components/data-table-products";
import { DragAndDropWrapper } from "@/components/DragAndDropWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function CreateProductPage() {
    const [loading, setLoading] = useState(false);
    const [createProductData, setCreateProduct] = useState<ProductsInterfaces.myProducts[]>([]);
    const [productsData, setProductsData] = useState<ProductsInterfaces.myProducts[]>([]);

    useEffect(()=>{
       const fetchProducts = async () => {
        try {
            setLoading(true);
            console.log(createProductData)
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
    const initialDataCreateProduct: ProductsInterfaces.createProduct = {
        name: "",
        categoryId: 1,
        price: 0,
        stock: 1,
        description: "",
    };
    const form = useForm<CreateProduct>({
        resolver: zodResolver(formSchema),
        defaultValues: initialDataCreateProduct,
    });
    const handleSubmit = async (data: CreateProduct) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("price", data.price.toString());
            formData.append("stock", data.stock.toString());
            formData.append("description", data.description || "");
            formData.append("categoryId", data.categoryId.toString());
            if (data.image instanceof File) {
                formData.append("image", data.image);
            }

            setLoading(true);
            const res = await createProduct(formData);
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
        <Card className="w-full lg:w-1/3 h-fit overflow-hidden">
            <DragAndDropWrapper
                onFileDrop={(file) => form.setValue("image", file)}>
                <CardHeader>
                    <CardTitle>Crear producto</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormBuilder form={form} defaultValues={initialDataCreateProduct} fields={fieldsCreateProduct} onSubmit={handleSubmit} schema={formSchema}/>
                </CardContent>
            </DragAndDropWrapper>
        </Card>
        <div className="w-full lg:w-2/3">
            {loading ? (
                <div className="text-center py-8">Cargando productos...</div>
            ) : (
                <DataTableProducts data={productsData} />
            )}
        </div>
    </div>
  );
}
