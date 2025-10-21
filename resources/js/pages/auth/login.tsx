import InputError from '@/components/input-error';
import { PasswordInput } from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/layouts/auth-layout';
import { FormResponse } from '@/lib/constant';
import { attempt } from '@/routes';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

type FormData = {
    email: string;
    password: string;
};

export default function Login() {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        email: '',
        password: '',
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(attempt().url, FormResponse);
    };

    return (
        <div className="mx-auto flex h-full max-w-sm flex-col items-center justify-center gap-1">
            <div className="flex flex-row items-center gap-4 mb-4">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT100pK2seZtmKj5GAqz3h3RDedoR0l5HpS6w&s"
                    className="size-16 w-auto object-cover"
                />
                <div className="flex flex-col">
                    <h2 className="font-semibold text-gray-900">
                        SVS File Viewer
                    </h2>
                    <p className="text-sm text-gray-500">
                        Fakultas Kedokteran Universitas Brawijaya
                    </p>
                </div>
            </div>
            <form
                className="mt-2 flex w-full flex-col gap-4"
                onSubmit={onSubmit}
            >
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email">
                        Email address
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        tabIndex={2}
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        disabled={processing}
                        placeholder="email@example.com"
                        className="w-full"
                    />
                    <InputError message={errors.email} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                        id="password"
                        required
                        tabIndex={3}
                        autoComplete="current-password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        disabled={processing}
                        placeholder="Password"
                    />
                    <InputError message={errors.password} />
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    tabIndex={5}
                    disabled={processing}
                >
                    {processing && (
                        <LoaderCircle className="size-4 animate-spin" />
                    )}
                    Login
                </Button>
                <Label htmlFor="remember" className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <span>Remember me</span>
                </Label>
            </form>
        </div>
    );
}

Login.layout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>;
