import { AppLayout } from "@/layouts/app-layout";

export default function ProductForm() {
    return (
        <div>
            <h1>Product Form</h1>
        </div>
    );
}

ProductForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;