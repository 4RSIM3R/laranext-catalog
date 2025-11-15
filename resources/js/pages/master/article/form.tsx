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
import { Textarea } from '@/components/ui/textarea';
import { AppLayout } from '@/layouts/app-layout';
import { extensions, FormResponse } from '@/lib/constant';
import { slugify } from '@/lib/utils';
import article from '@/routes/master/article';
import { Article } from '@/types/article';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import RichTextEditor from 'reactjs-tiptap-editor';
import 'reactjs-tiptap-editor/style.css';

type Props = {
    props?: Article;
};

export default function PostForm({ props }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: props?.id ? 'put' : 'post',
        tags: props?.tags || [],
        thumbnail: props?.thumbnail || null,
        title: props?.title || '',
        slug: props?.slug || '',
        excerpt: props?.excerpt || '',
        content: props?.content || '',
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
            ? article.update(props.id).url
            : article.store().url;
        post(url, FormResponse);
    };

    return (
        <form onSubmit={onSubmit}>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold">
                            Article Form
                        </CardTitle>
                        <CardDescription>
                            Enter the article data here.
                        </CardDescription>
                    </div>
                    <Button>
                        {processing && (
                            <Loader2 className="ml-2 animate-spin" />
                        )}
                        Save Article
                    </Button>
                </CardHeader>
                <CardContent className="flex h-fit flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <Label>Tags (comma-separated)</Label>
                        <Input
                            value={
                                Array.isArray(data.tags)
                                    ? data.tags.join(', ')
                                    : ''
                            }
                            onChange={(e) => {
                                const tags = e.target.value
                                    .split(',')
                                    .map((tag) => tag.trim())
                                    .filter((tag) => tag !== '');
                                setData('tags', tags);
                            }}
                            placeholder="e.g., Berita, Pelatihan, Pengumuman"
                        />
                        <InputError message={errors?.tags} />
                        <p className="text-xs text-muted-foreground">
                            Separate multiple tags with commas
                        </p>
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
                        <Label>Excerpt</Label>
                        <Textarea
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                            rows={3}
                        />
                        <InputError message={errors?.excerpt} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Content</Label>
                        <RichTextEditor
                            output="html"
                            content={data.content}
                            onChangeContent={(content) =>
                                setData('content', content)
                            }
                            extensions={extensions}
                            dark={false}
                            contentClass="prose prose-sm max-w-none min-h-[300px] p-4"
                        />
                        <InputError message={errors?.content} />
                    </div>
                    <div className="col-span-12 flex flex-col gap-y-1.5">
                        <Label className="text-base">Thumbnail</Label>
                        <FileUpload
                            media={data.thumbnail || props?.thumbnail}
                            onChange={(file) => setData('thumbnail', file)}
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

PostForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
