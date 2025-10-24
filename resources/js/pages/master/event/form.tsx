import { AppLayout } from "@/layouts/app-layout";

export default function EventForm() {
    return (
        <div>
            <h1>Event Form</h1>
        </div>
    );
}

EventForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;