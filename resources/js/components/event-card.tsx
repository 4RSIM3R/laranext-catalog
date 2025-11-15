import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { format_date } from '@/lib/format';
import event from '@/routes/public/event';
import { Event } from '@/types/event';
import { Link } from '@inertiajs/react';

type Props = {
    props: Event;
};

export function EventCard({ props }: Props) {
    const formatDateRange = () => {
        const start = format_date(props.start_date);
        if (props.end_date && props.end_date !== props.start_date) {
            const end = format_date(props.end_date);
            return `${start} - ${end}`;
        }
        return start;
    };

    return (
        <Card
            className={`group relative overflow-hidden p-0 transition-all hover:shadow-xl ${props.is_completed ? 'opacity-75 grayscale' : ''}`}
        >
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                    src={props.thumbnail?.original_url}
                    alt={props.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                {props.is_completed && (
                    <div className="absolute top-4 right-4 rounded-full bg-gray-500 px-3 py-1 text-xs font-medium text-white">
                        Selesai
                    </div>
                )}
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                    <div>
                        <p className="mb-4 text-sm font-medium">
                            {formatDateRange()}
                            {props.start_time && (
                                <span className="ml-2">
                                    • {props.start_time}
                                </span>
                            )}
                        </p>
                        <h3 className="mb-3 text-xl leading-tight font-bold">
                            {props.title}
                        </h3>
                        <p className="mb-2 line-clamp-2 text-sm text-gray-200">
                            {props.excerpt}
                        </p>
                        <Link
                            href={event.show(props.slug).url}
                            className="inline-block text-sm font-medium text-primary underline transition-colors hover:text-primary/80"
                        >
                            Selengkapnya
                        </Link>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            asChild
                            className="rounded-full bg-primary px-8 hover:bg-primary/90"
                        >
                            <Link href={event.show(props.slug).url}>
                                Selengkapnya
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
