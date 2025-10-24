import { AppLayout } from "@/layouts/app-layout";

export default function BannerIndex() {
    return (
        <div>
            <h1>Banner Index</h1>
        </div>
    );
}

BannerIndex.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;