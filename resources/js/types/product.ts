import { Category } from './category';
import { Media } from './media';

export interface Product {
    id: number;
    category_id: number | null;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    created_at: string;
    updated_at: string;
    phone_number: string;
    price: number;
    status: string;
    thumbnail?: Media & Media;
    category?: Category;
}
