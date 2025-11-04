import { Media } from './media';
import { Model } from './model';

export interface Event extends Model {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    date: string;
    thumbnail?: Media & Media;
}
