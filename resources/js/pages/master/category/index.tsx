import { DeleteDialog } from '@/components/delete-dialog';
import NextTable from '@/components/next-table';
import { Button } from '@/components/ui/button';
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
import category from '@/routes/master/category';
import { Base } from '@/types/base';
import { Category } from '@/types/category';
import { Link, useForm } from '@inertiajs/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import axios from 'axios';
import { Eye, Plus, Trash } from 'lucide-react';
import { useCallback, useState } from 'react';

export default function CategoryIndex() {
    const [id, setId] = useState<any>();
    const { delete: destroy } = useForm();
    const helper = createColumnHelper<Category>();
    const [customParams, setCustomParams] = useState<Record<string, any>>({});

    const load = useCallback(
        async (params: Record<string, any>) => {
            const response = await axios.get<Base<Category[]>>(
                category.fetch().url,
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
        destroy(category.destroy(id).url, FormResponse);
    };

    const columns: ColumnDef<Category, any>[] = [
        helper.accessor('id', {
            id: 'id',
            header: 'ID',
            enableColumnFilter: false,
            enableHiding: false,
        }),
        helper.accessor('name', {
            id: 'name',
            header: 'Name',
            enableColumnFilter: false,
            enableHiding: false,
        }),
        helper.accessor('slug', {
            id: 'slug',
            header: 'Slug',
            enableColumnFilter: false,
            enableHiding: false,
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
                            href={category.show(row.row.original.id).url}
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
                        Category Management
                    </h1>
                    <p className="text-sm text-gray-500">
                        Manage your global categories
                    </p>
                </div>
                <Link href={category.create().url}>
                    <Button>
                        <Plus className="size-4" />
                        Add Category
                    </Button>
                </Link>
            </div>
            <NextTable<Category>
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

CategoryIndex.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
