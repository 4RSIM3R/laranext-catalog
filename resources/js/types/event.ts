import { Media } from './media';
import { Model } from './model';

export interface Event extends Model {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    registration_link?: string;
    start_date: string;
    end_date?: string;
    thumbnail?: Media;
    is_completed?: boolean;
    start_time?: string;
    end_time?: string;
}
