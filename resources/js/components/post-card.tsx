import { Card } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

interface PostCardProps {
    id: number;
    title: string;
    author: string;
    date: string;
    image: string;
    url: string;
}

export function PostCard({ title, author, date, image, url }: PostCardProps) {
    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    return (
        <Card className="group overflow-hidden transition-all hover:shadow-xl p-0">
            <Link href={url}>
                <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </Link>
            <div className="p-5">
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                    {author} - {formatDate(date)}
                </p>
                <Link href={url}>
                    <h3 className="mb-4 line-clamp-2 text-lg leading-snug font-semibold text-gray-900 transition-colors hover:text-primary dark:text-gray-100">
                        {title}
                    </h3>
                </Link>
                <Link
                    href={url}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                    Baca Selengkapnya
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </Card>
    );
}
