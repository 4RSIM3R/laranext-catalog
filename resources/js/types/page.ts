import { Model } from './model';

export interface Page extends Model {
    name: string;
    slug: string;
    content: Record<string, any>;
    seo_config: Record<string, any>;
    is_active: boolean;
}
