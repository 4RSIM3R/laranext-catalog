import { AppLayout } from '@/layouts/app-layout';

export default function FileForm() {
    return (
        <div>
            <h1>File Form</h1>
        </div>
    );
}

FileForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
