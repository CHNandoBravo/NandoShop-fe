import { FieldDefinition } from "@/components/FormBuilder";
import { ProductsInterfaces } from "@/interfaces/products";
import { z } from "zod"

export const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio." }),
  price: z.coerce.number({ invalid_type_error: "Debe ser un número" }).min(1000, { message: "El precio no puede ser negativo ni menor a 1000." }),

  stock: z
    .number({ invalid_type_error: "Debe ser un número" })
    .min(0, { message: "El stock no puede ser negativo." }),
  categoryId: z
    .number({ invalid_type_error: "Debe seleccionar una categoría válida" })
    .int()
    .min(1, { message: "Debe seleccionar una categoría." }),
    description: z.string().min(1, { message: "El nombre es obligatorio." }),
});

export type CreateProduct = z.infer<typeof formSchema>;

export const initialData: ProductsInterfaces.createProduct = {
    name: "",
    categoryId: 1,
    price: 0,
    stock: 1,
    description: ""
};

export const fields: FieldDefinition<CreateProduct>[] = [
  {
    name: "name",
    label: "Nombre del producto",
    placeholder: "Ej: iPhone 15",
    type: "text",
    width: "w-full"
  },
  {
    name: "description",
    label: "Descripcion del producto",
    placeholder: "",
    type: "text",
    width: "w-full",
  },
  {
    name: "price",
    label: "Precio",
    placeholder: "Ej: 999.99",
    type: "number",
    width: "w-full"
  },
  {
    name: "stock",
    label: "Stock disponible",
    placeholder: "Ej: 100",
    type: "number",
    width: "w-full"
  },
  {
    name: "categoryId",
    label: "ID de Categoría",
    placeholder: "Ej: 1",
    type: "select",
    width: "w-full",
    options: [
        { label: "Arte", value: 1 },
      ],
  },
  
];
