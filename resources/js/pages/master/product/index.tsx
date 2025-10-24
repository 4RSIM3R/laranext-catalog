import { AppLayout } from '@/layouts/app-layout';

export default function ProductIndex() {
    return (
        <div>
            <h1>Product Index</h1>
        </div>
    );
}

ProductIndex.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
