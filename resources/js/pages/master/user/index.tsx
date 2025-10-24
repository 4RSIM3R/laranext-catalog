import { AppLayout } from '@/layouts/app-layout';

export default function UserIndex() {
    return (
        <div>
            <h1>User Index</h1>
        </div>
    );
}

UserIndex.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
