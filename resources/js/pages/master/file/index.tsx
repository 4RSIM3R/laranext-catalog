import { AppLayout } from "@/layouts/app-layout";

export default function FileIndex() {
    return (
        <div>
            <h1>File Index</h1>
        </div>
    );
}

FileIndex.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;