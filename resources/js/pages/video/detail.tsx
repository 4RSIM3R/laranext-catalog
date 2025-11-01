import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { VideoCard } from '@/components/video-card';
import { PublicLayout } from '@/layouts/public-layout';
import { Video } from '@/types/video';
import { Calendar, Eye } from 'lucide-react';

type Props = {
    props: {
        video: Video;
        related: Video[];
    };
};

export default function VideoDetail({ props }: Props) {
    const { video, related } = props;

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    const getVideoUrl = () => {
        if (
            video.video &&
            typeof video.video === 'object' &&
            'original_url' in video.video
        ) {
            return video.video.original_url;
        }
        return null;
    };

    const videoUrl = getVideoUrl();

    return (
        <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card className="overflow-hidden p-0">
                            {/* Video Player */}
                            <div className="relative aspect-video bg-black">
                                {videoUrl ? (
                                    <video
                                        controls
                                        className="h-full w-full"
                                        poster={
                                            video.thumbnail &&
                                            typeof video.thumbnail ===
                                                'object' &&
                                            'original_url' in video.thumbnail
                                                ? video.thumbnail.original_url
                                                : undefined
                                        }
                                    >
                                        <source
                                            src={videoUrl}
                                            type="video/mp4"
                                        />
                                        Your browser does not support the video
                                        tag.
                                    </video>
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <div className="text-center text-white">
                                            <svg
                                                className="mx-auto mb-4 h-16 w-16 opacity-50"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <p className="text-sm opacity-75">
                                                Video tidak tersedia
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Video Info */}
                            <div className="p-6">
                                <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-gray-100">
                                    {video.title}
                                </h1>

                                <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {/* <span>
                                            {formatDate(video.created_at)}
                                        </span> */}
                                    </div>
                                    <Badge variant="secondary">
                                        <Eye className="mr-1 h-3 w-3" />
                                        Video
                                    </Badge>
                                </div>

                                <Separator className="my-6" />

                                {/* Video Description */}
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        Deskripsi
                                    </h2>
                                    <div
                                        className="mt-4 text-gray-700 dark:text-gray-300"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                video.content ||
                                                'Tidak ada deskripsi.',
                                        }}
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar - Related Videos */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
                                Video Terkait
                            </h2>
                            {related && related.length > 0 ? (
                                <div className="flex flex-col gap-4">
                                    {related.map((relatedVideo) => (
                                        <VideoCard
                                            key={relatedVideo.id}
                                            id={relatedVideo.id}
                                            title={relatedVideo.title}
                                            author="Lokal Berdaya"
                                            thumbnail={
                                                relatedVideo.thumbnail &&
                                                typeof relatedVideo.thumbnail ===
                                                    'object' &&
                                                'original_url' in
                                                    relatedVideo.thumbnail
                                                    ? relatedVideo.thumbnail
                                                          .original_url ||
                                                      '/logo.png'
                                                    : '/logo.png'
                                            }
                                            url={`/video/${relatedVideo.slug || relatedVideo.id}`}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <Card className="p-6">
                                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                                        Tidak ada video terkait
                                    </p>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

VideoDetail.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
