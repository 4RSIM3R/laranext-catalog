import { Model } from './model';

export interface Post extends Model {
    title: string;
    slug: string;
    content: Record<string, any>;
    excerpt: string;
    tags: string;
    seo_config: Record<string, any>;
    status: string;
}
