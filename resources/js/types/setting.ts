import { Model } from './model';

export interface Setting extends Model {
    key: string;
    value: string;
}
