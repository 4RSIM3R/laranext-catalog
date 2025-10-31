import { PublicLayout } from '@/layouts/public-layout';
import { Article } from '@/types/article';
import { Base } from '@/types/base';

type Props = {
    props: Base<Article[]>;
};

export default function PostIndex({ props }: Props) {
    return (
        <div>
            <h1>Post Index</h1>
        </div>
    );
}

PostIndex.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
