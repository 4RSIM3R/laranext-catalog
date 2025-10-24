import { AppLayout } from "@/layouts/app-layout";

export default function PageIndex() {
    return (
        <div>
            <h1>Page Index</h1>
        </div>
    );
}

PageIndex.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;