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
        <Link href={video.show(props.slug || props.id).url}>
            <Card className="group overflow-hidden p-0 transition-all hover:shadow-xl">
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
                <div className="px-6 py-4">
                    <h3 className="mb-2 line-clamp-2 text-xl font-bold text-gray-900 transition-colors hover:text-primary dark:text-gray-100">
                        {props.title}
                    </h3>
                    <p className="text-lg font-medium text-orange-500">
                        Michael Buyung
                    </p>
                </div>
            </Card>
        </Link>
    );
}
