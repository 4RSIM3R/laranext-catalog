import { Link } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
    name: string;
    icon: LucideIcon;
    url: string;
    count?: number;
}

export function CategoryCard({
    name,
    icon: Icon,
    url,
    count,
}: CategoryCardProps) {
    return (
        <Link href={url}>
            <div className="group flex flex-col items-center gap-3 text-center transition-all">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-gray-100 bg-white shadow-sm transition-all group-hover:border-primary/20 group-hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                    <Icon
                        className="h-10 w-10 text-primary transition-transform group-hover:scale-110"
                        strokeWidth={1.5}
                    />
                </div>
                <h3 className="max-w-[120px] text-sm font-medium text-gray-900 dark:text-gray-100">
                    {name}
                </h3>
            </div>
        </Link>
    );
}
