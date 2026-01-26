import { Media } from './media';

export interface Video {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    youtube_url: string;
    thumbnail?: Media;
    created_at: string;
    updated_at: string;
}
