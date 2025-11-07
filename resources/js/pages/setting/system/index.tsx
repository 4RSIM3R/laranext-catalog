import { DeleteDialog } from '@/components/delete-dialog';
import NextTable from '@/components/next-table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
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
import system from '@/routes/setting/system';
import { Base } from '@/types/base';
import { Setting } from '@/types/setting';
import { Link, useForm } from '@inertiajs/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import axios from 'axios';
import { Copy, Eye, Plus, Trash } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export default function SystemIndex() {
    const [id, setId] = useState<any>();
    const { delete: destroy } = useForm();
    const helper = createColumnHelper<Setting>();
    const [customParams, setCustomParams] = useState<Record<string, any>>({});

    const load = useCallback(
        async (params: Record<string, any>) => {
            const response = await axios.get<Base<Setting[]>>(
                system.fetch().url,
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
        destroy(system.destroy(id).url, FormResponse);
    };

    const copyToClipboard = (value: string) => {
        navigator.clipboard
            .writeText(value)
            .then(() => {
                toast.success('Value copied to clipboard!');
            })
            .catch(() => {
                toast.error('Failed to copy value');
            });
    };

    const columns: ColumnDef<Setting, any>[] = [
        helper.accessor('id', {
            id: 'id',
            header: 'ID',
            enableColumnFilter: false,
            enableHiding: false,
        }),
        helper.accessor('key', {
            id: 'key',
            header: 'Key',
            enableColumnFilter: false,
            enableHiding: false,
        }),
        helper.accessor('value', {
            id: 'value',
            header: 'Value',
            enableColumnFilter: false,
            enableHiding: false,
            cell: ({ row }) => (
                <>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Eye />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <p>{row.original.key} value is :</p>
                            <div className="flex items-center gap-2">
                                <Input
                                    value={row.original.value}
                                    readOnly={true}
                                    disabled={true}
                                />
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        copyToClipboard(row.original.value)
                                    }
                                    type="button"
                                >
                                    <Copy className="size-4" />
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </>
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
                            href={system.show(row.row.original.id).url}
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
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-xl font-semibold">
                        System Setting Management
                    </h1>
                    <p className="text-sm text-gray-500">
                        Manage your system settings
                    </p>
                </div>
                <Link href={system.create().url}>
                    <Button>
                        <Plus className="size-4" />
                        Add System Setting
                    </Button>
                </Link>
            </div>
            <NextTable<Setting>
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

SystemIndex.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
