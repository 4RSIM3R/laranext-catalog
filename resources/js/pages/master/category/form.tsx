import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppLayout } from '@/layouts/app-layout';
import { FormResponse } from '@/lib/constant';
import { slugify } from '@/lib/utils';
import category from '@/routes/master/category';
import { Category } from '@/types/category';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

type FormData = {
    name: string;
    slug: string;
};

type Props = {
    props?: Category;
};

export default function CategoryForm({ props }: Props) {
    const { data, setData, post, put, processing, errors } = useForm<FormData>({
        name: props?.name || '',
        slug: props?.slug || '',
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (props?.id) {
            put(category.update(props.id).url, FormResponse);
        } else {
            post(category.store().url, FormResponse);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold">
                            Category Form
                        </CardTitle>
                        <CardDescription>
                            Enter the category data here.
                        </CardDescription>
                    </div>
                    <Button>
                        {processing && (
                            <Loader2 className="ml-2 animate-spin" />
                        )}
                        Save Category
                    </Button>
                </CardHeader>
                <CardContent className="flex h-fit flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <Label>Name</Label>
                        <Input
                            value={data.name}
                            onChange={(e) => {
                                setData('name', e.target.value);
                                setData('slug', slugify(e.target.value));
                            }}
                        />
                        <InputError message={errors?.name} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Slug</Label>
                        <Input
                            value={data.slug}
                            readOnly={true}
                            disabled={true}
                        />
                        <InputError message={errors?.slug} />
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}

CategoryForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
