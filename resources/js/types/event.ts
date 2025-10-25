import { Media } from './media';
import { Model } from './model';

export interface Event extends Model {
    title: string;
    slug: string;
    content: string;
    thumbnail: Media | File | null;
}
