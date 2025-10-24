import { AppLayout } from "@/layouts/app-layout";

export default function PostForm() {
    return (
        <div>
            <h1>Post Form</h1>
        </div>
    );
}

PostForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;