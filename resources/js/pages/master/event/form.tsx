import FileUpload from '@/components/file-upload';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { AppLayout } from '@/layouts/app-layout';
import { extensions, FormResponse } from '@/lib/constant';
import { cn, slugify } from '@/lib/utils';
import event from '@/routes/master/event';
import { Event } from '@/types/event';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import RichTextEditor from 'reactjs-tiptap-editor';
import 'reactjs-tiptap-editor/style.css';

type Props = {
    props?: Event;
};

export default function EventForm({ props }: Props) {
    const { data, setData, processing, errors, post } = useForm<any>({
        _method: props?.id ? 'put' : 'post',
        title: props?.title || '',
        slug: props?.slug || '',
        content: props?.content || '',
        excerpt: props?.excerpt || '',
        thumbnail: props?.thumbnail || null,
        date: props?.date || '',
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (props?.id) {
            post(event.update(props.id).url, FormResponse);
        } else {
            post(event.store().url, FormResponse);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold">
                            Event Form
                        </CardTitle>
                        <CardDescription>
                            Enter the event data here.
                        </CardDescription>
                    </div>
                    <Button>
                        {processing && (
                            <Loader2 className="ml-2 animate-spin" />
                        )}
                        Save Event
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
                        <Label>Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        'w-full justify-start text-left font-normal',
                                        !data.date && 'text-muted-foreground',
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {data.date ? (
                                        format(new Date(data.date), 'PPP')
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={
                                        data.date
                                            ? new Date(data.date)
                                            : undefined
                                    }
                                    onSelect={(date: any) =>
                                        setData(
                                            'date',
                                            format(date, 'yyyy-MM-dd') || '',
                                        )
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <InputError message={errors?.date as string} />
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
                        <InputError message={errors?.content as string} />
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

EventForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
