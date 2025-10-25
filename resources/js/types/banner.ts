import { Model } from './model';

export interface Banner extends Model {
    title: string;
    subtitle: string;
    button_text: string;
    button_link: string;
}
