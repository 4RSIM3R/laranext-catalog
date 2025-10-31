import { PublicLayout } from '@/layouts/public-layout';
import { Base } from '@/types/base';

type Props = {
    props: Base<Event[]>
}

export default function EventIndex({ props }: Props) {
    return (
        <div>
            <h1>Event Index</h1>
        </div>
    );
}

EventIndex.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
