import { CategoryCard } from '@/components/category-card';
import { EventCard } from '@/components/event-card';
import { HeroCarousel } from '@/components/hero-carousel';
import { PostCard } from '@/components/post-card';
import { ProductCard } from '@/components/product-card';
import { SectionWrapper } from '@/components/section-wrapper';
import { VideoCard } from '@/components/video-card';
import { PublicLayout } from '@/layouts/public-layout';
import { Article } from '@/types/article';
import { Banner } from '@/types/banner';
import { Category } from '@/types/category';
import { Event } from '@/types/event';
import { Partner } from '@/types/partner';
import { Product } from '@/types/product';
import { Video } from '@/types/video';
import { Calendar, FileText, Layers, Package, PlayCircle } from 'lucide-react';

type Props = {
    banner: Banner[];
    category: Category[];
    product: Product[];
    video: Video[];
    event: Event[];
    article: Article[];
    partner: Partner[];
};

type EmptyStateProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
};

function EmptyState({ icon, title, description }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 py-12 text-center dark:border-gray-800">
            <div className="mb-4 text-gray-400 dark:text-gray-600">{icon}</div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                {description}
            </p>
        </div>
    );
}

export default function Home({
    banner,
    category,
    product,
    video,
    event,
    article,
    partner,
}: Props) {
    return (
        <div className="space-y-16 py-8">
            {/* Hero Carousel Section */}
            {banner.length > 0 ? (
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <HeroCarousel slides={banner} />
                </section>
            ) : (
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                        <div className="text-center">
                            <Layers className="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-600" />
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Belum Ada Banner
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Banner promosi akan muncul di sini
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* Categories Section */}
            <SectionWrapper title="Kategori Produk">
                {category.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
                        {category.map((category) => (
                            <CategoryCard key={category.id} props={category} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={<Layers className="h-16 w-16" />}
                        title="Belum Ada Kategori"
                        description="Kategori produk akan muncul di sini ketika sudah tersedia"
                    />
                )}
            </SectionWrapper>

            {/* Latest Products Section */}
            <SectionWrapper title="Produk Terbaru" seeMoreUrl="/product">
                {product.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {product.map((product) => (
                            <ProductCard key={product.id} props={product} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={<Package className="h-16 w-16" />}
                        title="Belum Ada Produk"
                        description="Produk UMKM lokal akan ditampilkan di sini"
                    />
                )}
            </SectionWrapper>

            {/* Video Tutorial Section */}
            <SectionWrapper
                title="Video Tutorial"
                seeMoreUrl="/video"
                className="bg-gray-50 py-12 dark:bg-gray-900"
            >
                {video.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {video.map((video) => (
                            <VideoCard key={video.id} props={video} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={<PlayCircle className="h-16 w-16" />}
                        title="Belum Ada Video"
                        description="Video tutorial dan panduan akan muncul di sini"
                    />
                )}
            </SectionWrapper>

            {/* Events Section */}
            <SectionWrapper title="Event & Pameran" seeMoreUrl="/event">
                {event.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {event.map((event) => (
                            <EventCard key={event.id} props={event} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={<Calendar className="h-16 w-16" />}
                        title="Belum Ada Event"
                        description="Informasi event dan pameran akan ditampilkan di sini"
                    />
                )}
            </SectionWrapper>

            {/* Posts / News Section */}
            <SectionWrapper
                title="Berita & Artikel"
                seeMoreUrl="/article"
                className="bg-gray-50 py-12"
            >
                {article.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {article.map((article) => (
                            <PostCard key={article.id} props={article} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={<FileText className="h-16 w-16" />}
                        title="Belum Ada Artikel"
                        description="Berita dan artikel terbaru akan muncul di sini"
                    />
                )}
            </SectionWrapper>

            {/* Partnership Section */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="mb-12 text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Mitra Lokal Berdaya
                    </h2>
                    {partner && partner.length > 0 ? (
                        <div className="flex flex-wrap items-center justify-center gap-8">
                            {partner.map((item) => (
                                <div
                                    key={item.id}
                                    className="group flex h-32 w-48 items-center justify-center rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                                    title={item.name}
                                >
                                    {item.logo?.original_url ? (
                                        <img
                                            src={item.logo.original_url}
                                            alt={item.name}
                                            className="h-auto max-h-20 w-full object-contain transition-all"
                                            onError={(e) => {
                                                const target =
                                                    e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                                const parent =
                                                    target.parentElement;
                                                if (parent) {
                                                    parent.innerHTML = `<span class="text-gray-400 dark:text-gray-500 font-medium">${item.name}</span>`;
                                                }
                                            }}
                                        />
                                    ) : (
                                        <span className="font-medium text-gray-400 dark:text-gray-500">
                                            {item.name}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon={<Layers className="h-16 w-16" />}
                            title="Belum Ada Mitra"
                            description="Informasi mitra dan partner akan muncul di sini"
                        />
                    )}
                </div>
            </section>
        </div>
    );
}

Home.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>;
