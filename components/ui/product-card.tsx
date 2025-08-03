import { ProductsInterfaces } from "@/interfaces/products";
import { FormatterNumberUtils } from "@/utils/FormatterNumberUtils";

export const ProductCard = ({
    id,
    image,
    name,
    price,
}: ProductsInterfaces.Product) => {
    return (
        <div key={id} className="group relative  ">
            <img
                alt={image}
                src={image}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
            />
            <div className="mt-4 flex justify-between py-1 px-1">
                <div>
                    <h3 className="text-ls text-gray-700 font-semibold tracking-tight">
                        <a href={`/products/${id}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {name}
                        </a>
                    </h3>
                <p className="text-md font-medium text-gray-900 tracking-tight">{FormatterNumberUtils.toARS(price)}</p>
                </div>
            </div>
        </div>
    );
}