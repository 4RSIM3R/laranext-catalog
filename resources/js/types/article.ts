import { Media } from './media';
import { Model } from './model';

export interface Article extends Model {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    tags?: string[];
    thumbnail?: Media & Media;
}
