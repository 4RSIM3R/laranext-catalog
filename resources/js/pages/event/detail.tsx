import { EventCard } from '@/components/event-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PublicLayout } from '@/layouts/public-layout';
import { Event } from '@/types/event';
import { Bookmark, Calendar, Clock, MapPin, Share2, Users } from 'lucide-react';
import { useState } from 'react';

type Props = {
    props: {
        event: Event;
        related: Event[];
    };
};

export default function EventDetail({ props }: Props) {
    const { event, related } = props;
    const [isBookmarked, setIsBookmarked] = useState(false);

    const formatEventDate = (dateString: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    const formatEventTime = (dateString: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short',
        }).format(new Date(dateString));
    };

    const isEventPassed = (dateString: string) => {
        return new Date(dateString) < new Date();
    };

    const stripHtml = (html: string) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const eventPassed = isEventPassed(event.date);

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
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column - Event Details */}
                    <div className="lg:col-span-2">
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
                                            {formatEventDate(event.date)}
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
                                            {formatEventTime(event.date)}
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-primary/10 p-3">
                                        <MapPin className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Lokasi
                                        </p>
                                        <p className="mt-1 font-semibold text-gray-900 dark:text-gray-100">
                                            Akan diumumkan
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-primary/10 p-3">
                                        <Users className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Penyelenggara
                                        </p>
                                        <p className="mt-1 font-semibold text-gray-900 dark:text-gray-100">
                                            Lokal Berdaya
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
                                                text: stripHtml(event.content),
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

                    {/* Right Column - Registration Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            {/* Registration Card */}
                            <Card className="overflow-hidden p-0">
                                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6">
                                    <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        Gratis
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Daftar sekarang untuk mengikuti acara
                                        ini
                                    </p>
                                </div>

                                <div className="p-6">
                                    {eventPassed ? (
                                        <Button
                                            disabled
                                            size="lg"
                                            className="w-full"
                                        >
                                            Acara Telah Selesai
                                        </Button>
                                    ) : (
                                        <Button size="lg" className="w-full">
                                            <Calendar className="mr-2 h-5 w-5" />
                                            Daftar Sekarang
                                        </Button>
                                    )}

                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="mt-3 w-full"
                                        onClick={() =>
                                            setIsBookmarked(!isBookmarked)
                                        }
                                    >
                                        <Bookmark
                                            className={`mr-2 h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`}
                                        />
                                        {isBookmarked
                                            ? 'Tersimpan'
                                            : 'Simpan Acara'}
                                    </Button>
                                </div>

                                <Separator />

                                <div className="p-6">
                                    <h4 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">
                                        Informasi Penting
                                    </h4>
                                    <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                        <li className="flex items-start gap-2">
                                            <span className="mt-0.5 text-primary">
                                                •
                                            </span>
                                            <span>
                                                Pendaftaran dibuka hingga H-1
                                                acara
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-0.5 text-primary">
                                                •
                                            </span>
                                            <span>
                                                Konfirmasi kehadiran akan
                                                dikirim via email
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-0.5 text-primary">
                                                •
                                            </span>
                                            <span>
                                                Harap datang 15 menit sebelum
                                                acara dimulai
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </Card>
                        </div>
                    </div>
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
                                    id={relatedEvent.id}
                                    title={relatedEvent.title}
                                    description={stripHtml(
                                        relatedEvent.content,
                                    ).substring(0, 150)}
                                    date={relatedEvent.date}
                                    image={
                                        relatedEvent.thumbnail &&
                                        typeof relatedEvent.thumbnail ===
                                            'object' &&
                                        'original_url' in relatedEvent.thumbnail
                                            ? relatedEvent.thumbnail
                                                  .original_url || '/logo.png'
                                            : '/logo.png'
                                    }
                                    url={`/event/${relatedEvent.slug || relatedEvent.id}`}
                                    registerUrl={`/event/${relatedEvent.slug || relatedEvent.id}`}
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
