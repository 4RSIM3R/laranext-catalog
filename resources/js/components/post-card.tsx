import { Badge } from '@/components/ui/badge';
import { format_date } from '@/lib/format';
import articleRoute from '@/routes/public/article';
import { Article } from '@/types/article';
import { Link } from '@inertiajs/react';
import { ArrowRight, Tag } from 'lucide-react';

type Props = {
    props: Article;
};

export function PostCard({ props }: Props) {
    return (
        <div className="group flex min-w-[280px] flex-shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl sm:min-w-[320px] lg:min-w-0">
            <Link href={articleRoute.show(props.slug).url}>
                <div className="aspect-video overflow-hidden bg-gray-100">
                    <img
                        src={props.thumbnail?.original_url}
                        alt={props.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </Link>
            <div className="flex flex-1 flex-col p-6">
                <p className="mb-3 text-xs text-gray-500">
                    Admin - {format_date(props.created_at)}
                </p>
                <Link href={articleRoute.show(props.slug).url}>
                    <h3 className="mb-4 line-clamp-2 min-h-[3rem] text-base leading-tight font-semibold text-gray-900 transition-colors hover:text-primary">
                        {props.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                        {props.excerpt}
                    </p>
                </Link>

                <Link
                    href={articleRoute.show(props.slug).url}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary transition-all hover:gap-3 hover:text-primary/80"
                >
                    Baca Selengkapnya
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            {/* Category and Tags */}
            <div className="flex flex-wrap gap-2 px-6 pb-6">
                {props.category && (
                    <Link
                        href={
                            articleRoute.index({
                                query: {
                                    'filter[category_id]': props.category.id,
                                },
                            }).url
                        }
                    >
                        <Badge variant="default">{props.category.name}</Badge>
                    </Link>
                )}
                {props.tags && (
                    <>
                        {props.tags
                            .split(',')
                            .map((tag) => tag.trim())
                            .filter((tag) => tag !== '')
                            .map((tag, index) => (
                                <Badge key={index} variant="secondary">
                                    <Tag className="mr-1 h-3 w-3" />
                                    {tag}
                                </Badge>
                            ))}
                    </>
                )}
            </div>
        </div>
    );
}
