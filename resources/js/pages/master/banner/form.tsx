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
import { AppLayout } from '@/layouts/app-layout';
import { FormResponse } from '@/lib/constant';
import banner from '@/routes/master/banner';
import { Banner } from '@/types/banner';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

type Props = {
    props?: Banner;
};

export default function BannerForm({ props }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: props?.title || '',
        subtitle: props?.subtitle || '',
        button_text: props?.button_text || '',
        button_link: props?.button_link || '',
        thumbnail: props?.thumbnail || null,
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (props?.id) {
            put(banner.update(props.id).url, FormResponse);
        } else {
            post(banner.store().url, FormResponse);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold">
                            Account Form
                        </CardTitle>
                        <CardDescription>
                            Enter the account data here.
                        </CardDescription>
                    </div>
                    <Button>
                        {processing && (
                            <Loader2 className="ml-2 animate-spin" />
                        )}
                        Save Account
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
                        <Label>Subtitle</Label>
                        <Input
                            value={data.subtitle}
                            onChange={(e) =>
                                setData('subtitle', e.target.value)
                            }
                        />
                        <InputError message={errors?.subtitle} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Button Text</Label>
                        <Input
                            value={data.button_text}
                            onChange={(e) =>
                                setData('button_text', e.target.value)
                            }
                        />
                        <InputError message={errors?.button_text} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Button Link</Label>
                        <Input
                            value={data.button_link}
                            onChange={(e) =>
                                setData('button_link', e.target.value)
                            }
                        />
                        <InputError message={errors?.button_link} />
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

BannerForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
