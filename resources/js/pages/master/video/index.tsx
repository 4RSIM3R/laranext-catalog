import { AppLayout } from "@/layouts/app-layout";

export default function VideoIndex() {
    return (
        <div>
            <h1>Video Index</h1>
        </div>
    );
}

VideoIndex.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;