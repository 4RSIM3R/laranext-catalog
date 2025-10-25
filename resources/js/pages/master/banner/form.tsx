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

type FormData = {
    title: string;
    slug: string;
};

type Props = {
    props?: Banner;
};

export default function BannerForm({ props }: Props) {
    const { data, setData, post, put, processing, errors } = useForm<FormData>({
        title: props?.title || '',
        slug: props?.slug || '',
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
                        <Label>Name</Label>
                        <Input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors?.name} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Email</Label>
                        <Input
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors?.email} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Password</Label>
                        <PasswordInput
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />
                        <InputError message={errors?.password} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Password Confirmation</Label>
                        <PasswordInput
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                        />
                        <InputError message={errors?.password_confirmation} />
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}

BannerForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
