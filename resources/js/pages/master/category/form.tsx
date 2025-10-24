import { AppLayout } from '@/layouts/app-layout';

export default function CategoryForm() {
    return (
        <div>
            <h1>Category Form</h1>
        </div>
    );
}

CategoryForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
