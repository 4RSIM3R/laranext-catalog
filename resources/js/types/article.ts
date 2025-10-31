import { Media } from './media';
import { Model } from './model';

export interface Article extends Model {
    title: string;
    slug: string;
    content: Record<string, any>;
    excerpt: string;
    thumbnail: Media | File | null;
}
