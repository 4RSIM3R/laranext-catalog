import { PublicLayout } from '@/layouts/public-layout';
import { Product } from '@/types/product';

type Props = {
    props: {
        product: Product;
        related: Product[];
    }
}

export default function ProductDetail({ props }: Props) {
    return (
        <div>
            <h1>Product Detail</h1>
        </div>
    );
}

ProductDetail.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
