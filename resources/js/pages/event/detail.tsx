import { PublicLayout } from '@/layouts/public-layout';
import { Event } from '@/types/event';

type Props = {
    props: {
        event: Event;
        related: Event[];
    }
}

export default function EventDetail({ props }: Props) {
    return (
        <div>
            <h1>Event Detail</h1>
        </div>
    );
}

EventDetail.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
