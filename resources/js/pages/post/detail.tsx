import { PublicLayout } from '@/layouts/public-layout';

export default function PostDetail() {
    return (
        <div>
            <h1>Post Detail</h1>
        </div>
    );
}

PostDetail.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
