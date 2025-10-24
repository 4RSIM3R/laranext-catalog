import { AppLayout } from '@/layouts/app-layout';

export default function UserForm() {
    return (
        <div>
            <h1>User Form</h1>
        </div>
    );
}

UserForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
