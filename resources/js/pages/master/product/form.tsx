import FileUpload from '@/components/file-upload';
import InputError from '@/components/input-error';
import { MultiSelect } from '@/components/multi-select';
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
import { Textarea } from '@/components/ui/textarea';
import { AppLayout } from '@/layouts/app-layout';
import { extensions, FormResponse } from '@/lib/constant';
import { fetchCategory } from '@/lib/select';
import { slugify } from '@/lib/utils';
import product from '@/routes/master/product';
import { Product } from '@/types/product';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import RichTextEditor from 'reactjs-tiptap-editor';
import 'reactjs-tiptap-editor/style.css';

type Props = {
    props?: Product;
};

export default function ProductForm({ props }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        _method: props?.id ? 'put' : 'post',
        category_id: props?.category_id || null,
        title: props?.title || '',
        slug: props?.slug || '',
        content: props?.content || '',
        excerpt: props?.excerpt || '',
        phone_number: props?.phone_number || '',
        price: props?.price || '',
        manufacturer: props?.manufacturer || '',
        address: props?.address || '',
        license: props?.license || '',
        production_capacity: props?.production_capacity || '',
        thumbnail: props?.thumbnail || null,
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
                        <Label>Category</Label>
                        <MultiSelect
                            loadOptions={fetchCategory}
                            defaultValue={{
                                value: props?.category_id,
                                label: props?.category?.name ?? '',
                            }}
                            onChange={(v: any) =>
                                setData('category_id', v?.value)
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Title</Label>
                        <Input
                            value={data.title}
                            onChange={(e) => {
                                setData('title', e.target.value);
                                setData('slug', slugify(e.target.value));
                            }}
                        />
                        <InputError message={errors?.title} />
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
                    <div className="flex flex-col gap-1.5">
                        <Label>Content</Label>
                        <RichTextEditor
                            output="html"
                            content={data.content}
                            onChangeContent={(content: string) =>
                                setData('content', content as string)
                            }
                            extensions={extensions}
                            dark={false}
                            contentClass="prose prose-sm max-w-none min-h-[300px] p-4"
                        />
                        <InputError message={errors?.content} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Excerpt</Label>
                        <Textarea
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
                    <div className="flex flex-col gap-1.5">
                        <Label>Price</Label>
                        <Input
                            inputMode="numeric"
                            type="number"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                        <InputError message={errors?.price} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Manufacturer</Label>
                        <Input
                            value={data.manufacturer}
                            onChange={(e) =>
                                setData('manufacturer', e.target.value)
                            }
                        />
                        <InputError message={errors?.manufacturer} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Address</Label>
                        <Input
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                        />
                        <InputError message={errors?.address} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>License</Label>
                        <Input
                            value={data.license}
                            onChange={(e) => setData('license', e.target.value)}
                        />
                        <InputError message={errors?.license} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Production Capacity</Label>
                        <Input
                            value={data.production_capacity}
                            onChange={(e) =>
                                setData('production_capacity', e.target.value)
                            }
                        />
                        <InputError message={errors?.production_capacity} />
                    </div>
                    <div className="col-span-12 flex flex-col gap-y-1.5">
                        <Label className="text-base">Thumbnail</Label>
                        <FileUpload
                            media={data.thumbnail || props?.thumbnail}
                            onChange={(file: any) => setData('thumbnail', file)}
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            maxSize={2 * 1024 * 1024}
                            id="thumbnail"
                        />
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}

ProductForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
