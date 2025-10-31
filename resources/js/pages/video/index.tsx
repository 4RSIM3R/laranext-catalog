import { PublicLayout } from "@/layouts/public-layout";
import { Base } from "@/types/base";
import { Video } from "@/types/video";

type Props = {
    props: Base<Video[]>;
}

export default function VideoIndex({ props }: Props) {
    return (
        <div>
            <h1>Video Index</h1>
        </div>
    );
}

VideoIndex.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>;