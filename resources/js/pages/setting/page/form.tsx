import { AppLayout } from "@/layouts/app-layout";

export default function PageForm() {
    return (
        <div>
            <h1>Page Form</h1>
        </div>
    );
}

PageForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;