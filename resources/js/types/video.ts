import { Media } from './media';

export interface Video {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    thumbnail?: Media & Media;
    video?: Media & Media;
    created_at: string;
    updated_at: string;
}
