import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SimplePaginationProps {
    prevPage: number | null | undefined;
    currentPage: number | null | undefined;
    nextPage: number | null | undefined;
    totalPage: number | null | undefined;
}

export function SimplePagination({
    prevPage,
    currentPage,
    nextPage,
    totalPage,
}: SimplePaginationProps) {
    const handlePageChange = (page: number) => {
        router.get(
            window.location.pathname,
            { page },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    if (!totalPage || totalPage <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-center gap-2 py-8">
            <Button
                variant="outline"
                size="sm"
                onClick={() => prevPage && handlePageChange(prevPage)}
                disabled={!prevPage}
                className="gap-1"
            >
                <ChevronLeft className="h-4 w-4" />
                Previous
            </Button>

            <div className="flex items-center gap-2">
                {Array.from({ length: totalPage }, (_, i) => i + 1).map(
                    (page) => {
                        // Show first page, last page, current page, and pages around current
                        const showPage =
                            page === 1 ||
                            page === totalPage ||
                            (currentPage && Math.abs(page - currentPage) <= 1);

                        // Show ellipsis
                        const showEllipsisBefore =
                            currentPage &&
                            page === currentPage - 2 &&
                            currentPage > 3;
                        const showEllipsisAfter =
                            currentPage &&
                            page === currentPage + 2 &&
                            currentPage < totalPage - 2;

                        if (showEllipsisBefore || showEllipsisAfter) {
                            return (
                                <span key={page} className="px-2 text-gray-500">
                                    ...
                                </span>
                            );
                        }

                        if (!showPage) {
                            return null;
                        }

                        return (
                            <Button
                                key={page}
                                variant={
                                    page === currentPage ? 'default' : 'outline'
                                }
                                size="sm"
                                onClick={() => handlePageChange(page)}
                                className="min-w-[2.5rem]"
                            >
                                {page}
                            </Button>
                        );
                    },
                )}
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={() => nextPage && handlePageChange(nextPage)}
                disabled={!nextPage}
                className="gap-1"
            >
                Next
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
