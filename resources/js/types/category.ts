import { Media } from './media';
import { Model } from './model';

export interface Category extends Model {
    name: string;
    slug: string;
    thumbnail?: Media & File;
    type: string;
}
