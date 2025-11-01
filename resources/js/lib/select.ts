import category from '@/routes/master/category';
import { Base } from '@/types/base';
import { Category } from '@/types/category';
import axios from 'axios';

export type SelectOption = {
    value: any;
    label: any;
};

export const fetchCategory = async (search: any): Promise<SelectOption[]> => {
    const response = await axios.get<Base<Category[]>>(category.fetch().url, {
        params: { 'filter[name]': search },
    });

    return (response.data.items ?? []).map((e: Category) => ({
        value: e.id,
        label: e.name,
    }));
};
