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
import video from '@/routes/master/video';
import { Video } from '@/types/video';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import RichTextEditor from 'reactjs-tiptap-editor';
import 'reactjs-tiptap-editor/style.css';

type Props = {
    props?: Video;
};

export default function VideoForm({ props }: Props) {
    const { data, setData, post, put, processing, errors } = useForm<any>({
        _method: props?.id ? 'put' : 'post',
        title: props?.title || '',
        slug: props?.slug || '',
        content: props?.content || '',
        excerpt: props?.excerpt || '',
        thumbnail: props?.thumbnail || null,
        video: props?.video || null,
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (props?.id) {
            put(video.update(props.id).url, FormResponse);
        } else {
            post(video.store().url, FormResponse);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold">
                            Video Form
                        </CardTitle>
                        <CardDescription>
                            Enter the video data here.
                        </CardDescription>
                    </div>
                    <Button>
                        {processing && (
                            <Loader2 className="ml-2 animate-spin" />
                        )}
                        Save Video
                    </Button>
                </CardHeader>
                <CardContent className="flex h-fit flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <Label>Title</Label>
                        <Input
                            value={data.title}
                            onChange={(e) => {
                                setData('title', e.target.value);
                                setData('slug', slugify(e.target.value));
                            }}
                        />
                        <InputError message={errors?.title as string} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Slug</Label>
                        <Input
                            value={data.slug}
                            readOnly={true}
                            disabled={true}
                        />
                        <InputError message={errors?.slug as string} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Excerpt</Label>
                        <Textarea
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                            rows={3}
                        />
                        <InputError message={errors?.excerpt as string} />
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
                        <InputError message={errors?.content as string} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Thumbnail</Label>
                        <FileUpload
                            media={data.thumbnail || props?.thumbnail}
                            onChange={(file) => {
                                setData('thumbnail', file);
                            }}
                            accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                            maxSize={2 * 1024 * 1024}
                            id="thumbnail"
                        />
                        <InputError message={errors?.thumbnail as string} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Video</Label>
                        <FileUpload
                            media={data.video || props?.video}
                            onChange={(file) => {
                                setData('video', file);
                            }}
                            accept="video/*"
                            id="video"
                            maxSize={100 * 1024 * 1024}
                        />
                        <InputError message={errors?.video as string} />
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}

VideoForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
