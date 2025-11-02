import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Event } from '@/types/event';
import { Link } from '@inertiajs/react';

type Props = {
    event: Event;
};

export function EventCard({ event }: Props) {
    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    return (
        <Card className="group relative overflow-hidden p-0 transition-all hover:shadow-xl">
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                    src={event.thumbnail?.original_url}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                    <div>
                        <p className="mb-4 text-sm font-medium">
                            {formatDate(event.date)}
                        </p>
                        <h3 className="mb-3 text-xl leading-tight font-bold">
                            {event.title}
                        </h3>
                        <p className="mb-2 line-clamp-2 text-sm text-gray-200">
                            {event.content}
                        </p>
                        <Link
                            href=""
                            className="inline-block text-sm font-medium text-primary underline transition-colors hover:text-primary/80"
                        >
                            Read More
                        </Link>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            asChild
                            className="rounded-full bg-primary px-8 hover:bg-primary/90"
                        >
                            <Link href="">Daftar</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
