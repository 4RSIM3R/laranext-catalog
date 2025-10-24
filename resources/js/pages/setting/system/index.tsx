import { AppLayout } from "@/layouts/app-layout";

export default function SystemIndex() {
    return (
        <div>
            <h1>System Index</h1>
        </div>
    );
}

SystemIndex.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;