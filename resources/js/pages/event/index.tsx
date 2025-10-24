import { PublicLayout } from '@/layouts/public-layout';

export default function EventIndex() {
    return (
        <div>
            <h1>Event Index</h1>
        </div>
    );
}

EventIndex.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
