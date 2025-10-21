import { Card } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Play } from 'lucide-react';

interface VideoCardProps {
    id: number;
    title: string;
    author: string;
    thumbnail: string;
    url: string;
}

export function VideoCard({ title, author, thumbnail, url }: VideoCardProps) {
    return (
        <Card className="group overflow-hidden transition-all hover:shadow-xl p-0">
            <Link href={url}>
                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg transition-transform group-hover:scale-110">
                            <Play
                                className="ml-1 h-8 w-8 text-white"
                                fill="white"
                            />
                        </div>
                    </div>
                </div>
            </Link>
            <div className="p-4">
                <Link href={url}>
                    <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 transition-colors hover:text-primary dark:text-gray-100">
                        {title}
                    </h3>
                    <p className="text-sm font-medium text-primary">{author}</p>
                </Link>
            </div>
        </Card>
    );
}
