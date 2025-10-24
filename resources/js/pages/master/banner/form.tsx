import { AppLayout } from '@/layouts/app-layout';

export default function BannerForm() {
    return (
        <div>
            <h1>Banner Form</h1>
        </div>
    );
}

BannerForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
