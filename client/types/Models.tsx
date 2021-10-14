export interface Category {
    id: number;
    name: string;
    description?: string;
    image?: string;
    slug: string;
    created_at?: any;
    updated_at?: any;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    slug: string;
    discount?: number;
    price: number;
    category_id: number;
    created_at?: any;
    updated_at?: any;
}
