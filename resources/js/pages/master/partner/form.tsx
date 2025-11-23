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
import partner from '@/routes/master/partner';
import { Media } from '@/types/media';
import { Partner } from '@/types/partner';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

type FormData = {
    name: string;
    order: number;
    logo: File | Media | null;
};

type Props = {
    props?: Partner;
};

export default function PartnerForm({ props }: Props) {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        name: props?.name || '',
        order: props?.order ?? 0,
        logo: props?.logo || null,
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Only include logo if it's a new File object
        if (!(data.logo instanceof File)) {
            data.logo = null;
        }

        if (props?.id) {
            post(partner.update(props.id).url, FormResponse);
        } else {
            post(partner.store().url, FormResponse);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold">
                            Partner Form
                        </CardTitle>
                        <CardDescription>
                            Enter the partner data here.
                        </CardDescription>
                    </div>
                    <Button disabled={processing}>
                        {processing && (
                            <Loader2 className="ml-2 animate-spin" />
                        )}
                        Save Partner
                    </Button>
                </CardHeader>
                <CardContent className="flex h-fit flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <Label>Name</Label>
                        <Input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Enter partner name"
                        />
                        <InputError message={errors?.name} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Display Order</Label>
                        <Input
                            type="text"
                            inputMode="numeric"
                            value={data.order}
                            onChange={(e) =>
                                setData('order', parseInt(e.target.value) || 0)
                            }
                            placeholder="0"
                            min="0"
                        />
                        <InputError message={errors?.order} />
                        <p className="text-xs text-muted-foreground">
                            Lower numbers appear first. You can also drag and
                            drop to reorder.
                        </p>
                    </div>
                    <div className="col-span-12 flex flex-col gap-y-1.5">
                        <Label className="text-base">Logo</Label>
                        <FileUpload
                            media={data.logo || props?.logo}
                            onChange={(file: any) => setData('logo', file)}
                            accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                            maxSize={2 * 1024 * 1024}
                            id="logo"
                        />
                        <InputError message={errors?.logo} />
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}

PartnerForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
