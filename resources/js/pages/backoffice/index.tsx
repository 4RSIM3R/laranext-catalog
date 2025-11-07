import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { AppLayout } from '@/layouts/app-layout';
import { date_format } from '@/lib/format';

type Props = {
    article: number;
    banner: number;
    category: number;
    event: number;
    file: number;
    product: number;
    video: number;
    user: number;
};

export default function BackofficeIndex({
    article,
    banner,
    category,
    event,
    file,
    product,
    video,
    user,
}: Props) {
    return (
        <div className="grid grid-cols-12 gap-4">
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Article Data</CardTitle>
                    <CardDescription>Total Article Created</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold">{article}</p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        Last Updated: {date_format(Date.now())}
                    </p>
                </CardFooter>
            </Card>
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Banner Data</CardTitle>
                    <CardDescription>Total Banner Created</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold">{banner}</p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        Last Updated: {date_format(Date.now())}
                    </p>
                </CardFooter>
            </Card>
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Category Data</CardTitle>
                    <CardDescription>Total Category Created</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold">{category}</p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        Last Updated: {date_format(Date.now())}
                    </p>
                </CardFooter>
            </Card>
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Event Data</CardTitle>
                    <CardDescription>Total Event Created</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold">{event}</p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        Last Updated: {date_format(Date.now())}
                    </p>
                </CardFooter>
            </Card>
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>File Data</CardTitle>
                    <CardDescription>Total File Created</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold">{file}</p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        Last Updated: {date_format(Date.now())}
                    </p>
                </CardFooter>
            </Card>
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Product Data</CardTitle>
                    <CardDescription>Total Product Created</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold">{product}</p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        Last Updated: {date_format(Date.now())}
                    </p>
                </CardFooter>
            </Card>
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Video Data</CardTitle>
                    <CardDescription>Total Video Created</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold">{video}</p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        Last Updated: {date_format(Date.now())}
                    </p>
                </CardFooter>
            </Card>
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>User Data</CardTitle>
                    <CardDescription>Total User Created</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold">{user}</p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        Last Updated: {date_format(Date.now())}
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

BackofficeIndex.layout = (page: React.ReactNode) => (
    <AppLayout>{page}</AppLayout>
);
