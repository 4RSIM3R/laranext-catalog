import { DeleteDialog } from '@/components/delete-dialog';
import NextTable from '@/components/next-table';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { AppLayout } from '@/layouts/app-layout';
import { FormResponse } from '@/lib/constant';
import { date_format } from '@/lib/format';
import banner from '@/routes/master/banner';
import { Banner } from '@/types/banner';
import { Base } from '@/types/base';
import { Link, useForm } from '@inertiajs/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import axios from 'axios';
import { ExternalLink, Eye, Plus, Trash } from 'lucide-react';
import { useCallback, useState } from 'react';

export default function BannerIndex() {
    const [id, setId] = useState<any>();
    const [previewBanner, setPreviewBanner] = useState<Banner | null>(null);
    const { delete: destroy } = useForm();
    const helper = createColumnHelper<Banner>();
    const [customParams, setCustomParams] = useState<Record<string, any>>({});

    const load = useCallback(
        async (params: Record<string, any>) => {
            const response = await axios.get<Base<Banner[]>>(
                banner.fetch().url,
                {
                    params: {
                        ...params,
                        ...customParams,
                    },
                },
            );
            return response.data;
        },
        [customParams],
    );

    const onDelete = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        destroy(banner.destroy(id).url, FormResponse);
    };

    const columns: ColumnDef<Banner, any>[] = [
        helper.accessor('id', {
            id: 'id',
            header: 'ID',
            enableColumnFilter: false,
            enableHiding: false,
        }),
        helper.accessor('title', {
            id: 'title',
            header: 'Title',
            enableColumnFilter: false,
            enableHiding: false,
        }),
        helper.display({
            id: 'preview',
            header: 'Preview Banner',
            enableColumnFilter: false,
            enableHiding: false,
            cell: (row) => (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPreviewBanner(row.row.original)}
                >
                    <Eye /> Preview
                </Button>
            ),
        }),
        helper.display({
            id: 'created_at',
            header: 'Created At',
            enableColumnFilter: false,
            enableHiding: false,
            cell: (row) => date_format(row.row.original.created_at),
        }),
        helper.display({
            id: 'updated_at',
            header: 'Updated At',
            enableColumnFilter: false,
            enableHiding: false,
            cell: (row) => date_format(row.row.original.updated_at),
        }),
        helper.display({
            id: 'action',
            header: 'Action',
            enableColumnFilter: false,
            enableHiding: false,
            cell: (row) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            Action
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                        <Link
                            href={banner.show(row.row.original.id).url}
                            method="get"
                        >
                            <DropdownMenuItem>
                                <Eye /> Detail
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-500 hover:text-red-500"
                            onClick={(e) => {
                                e.preventDefault();
                                setId(row.row.original.id);
                            }}
                        >
                            <Trash className="text-red-500" />
                            <span className="text-red-500">Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        }),
    ];

    return (
        <div className="flex flex-col gap-4">
            <DeleteDialog id={id} onDelete={onDelete} onOpenChange={setId} />

            <Dialog
                open={!!previewBanner}
                onOpenChange={(open) => !open && setPreviewBanner(null)}
            >
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Banner Preview</DialogTitle>
                        <DialogDescription>
                            Preview how this banner will appear on the homepage
                        </DialogDescription>
                    </DialogHeader>
                    {previewBanner && (
                        <div className="space-y-4">
                            {/* Banner Preview - matching HeroCarousel style */}
                            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl md:h-[500px]">
                                {previewBanner.thumbnail && (
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(${
                                                typeof previewBanner.thumbnail ===
                                                    'object' &&
                                                'original_url' in
                                                    previewBanner.thumbnail
                                                    ? previewBanner.thumbnail
                                                          .original_url
                                                    : ''
                                            })`,
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
                                    </div>
                                )}
                                <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-16">
                                    <h1 className="mb-4 max-w-2xl text-3xl font-bold text-white md:text-5xl">
                                        {previewBanner.title}
                                    </h1>
                                    <p className="mb-6 max-w-xl text-base text-gray-200 md:text-lg">
                                        {previewBanner.subtitle}
                                    </p>
                                    <div>
                                        <Button
                                            asChild
                                            size="lg"
                                            className="bg-white text-gray-900 hover:bg-gray-100"
                                        >
                                            <a
                                                href={previewBanner.button_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {previewBanner.button_text}
                                                <ExternalLink className="ml-2 h-4 w-4" />
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Banner Details */}
                            <div className="rounded-lg border bg-muted/50 p-4">
                                <h3 className="mb-2 text-sm font-semibold">
                                    Banner Details:
                                </h3>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                    <p>
                                        <span className="font-medium">
                                            Button Link:
                                        </span>{' '}
                                        {previewBanner.button_link}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-xl font-semibold">Banner Management</h1>
                    <p className="text-sm text-gray-500">Manage your banners</p>
                </div>
                <Link href={banner.create().url}>
                    <Button>
                        <Plus className="size-4" />
                        Add Banner
                    </Button>
                </Link>
            </div>
            <NextTable<Banner>
                enableSelect={false}
                load={load}
                id="id"
                columns={columns}
                filterComponent={
                    <Input
                        value={customParams['filter[name]']}
                        onChange={(e) =>
                            setCustomParams({
                                ...customParams,
                                'filter[name]': e.target.value,
                            })
                        }
                        placeholder="Search..."
                    />
                }
            />
        </div>
    );
}

BannerIndex.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
