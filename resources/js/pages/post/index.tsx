import { PublicLayout } from '@/layouts/public-layout';

export default function PostIndex() {
    return (
        <div>
            <h1>Post Index</h1>
        </div>
    );
}

PostIndex.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
