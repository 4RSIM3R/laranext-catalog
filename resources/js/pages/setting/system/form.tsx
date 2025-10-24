import { AppLayout } from "@/layouts/app-layout";

export default function SystemForm() {
    return (
        <div>
            <h1>System Form</h1>
        </div>
    );
}

SystemForm.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;