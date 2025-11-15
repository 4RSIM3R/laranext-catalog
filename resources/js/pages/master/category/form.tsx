import FileUpload from '@/components/file-upload';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { AppLayout } from '@/layouts/app-layout';
import { FormResponse } from '@/lib/constant';
import { slugify } from '@/lib/utils';
import category from '@/routes/master/category';
import { Category } from '@/types/category';
import { Media } from '@/types/media';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

type FormData = {
    _method?: 'put' | 'post';
    name: string;
    slug: string;
    thumbnail: File | Media | null;
    type: string;
};

type Props = {
    props?: Category;
};

export default function CategoryForm({ props }: Props) {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        _method: props?.id ? 'put' : 'post',
        name: props?.name || '',
        slug: props?.slug || '',
        thumbnail: props?.thumbnail || null,
        type: props?.type || 'product',
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Only include thumbnail if it's a new File object
        if (!(data.thumbnail instanceof File)) {
            data.thumbnail = null;
        }

        // Always use POST when dealing with files (multipart/form-data)
        // The _method field will tell Laravel to treat it as PUT if updating
        const url = props?.id
            ? category.update(props.id).url
            : category.store().url;
        post(url, FormResponse);
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
                    <div className="flex flex-col gap-1.5">
                        <Label>Type</Label>
                        <Select
                            value={data.type}
                            onValueChange={(value) => setData('type', value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="product">Product</SelectItem>
                                <SelectItem value="article">Article</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors?.slug} />
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

CategoryForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
