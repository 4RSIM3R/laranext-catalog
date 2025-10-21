import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

interface SectionWrapperProps {
    title: string;
    seeMoreUrl?: string;
    children: React.ReactNode;
    className?: string;
}

export function SectionWrapper({
    title,
    seeMoreUrl,
    children,
    className = '',
}: SectionWrapperProps) {
    return (
        <section className={`w-full ${className}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-gray-100">
                        {title}
                    </h2>
                    {seeMoreUrl && (
                        <Button asChild variant="ghost" size="sm">
                            <Link href={seeMoreUrl}>
                                Lihat Semua
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    )}
                </div>
                {children}
            </div>
        </section>
    );
}
