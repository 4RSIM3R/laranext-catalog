import { Media } from './media';
import { Model } from './model';

export interface Event extends Model {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    start_date: string;
    end_date?: string;
    thumbnail?: Media & Media;
}
