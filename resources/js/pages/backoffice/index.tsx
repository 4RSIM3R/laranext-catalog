import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { AppLayout } from '@/layouts/app-layout';

export default function BackofficeIndex() {
    return (
        <div className="grid grid-cols-12 gap-4">
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Banner Data</CardTitle>
                    <CardDescription>Total Banner Created</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold">0</p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        Last Updated: 10/10/2025
                    </p>
                </CardFooter>
            </Card>
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Category Data</CardTitle>
                    <CardDescription>Total Category Created</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold">0</p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        Last Updated: 10/10/2025
                    </p>
                </CardFooter>
            </Card>
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Event Data</CardTitle>
                    <CardDescription>Total Event Created</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold">0</p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        Last Updated: 10/10/2025
                    </p>
                </CardFooter>
            </Card>
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>File Data</CardTitle>
                    <CardDescription>Total File Created</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold">0</p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        Last Updated: 10/10/2025
                    </p>
                </CardFooter>
            </Card>
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Post Data</CardTitle>
                    <CardDescription>Total Post Created</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold">0</p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        Last Updated: 10/10/2025
                    </p>
                </CardFooter>
            </Card>
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Product Data</CardTitle>
                    <CardDescription>Total Product Created</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold">0</p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        Last Updated: 10/10/2025
                    </p>
                </CardFooter>
            </Card>
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Video Data</CardTitle>
                    <CardDescription>Total Video Created</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold">0</p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        Last Updated: 10/10/2025
                    </p>
                </CardFooter>
            </Card>
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>User Data</CardTitle>
                    <CardDescription>Total User Created</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold">0</p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        Last Updated: 10/10/2025
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

BackofficeIndex.layout = (page: React.ReactNode) => (
    <AppLayout>{page}</AppLayout>
);
