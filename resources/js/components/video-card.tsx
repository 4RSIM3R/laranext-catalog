import { Card } from '@/components/ui/card';
import video from '@/routes/public/video';
import { Video } from '@/types/video';
import { Link } from '@inertiajs/react';
import { Play } from 'lucide-react';

type Props = {
    props: Video;
};

export function VideoCard({ props }: Props) {
    return (
        <Card className="group overflow-hidden p-0 transition-all hover:shadow-xl">
            <Link href={video.show(props.slug).url}>
                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                        src={props.thumbnail?.original_url}
                        alt={props.title}
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
                <Link href={video.show(props.slug).url}>
                    <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 transition-colors hover:text-primary dark:text-gray-100">
                        {props.title}
                    </h3>
                    <p className="text-sm font-medium text-primary">
                        {props.slug}
                    </p>
                </Link>
            </div>
        </Card>
    );
}
