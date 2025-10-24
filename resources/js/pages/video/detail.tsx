import { PublicLayout } from '@/layouts/public-layout';

export default function VideoDetail() {
    return (
        <div>
            <h1>Video Detail</h1>
        </div>
    );
}

VideoDetail.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
