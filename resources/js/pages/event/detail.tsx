import { EventCard } from '@/components/event-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PublicLayout } from '@/layouts/public-layout';
import { format_date } from '@/lib/format';
import { Event } from '@/types/event';
import { Calendar, Clock, Share2 } from 'lucide-react';

type Props = {
    props: {
        event: Event;
        related: Event[];
    };
};

export default function EventDetail({ props }: Props) {
    const { event, related } = props;

    const formatDateRange = () => {
        const start = format_date(event.start_date);
        if (event.end_date && event.end_date !== event.start_date) {
            const end = format_date(event.end_date);
            return `${start} - ${end}`;
        }
        return start;
    };

    const formatTimeRange = () => {
        if (!event.start_time && !event.end_time) {
            return 'Waktu akan diumumkan';
        }
        if (event.start_time && event.end_time) {
            return `${event.start_time} - ${event.end_time}`;
        }
        return event.start_time || event.end_time || '-';
    };

    const eventPassed = event.is_completed;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section with Event Image */}
            <div className="relative h-[400px] w-full overflow-hidden bg-gray-900">
                {event.thumbnail &&
                typeof event.thumbnail === 'object' &&
                'original_url' in event.thumbnail ? (
                    <>
                        <img
                            src={event.thumbnail.original_url}
                            alt={event.title}
                            className="h-full w-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </>
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                        <Calendar className="h-24 w-24 text-primary/40" />
                    </div>
                )}

                {/* Event Title Overlay */}
                <div className="absolute inset-0 flex items-end">
                    <div className="w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-12 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-7xl">
                            <div className="mb-4 flex flex-wrap gap-2">
                                <Badge
                                    variant={
                                        eventPassed ? 'secondary' : 'default'
                                    }
                                    className="text-sm"
                                >
                                    {eventPassed
                                        ? 'Acara Selesai'
                                        : 'Acara Mendatang'}
                                </Badge>
                            </div>
                            <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                                {event.title}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="space-y-8">
                    {/* Event Info Cards */}
                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="rounded-lg bg-primary/10 p-3">
                                    <Calendar className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Tanggal
                                    </p>
                                    <p className="mt-1 font-semibold text-gray-900 dark:text-gray-100">
                                        {formatDateRange()}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="rounded-lg bg-primary/10 p-3">
                                    <Clock className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Waktu
                                    </p>
                                    <p className="mt-1 font-semibold text-gray-900 dark:text-gray-100">
                                        {formatTimeRange()}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Event Description */}
                    <Card className="p-6 md:p-8">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Tentang Acara Ini
                        </h2>
                        <Separator className="mb-6" />
                        <div
                            className="prose prose-gray dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{
                                __html:
                                    event.content ||
                                    '<p>Informasi detail acara akan segera diumumkan.</p>',
                            }}
                        />
                    </Card>

                    {/* Share Section */}
                    <Card className="mt-8 p-6">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Bagikan Acara
                        </h3>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: event.title,
                                            text: event.excerpt,
                                            url: window.location.href,
                                        });
                                    }
                                }}
                            >
                                <Share2 className="mr-2 h-4 w-4" />
                                Bagikan
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Related Events Section */}
                {related && related.length > 0 && (
                    <div className="mt-16">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                Acara Lainnya
                            </h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Jelajahi acara menarik lainnya dari Lokal
                                Berdaya
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {related.map((relatedEvent) => (
                                <EventCard
                                    key={relatedEvent.id}
                                    props={relatedEvent}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

EventDetail.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
