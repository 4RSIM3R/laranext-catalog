import { PublicLayout } from '@/layouts/public-layout';
import { Video } from '@/types/video';

type Props = {
    props: {
        video: Video;
        related: Video[];
    }
}

export default function VideoDetail({ props }: Props) {
    return (
        <div>
            <h1>Video Detail</h1>
        </div>
    );
}

VideoDetail.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
