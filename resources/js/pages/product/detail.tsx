import { PublicLayout } from '@/layouts/public-layout';

export default function ProductDetail() {
    return (
        <div>
            <h1>Product Detail</h1>
        </div>
    );
}

ProductDetail.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
