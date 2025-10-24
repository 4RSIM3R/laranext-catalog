import { PublicLayout } from "@/layouts/public-layout";

export default function ProductIndex() {
    return (
        <div>
            <h1>Product Index</h1>
        </div>
    );
}

ProductIndex.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>;