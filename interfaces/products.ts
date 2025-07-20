export namespace ProductsInterfaces {
    interface BaseProduct {
        name: string;
        price: number;
        stock: number;
        description: string
    }

    export interface myProducts extends BaseProduct {
        id: number;
        category: string;
        image: string;
    }

    export interface createProduct extends BaseProduct {
        categoryId: number;
    }

    export interface listProduct extends BaseProduct {
        categoryId: number;
        image: string | null;
    }
    export interface updateStockProduct {
        newStock: number
    }

    export interface updatePriceProduct {
        newPrice: number;
    }

    export interface updateNameProduct {
        newName: string;
    }
}