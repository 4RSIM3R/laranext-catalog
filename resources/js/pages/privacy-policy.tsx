import { PublicLayout } from '@/layouts/public-layout';

export default function PrivacyPolicy() {
    return (
        <div>
            <h1>Privacy Policy</h1>
        </div>
    );
}

PrivacyPolicy.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
