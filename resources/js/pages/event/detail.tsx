import { PublicLayout } from '@/layouts/public-layout';

export default function EventDetail() {
    return (
        <div>
            <h1>Event Detail</h1>
        </div>
    );
}

EventDetail.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
