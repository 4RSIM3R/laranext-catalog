import { Category } from './category';
import { Media } from './media';
import { Model } from './model';

export interface Article extends Model {
    category_id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    tags?: string;
    thumbnail?: Media & Media;
    category?: Category;
}
