import category from '@/routes/master/category';
import { Base } from '@/types/base';
import { Category } from '@/types/category';
import axios from 'axios';

export type SelectOption = {
    value: any;
    label: any;
};

export type FetchCategoryParams = {
    search: any;
    type?: string;
};

export const fetchCategory = async ({
    search,
    type,
}: FetchCategoryParams): Promise<SelectOption[]> => {
    const params: Record<string, any> = { 'filter[name]': search };
    if (type) {
        params['filter[type]'] = type;
    }

    const response = await axios.get<Base<Category[]>>(category.fetch().url, {
        params,
    });

    return (response.data.items ?? []).map((e: Category) => ({
        value: e.id,
        label: e.name,
    }));
};
