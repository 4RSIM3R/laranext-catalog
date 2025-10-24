import { PublicLayout } from "@/layouts/public-layout";

export default function About() {
    return (
        <div>
            <h1>About</h1>
        </div>
    );
}

About.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>;