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
import system from '@/routes/setting/system';
import { Setting } from '@/types/setting';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

type FormData = {
    key: string;
    value: string;
};

type Props = {
    props: Setting;
};

export default function SystemForm({ props }: Props) {
    const { data, setData, post, put, processing, errors } = useForm<FormData>({
        key: props?.key || '',
        value: props?.value || '',
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (props?.id) {
            put(system.update(props.id).url, FormResponse);
        } else {
            post(system.store().url, FormResponse);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold">
                            System Setting Form
                        </CardTitle>
                        <CardDescription>
                            Enter the system setting data here.
                        </CardDescription>
                    </div>
                    <Button>
                        {processing && (
                            <Loader2 className="ml-2 animate-spin" />
                        )}
                        Save System Setting
                    </Button>
                </CardHeader>
                <CardContent className="flex h-fit flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <Label>Key</Label>
                        <Input
                            value={data.key}
                            onChange={(e) => {
                                setData('key', e.target.value);
                            }}
                        />
                        <InputError message={errors?.key} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Value</Label>
                        <Input
                            value={data.value}
                            onChange={(e) => setData('value', e.target.value)}
                        />
                        <InputError message={errors?.value} />
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}

SystemForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
