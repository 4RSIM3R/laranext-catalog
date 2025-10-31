import { PublicLayout } from '@/layouts/public-layout';
import { Article } from '@/types/article';

type Props = {
    props: {
        article: Article;
        related: Article[];
    }
}

export default function PostDetail({ props }: Props) {
    return (
        <div>
            <h1>Post Detail</h1>
        </div>
    );
}

PostDetail.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
