import { SimplePagination } from '@/components/simple-pagination';
import { Input } from '@/components/ui/input';
import { VideoCard } from '@/components/video-card';
import { PublicLayout } from '@/layouts/public-layout';
import { Base } from '@/types/base';
import { Video } from '@/types/video';
import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
    props: Base<Video[]>;
};

export default function VideoIndex({ props }: Props) {
    const videos = props.items || [];
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const filterTitle = urlParams.get('filter[title]');
        if (filterTitle) {
            setSearchQuery(filterTitle);
        }
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const params: Record<string, string> = {};

            if (searchQuery) {
                params['filter[title]'] = searchQuery;
            }

            router.get(window.location.pathname, params, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Video Gallery
                    </h1>

                    <div className="relative max-w-md">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Cari video..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {videos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="mb-4 text-gray-400 dark:text-gray-600">
                            <svg
                                className="mx-auto h-24 w-24"
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
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {searchQuery
                                ? 'Tidak ada video ditemukan'
                                : 'Belum Ada Video'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {searchQuery
                                ? `Tidak ada video yang sesuai dengan "${searchQuery}"`
                                : 'Video akan muncul di sini ketika sudah tersedia.'}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {videos.map((video) => (
                                <VideoCard
                                    key={video.id}
                                    id={video.id}
                                    title={video.title}
                                    author="Lokal Berdaya"
                                    thumbnail={
                                        video.thumbnail &&
                                        typeof video.thumbnail === 'object' &&
                                        'original_url' in video.thumbnail
                                            ? video.thumbnail.original_url ||
                                              '/logo.png'
                                            : '/logo.png'
                                    }
                                    url={`/video/${video.slug || video.id}`}
                                />
                            ))}
                        </div>

                        <SimplePagination
                            prevPage={props.prev_page}
                            currentPage={props.current_page}
                            nextPage={props.next_page}
                            totalPage={props.total_page}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

VideoIndex.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
