import { SimplePagination } from '@/components/simple-pagination';
import { Input } from '@/components/ui/input';
import { VideoCard } from '@/components/video-card';
import { PublicLayout } from '@/layouts/public-layout';
import { Base } from '@/types/base';
import { Video } from '@/types/video';
import { router } from '@inertiajs/react';
import { Play, Search, X } from 'lucide-react';
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
        <div className="min-h-screen bg-white py-12 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <div className="mb-4 flex items-center justify-center">
                        <Play className="mr-2 h-8 w-8 text-primary" />
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                            Video Gallery
                        </h1>
                    </div>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                        Jelajahi koleksi video inspiratif dan edukatif dari UMKM
                        lokal Indonesia
                    </p>
                </div>

                {/* Search Section */}
                <div className="mb-8">
                    <div className="relative mx-auto max-w-2xl">
                        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Cari video berdasarkan judul..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-12 pr-12 pl-12 text-base"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Videos Grid */}
                {videos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="mb-4 text-gray-400 dark:text-gray-600">
                            <Play className="mx-auto h-24 w-24" />
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
                                <VideoCard key={video.id} props={video} />
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
