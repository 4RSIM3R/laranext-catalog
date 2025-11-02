import { Card } from '@/components/ui/card';
import { Article } from '@/types/article';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

type Props = {
    article: Article;
};

export function PostCard({ article }: Props) {
    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    return (
        <Card className="group overflow-hidden p-0 transition-all hover:shadow-xl">
            <Link href="">
                <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                        src={article.thumbnail?.original_url}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </Link>
            <div className="p-5">
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                    {article.slug} - {formatDate(article.created_at)}
                </p>
                <Link href="">
                    <h3 className="mb-4 line-clamp-2 text-lg leading-snug font-semibold text-gray-900 transition-colors hover:text-primary dark:text-gray-100">
                        {article.title}
                    </h3>
                </Link>
                <Link
                    href=""
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                    Baca Selengkapnya
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </Card>
    );
}
