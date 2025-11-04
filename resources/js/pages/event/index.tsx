import { EventCard } from '@/components/event-card';
import { SimplePagination } from '@/components/simple-pagination';
import { Input } from '@/components/ui/input';
import { PublicLayout } from '@/layouts/public-layout';
import { Base } from '@/types/base';
import { Event } from '@/types/event';
import { router } from '@inertiajs/react';
import { Calendar, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
    props: Base<Event[]>;
};

export default function EventIndex({ props }: Props) {
    const events = props.items || [];
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
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <div className="mb-4 flex items-center justify-center">
                        <Calendar className="mr-2 h-8 w-8 text-primary" />
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                            Acara & Kegiatan
                        </h1>
                    </div>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                        Temukan dan daftar untuk berbagai acara dan kegiatan
                        menarik dari Lokal Berdaya
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative mx-auto max-w-2xl">
                        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Cari acara berdasarkan nama..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-12 pl-12 text-base"
                        />
                    </div>
                </div>

                {/* Events Grid */}
                {events.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="mb-4 text-gray-400 dark:text-gray-600">
                            <Calendar className="mx-auto h-24 w-24" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {searchQuery
                                ? 'Tidak ada acara ditemukan'
                                : 'Belum Ada Acara'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {searchQuery
                                ? `Tidak ada acara yang sesuai dengan "${searchQuery}"`
                                : 'Acara akan muncul di sini ketika sudah tersedia.'}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {events.map((event) => (
                                <EventCard key={event.id} props={event} />
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

EventIndex.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
