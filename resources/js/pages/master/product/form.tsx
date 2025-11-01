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
import product from '@/routes/master/product';
import { Product } from '@/types/product';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

type Props = {
    props?: Product;
};

export default function ProductForm({ props }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        _method: props?.id ? 'put' : 'post',
        title: props?.title || '',
        slug: props?.slug || '',
        content: props?.content || '',
        excerpt: props?.excerpt || '',
        phone_number: props?.phone_number || '',
        price: props?.price || 0,
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (props?.id) {
            put(product.update(props.id).url, FormResponse);
        } else {
            post(product.store().url, FormResponse);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold">
                            Product Form
                        </CardTitle>
                        <CardDescription>
                            Enter the product data here.
                        </CardDescription>
                    </div>
                    <Button>
                        {processing && (
                            <Loader2 className="ml-2 animate-spin" />
                        )}
                        Save Product
                    </Button>
                </CardHeader>
                <CardContent className="flex h-fit flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <Label>Title</Label>
                        <Input
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        <InputError message={errors?.title} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Slug</Label>
                        <Input
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                        />
                        <InputError message={errors?.slug} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Content</Label>
                        <Input
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                        />
                        <InputError message={errors?.content} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Excerpt</Label>
                        <Input
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                        />
                        <InputError message={errors?.excerpt} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Phone Number</Label>
                        <Input
                            value={data.phone_number}
                            onChange={(e) =>
                                setData('phone_number', e.target.value)
                            }
                        />
                        <InputError message={errors?.phone_number} />
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}

ProductForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
