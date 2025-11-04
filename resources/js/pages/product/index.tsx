import { ProductCard } from '@/components/product-card';
import { SimplePagination } from '@/components/simple-pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PublicLayout } from '@/layouts/public-layout';
import { Base } from '@/types/base';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import { router } from '@inertiajs/react';
import { Filter, Package, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
    props: Base<Product[]>;
    categories: Category[];
};

export default function ProductIndex({ props, categories }: Props) {
    const products = props.items || [];
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [showFilters, setShowFilters] = useState(false);

    // Initialize filters from URL on mount
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const filterTitle = urlParams.get('filter[title]');
        const filterCategory = urlParams.get('filter[category_id]');

        if (filterTitle) {
            setSearchQuery(filterTitle);
        }
        if (filterCategory) {
            setSelectedCategory(filterCategory);
        }
    }, []);

    // Handle search and filter changes
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const params: Record<string, string> = {};

            if (searchQuery) {
                params['filter[title]'] = searchQuery;
            }

            if (selectedCategory) {
                params['filter[category_id]'] = selectedCategory;
            }

            router.get(window.location.pathname, params, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, selectedCategory]);

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        router.get(
            window.location.pathname,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const hasActiveFilters = searchQuery || selectedCategory;

    return (
        <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <div className="mb-4 flex items-center justify-center">
                        <Package className="mr-2 h-8 w-8 text-primary" />
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                            Produk Lokal
                        </h1>
                    </div>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                        Temukan berbagai produk berkualitas dari UMKM lokal
                        Indonesia
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-8 space-y-4">
                    {/* Search Bar */}
                    <div className="relative mx-auto max-w-2xl">
                        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Cari produk berdasarkan nama..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-12 pr-12 pl-12 text-base"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    {/* Filter Toggle Button (Mobile) */}
                    <div className="flex justify-center md:hidden">
                        <Button
                            variant="outline"
                            onClick={() => setShowFilters(!showFilters)}
                            className="gap-2"
                        >
                            <Filter className="h-4 w-4" />
                            {showFilters ? 'Sembunyikan' : 'Tampilkan'} Filter
                        </Button>
                    </div>

                    {/* Filters */}
                    <div
                        className={`mx-auto max-w-4xl space-y-4 ${showFilters ? 'block' : 'hidden'} md:block`}
                    >
                        <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between dark:bg-gray-800">
                            <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
                                {/* Category Filter */}
                                <div className="flex-1">
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Kategori
                                    </label>
                                    <Select
                                        value={selectedCategory || 'all'}
                                        onValueChange={(value) =>
                                            setSelectedCategory(
                                                value === 'all' ? '' : value,
                                            )
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Semua Kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                Semua Kategori
                                            </SelectItem>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id.toString()}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Clear Filters Button */}
                            {hasActiveFilters && (
                                <Button
                                    variant="ghost"
                                    onClick={handleClearFilters}
                                    className="gap-2"
                                >
                                    <X className="h-4 w-4" />
                                    Hapus Filter
                                </Button>
                            )}
                        </div>

                        {/* Active Filters Display */}
                        {hasActiveFilters && (
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Filter aktif:
                                </span>
                                {searchQuery && (
                                    <Badge
                                        variant="secondary"
                                        className="gap-1"
                                    >
                                        Pencarian: {searchQuery}
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="ml-1 hover:text-gray-900"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                )}
                                {selectedCategory && (
                                    <Badge
                                        variant="secondary"
                                        className="gap-1"
                                    >
                                        Kategori:{' '}
                                        {
                                            categories.find(
                                                (c) =>
                                                    c.id.toString() ===
                                                    selectedCategory,
                                            )?.name
                                        }
                                        <button
                                            onClick={() =>
                                                setSelectedCategory('')
                                            }
                                            className="ml-1 hover:text-gray-900"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Products Grid */}
                {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="mb-4 text-gray-400 dark:text-gray-600">
                            <Package className="mx-auto h-24 w-24" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {hasActiveFilters
                                ? 'Tidak ada produk ditemukan'
                                : 'Belum Ada Produk'}
                        </h3>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">
                            {hasActiveFilters
                                ? 'Tidak ada produk yang sesuai dengan filter Anda'
                                : 'Produk akan muncul di sini ketika sudah tersedia.'}
                        </p>
                        {hasActiveFilters && (
                            <Button
                                variant="outline"
                                onClick={handleClearFilters}
                            >
                                Hapus Semua Filter
                            </Button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products.map((product) => (
                                <ProductCard key={product.id} props={product} />
                            ))}
                        </div>

                        <SimplePagination
                            prevPage={props.prev_page}
                            currentPage={props.current_page}
                            nextPage={props.next_page}
                            totalPage={props.total_page}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

ProductIndex.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
