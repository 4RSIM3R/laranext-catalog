import { Media } from './media';

export interface Video {
    id: number;
    title: string;
    slug: string;
    content: string;
    thumbnail: Media | File | null;
    video: Media | File | null;
    created_at: string;
    updated_at: string;
}
