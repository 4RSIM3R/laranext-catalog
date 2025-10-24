import { AppLayout } from "@/layouts/app-layout";

export default function VideoForm() {
    return (
        <div>
            <h1>Video Form</h1>
        </div>
    );
}

VideoForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;