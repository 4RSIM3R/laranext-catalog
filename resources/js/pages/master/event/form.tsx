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
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import RichTextEditor, { BaseKit } from 'reactjs-tiptap-editor';
import { Bold } from 'reactjs-tiptap-editor/bold';
import { BulletList } from 'reactjs-tiptap-editor/bulletlist';
import { Clear } from 'reactjs-tiptap-editor/clear';
import { Code } from 'reactjs-tiptap-editor/code';
import { CodeBlock } from 'reactjs-tiptap-editor/codeblock';
import { Color } from 'reactjs-tiptap-editor/color';
import { Emoji } from 'reactjs-tiptap-editor/emoji';
import { FontFamily } from 'reactjs-tiptap-editor/fontfamily';
import { FontSize } from 'reactjs-tiptap-editor/fontsize';
import { FormatPainter } from 'reactjs-tiptap-editor/formatpainter';
import { Heading } from 'reactjs-tiptap-editor/heading';
import { Highlight } from 'reactjs-tiptap-editor/highlight';
import { Iframe } from 'reactjs-tiptap-editor/iframe';
import { Indent } from 'reactjs-tiptap-editor/indent';
import { Italic } from 'reactjs-tiptap-editor/italic';
import { Katex } from 'reactjs-tiptap-editor/katex';
import { LineHeight } from 'reactjs-tiptap-editor/lineheight';
import { MoreMark } from 'reactjs-tiptap-editor/moremark';
import { OrderedList } from 'reactjs-tiptap-editor/orderedlist';
import { SearchAndReplace } from 'reactjs-tiptap-editor/searchandreplace';
import { SlashCommand } from 'reactjs-tiptap-editor/slashcommand';
import { Strike } from 'reactjs-tiptap-editor/strike';
import { SubAndSuperScript } from 'reactjs-tiptap-editor/subandsuperscript';
import { TaskList } from 'reactjs-tiptap-editor/tasklist';
import { TextAlign } from 'reactjs-tiptap-editor/textalign';
import { TextDirection } from 'reactjs-tiptap-editor/textdirection';
import { TextUnderline } from 'reactjs-tiptap-editor/textunderline';

// Import CSS
import FileUpload from '@/components/file-upload';
import { Event } from '@/types/event';
import { useState } from 'react';
import 'reactjs-tiptap-editor/style.css';

type Props = {
    props?: Event;
};

export default function EventForm({ props }: Props) {
    const [content, setContent] = useState<string>('');

    const { data, setData, processing, errors } = useForm({
        title: props?.title || '',
        slug: props?.slug || '',
        content: props?.content || '',
        thumbnail: props?.thumbnail || null,
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // if (event?.id) {
        //     put(master.event.update(event.id).url);
        // } else {
        //     post(master.event.store().url);
        // }
    };

    const essentialFormatting = [Heading, Bold, Italic, TextUnderline];
    const advancedFormatting = [Strike, Code, Highlight, Color, Clear];
    const listsAndStructure = [BulletList, OrderedList, TaskList];
    const advancedFeatures = [
        CodeBlock,
        TextAlign,
        Indent,
        LineHeight,
        FontFamily,
        FontSize,
        TextDirection,
        Iframe,
        Emoji,
        Katex,
        SubAndSuperScript,
        MoreMark.configure({
            subscript: false,
            superscript: false,
        }),
        FormatPainter,
        SearchAndReplace,
        SlashCommand,
    ];

    const extensions = [
        BaseKit.configure({
            placeholder: {
                placeholder: 'Write your content here...',
                showOnlyCurrent: true,
            },
        }),
        ...essentialFormatting,
        ...advancedFormatting,
        ...listsAndStructure,

        ...advancedFeatures,
    ];

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
                            onChange={(e) => setData('title', e.target.value)}
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
                        <Label>Date</Label>
                        <Input
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        <InputError message={errors?.title} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Tag</Label>
                        <Input
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        <InputError message={errors?.title} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Content</Label>
                        <RichTextEditor
                            output="html"
                            content={content}
                            onChangeContent={(content) => setContent(content)}
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

EventForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
