import { Category } from './category';
import { Media } from './media';

export interface Product {
    id: number;
    category_id: number | null;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    phone_number: string;
    price: number;
    manufacturer: string;
    address: string;
    license: string;
    production_capacity: string;
    created_at: string;
    updated_at: string;
    thumbnail?: Media & Media;
    category?: Category;
}
