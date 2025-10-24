import { AppLayout } from '@/layouts/app-layout';

export default function BackofficeIndex() {
    return (
        <div>
            <h1>Backoffice Index</h1>
        </div>
    );
}

BackofficeIndex.layout = (page: React.ReactNode) => (
    <AppLayout>{page}</AppLayout>
);
