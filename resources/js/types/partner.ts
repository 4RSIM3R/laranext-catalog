import { Media } from './media';

export interface Partner {
    id: number;
    name: string;
    is_featured: boolean;
    order: number;
    created_at: string;
    updated_at: string;
    logo?: File & Media;
}
