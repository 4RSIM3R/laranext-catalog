import { CategoryCard } from '@/components/category-card';
import { EventCard } from '@/components/event-card';
import { HeroCarousel } from '@/components/hero-carousel';
import { LogoCloud } from '@/components/logo-cloud';
import { PostCard } from '@/components/post-card';
import { ProductCard } from '@/components/product-card';
import { SectionWrapper } from '@/components/section-wrapper';
import { VideoCard } from '@/components/video-card';
import { PublicLayout } from '@/layouts/public-layout';
import { Article } from '@/types/article';
import { Banner } from '@/types/banner';
import { Category } from '@/types/category';
import { Event } from '@/types/event';
import { Product } from '@/types/product';
import { Video } from '@/types/video';

type Props = {
    banner: Banner[];
    category: Category[];
    product: Product[];
    video: Video[];
    event: Event[];
    article: Article[];
};

export default function Home({
    banner,
    category,
    product,
    video,
    event,
    article,
}: Props) {
    return (
        <div className="space-y-16 py-8">
            {/* Hero Carousel Section */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <HeroCarousel slides={banner} />
            </section>

            {/* Categories Section */}
            <SectionWrapper title="Kategori Produk">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
                    {category.map((category) => (
                        <CategoryCard key={category.id} props={category} />
                    ))}
                </div>
            </SectionWrapper>

            {/* Latest Products Section */}
            <SectionWrapper title="Produk Terbaru" seeMoreUrl="/products">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {product.map((product) => (
                        <ProductCard key={product.id} props={product} />
                    ))}
                </div>
            </SectionWrapper>

            {/* Video Tutorial Section */}
            <SectionWrapper
                title="Video Tutorial"
                seeMoreUrl="/video"
                className="bg-gray-50 py-12 dark:bg-gray-900"
            >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {video.map((video) => (
                        <VideoCard key={video.id} props={video} />
                    ))}
                </div>
            </SectionWrapper>

            {/* Events Section */}
            <SectionWrapper title="Event & Pameran" seeMoreUrl="/events">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {event.map((event) => (
                        <EventCard key={event.id} props={event} />
                    ))}
                </div>
            </SectionWrapper>

            {/* Posts / News Section */}
            <SectionWrapper
                title="Berita & Artikel"
                seeMoreUrl="/article"
                className="bg-gray-50 py-12 dark:bg-gray-900"
            >
                <div className="no-scrollbar flex gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 xl:grid-cols-4">
                    {article.map((article) => (
                        <PostCard key={article.id} props={article} />
                    ))}
                </div>
            </SectionWrapper>

            {/* Partnership Section */}
            <SectionWrapper title="Mitra Kami">
                <LogoCloud logos={[]} />
            </SectionWrapper>
        </div>
    );
}

Home.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>;
