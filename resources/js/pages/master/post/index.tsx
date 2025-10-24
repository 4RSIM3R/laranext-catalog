import { AppLayout } from "@/layouts/app-layout";

export default function PostIndex() {
    return (
        <div>
            <h1>Post Index</h1>
        </div>
    );
}

PostIndex.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;