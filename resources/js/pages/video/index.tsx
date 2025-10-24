import { PublicLayout } from "@/layouts/public-layout";

export default function VideoIndex() {
    return (
        <div>
            <h1>Video Index</h1>
        </div>
    );
}

VideoIndex.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>;