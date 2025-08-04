export namespace ProductsInterfaces {
    interface BaseProduct {
        name: string;
        price: number;
        stock: number;
        description: string
    }
    export interface Product {
        id: number,
        image: string,
        name: string,
        price: number,
    }
    export interface ProductDetail {
        id: number,
        image: string,
        name: string,
        price: number,
        description: string
    }
    export interface myProducts extends BaseProduct {
        id: number;
        category: string;
        image: string;
    }

    export interface createProduct extends BaseProduct {
        categoryId: number;
        image?: File; 
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

    export type ImageUploadRequest = {
        image: File
    }
}