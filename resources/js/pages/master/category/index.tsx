import { AppLayout } from '@/layouts/app-layout';

export default function CategoryIndex() {
    return (
        <div>
            <h1>Category Index</h1>
        </div>
    );
}

CategoryIndex.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
