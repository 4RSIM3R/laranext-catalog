import { PublicLayout } from "@/layouts/public-layout";
import { Base } from "@/types/base";
import { Product } from "@/types/product";

type Props = {
    props: Base<Product[]>;
}

export default function ProductIndex({ props }: Props) {
    return (
        <div>
            <h1>Product Index</h1>
        </div>
    );
}

ProductIndex.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>;