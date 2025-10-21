import { CategoryCard } from '@/components/category-card';
import { EventCard } from '@/components/event-card';
import { HeroCarousel } from '@/components/hero-carousel';
import { LogoCloud } from '@/components/logo-cloud';
import { PostCard } from '@/components/post-card';
import { ProductCard } from '@/components/product-card';
import { SectionWrapper } from '@/components/section-wrapper';
import { VideoCard } from '@/components/video-card';
import { PublicLayout } from '@/layouts/public-layout';
import {
    Coffee,
    Leaf,
    Palette,
    Shirt,
    ShoppingBag,
    Sparkles,
    Utensils,
    Wrench,
} from 'lucide-react';

export default function Home() {
    // Dummy data for hero carousel
    const heroSlides = [
        {
            id: 1,
            title: 'Dukung UMKM Lokal Indonesia',
            description:
                'Temukan produk berkualitas dari pengrajin dan UMKM lokal Indonesia. Mari bersama memajukan ekonomi rakyat.',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
            categoryUrl: '/products',
            categoryLabel: 'Jelajahi Produk',
        },
        {
            id: 2,
            title: 'Produk Kerajinan Tangan Berkualitas',
            description:
                'Berbagai produk kerajinan tangan unik dari seluruh nusantara dengan kualitas terbaik.',
            image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1200&q=80',
            categoryUrl: '/categories/kerajinan',
            categoryLabel: 'Lihat Kerajinan',
        },
        {
            id: 3,
            title: 'Kuliner Nusantara Pilihan',
            description:
                'Nikmati kelezatan produk kuliner khas Indonesia dari berbagai daerah.',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
            categoryUrl: '/categories/kuliner',
            categoryLabel: 'Lihat Kuliner',
        },
    ];

    // Dummy data for categories
    const categories = [
        {
            id: 1,
            name: 'Kerajinan',
            icon: Palette,
            url: '/categories/kerajinan',
            count: 120,
        },
        {
            id: 2,
            name: 'Kuliner',
            icon: Utensils,
            url: '/categories/kuliner',
            count: 85,
        },
        {
            id: 3,
            name: 'Fashion',
            icon: Shirt,
            url: '/categories/fashion',
            count: 95,
        },
        {
            id: 4,
            name: 'Kopi Lokal',
            icon: Coffee,
            url: '/categories/kopi',
            count: 42,
        },
        {
            id: 5,
            name: 'Aksesoris',
            icon: ShoppingBag,
            url: '/categories/tas',
            count: 67,
        },
        {
            id: 6,
            name: 'Perkakas',
            icon: Wrench,
            url: '/categories/alat',
            count: 53,
        },
        {
            id: 7,
            name: 'Pertanian',
            icon: Leaf,
            url: '/categories/pertanian',
            count: 78,
        },
        {
            id: 8,
            name: 'Kosmetik',
            icon: Sparkles,
            url: '/categories/kosmetik',
            count: 61,
        },
    ];

    // Dummy data for products
    const products = [
        {
            id: 1,
            title: 'Tas Anyaman Rotan Handmade Premium',
            price: 250000,
            image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80',
            url: '/products/1',
        },
        {
            id: 2,
            title: 'Kopi Arabika Gayo Aceh 200g',
            price: 85000,
            image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80',
            url: '/products/2',
        },
        {
            id: 3,
            title: 'Batik Tulis Motif Parang Klasik',
            price: 450000,
            image: 'https://images.unsplash.com/photo-1610652492500-ded49ca1dfa9?w=500&q=80',
            url: '/products/3',
        },
        {
            id: 4,
            title: 'Keripik Singkong Pedas Manis 250g',
            price: 35000,
            image: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=500&q=80',
            url: '/products/4',
        },
        {
            id: 5,
            title: 'Sepatu Kulit Asli Handmade',
            price: 550000,
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80',
            url: '/products/5',
        },
        {
            id: 6,
            title: 'Sambal Matah Khas Bali 200ml',
            price: 45000,
            image: 'https://images.unsplash.com/photo-1596040033229-a0b3b83e6399?w=500&q=80',
            url: '/products/6',
        },
    ];

    // Dummy data for videos
    const videos = [
        {
            id: 1,
            title: 'Cara Memulai Usaha Kerajinan Tangan dari Nol',
            author: 'Budi Santoso',
            thumbnail:
                'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=500&q=80',
            url: '/videos/1',
        },
        {
            id: 2,
            title: 'Tips Memasarkan Produk UMKM Secara Online',
            author: 'Siti Rahmawati',
            thumbnail:
                'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=500&q=80',
            url: '/videos/2',
        },
        {
            id: 3,
            title: 'Teknik Batik Tulis untuk Pemula',
            author: 'Ahmad Wijaya',
            thumbnail:
                'https://images.unsplash.com/photo-1610652492500-ded49ca1dfa9?w=500&q=80',
            url: '/videos/3',
        },
    ];

    // Dummy data for events
    const events = [
        {
            id: 1,
            title: 'Pameran UMKM Jakarta 2025',
            date: '2025-11-15',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80',
            url: '/events/1',
        },
        {
            id: 2,
            title: 'Workshop Digital Marketing untuk UMKM',
            date: '2025-11-20',
            image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&q=80',
            url: '/events/2',
        },
        {
            id: 3,
            title: 'Bazar Produk Lokal Nusantara',
            date: '2025-12-01',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80',
            url: '/events/3',
        },
    ];

    // Dummy data for posts
    const posts = [
        {
            id: 1,
            title: 'Strategi Meningkatkan Penjualan UMKM di Era Digital',
            date: '2025-10-15',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80',
            url: '/posts/1',
            excerpt:
                'Pelajari strategi efektif untuk meningkatkan penjualan UMKM Anda di era digital dengan memanfaatkan teknologi.',
        },
        {
            id: 2,
            title: 'Kisah Sukses UMKM Batik Menembus Pasar Internasional',
            date: '2025-10-12',
            image: 'https://images.unsplash.com/photo-1610652492500-ded49ca1dfa9?w=500&q=80',
            url: '/posts/2',
            excerpt:
                'Inspirasi dari pengusaha UMKM batik yang berhasil mengekspor produknya ke mancanegara.',
        },
        {
            id: 3,
            title: 'Tips Mengelola Keuangan UMKM untuk Pemula',
            date: '2025-10-10',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&q=80',
            url: '/posts/3',
            excerpt:
                'Panduan lengkap mengelola keuangan UMKM agar bisnis Anda terus berkembang dan menguntungkan.',
        },
    ];

    // Dummy data for partner logos
    const partnerLogos = [
        {
            id: 1,
            name: 'Kementerian Koperasi dan UKM',
            image: 'https://jenama.co/wp-content/uploads/2025/01/NEW_logo-jenama-merger-02.png',
        },
        {
            id: 2,
            name: 'Bank Indonesia',
            image: 'https://jenama.co/wp-content/uploads/2025/01/NEW_logo-jenama-merger-02.png',
        },
        {
            id: 3,
            name: 'Tokopedia',
            image: 'https://jenama.co/wp-content/uploads/2025/01/NEW_logo-jenama-merger-02.png',
        },
        {
            id: 4,
            name: 'Bukalapak',
            image: 'https://jenama.co/wp-content/uploads/2025/01/NEW_logo-jenama-merger-02.png',
        },
        {
            id: 5,
            name: 'Shopee',
            image: 'https://jenama.co/wp-content/uploads/2025/01/NEW_logo-jenama-merger-02.png',
        },
        {
            id: 6,
            name: 'Gojek',
            image: 'https://jenama.co/wp-content/uploads/2025/01/NEW_logo-jenama-merger-02.png',
        },
    ];

    return (
        <div className="space-y-16 py-8">
            {/* Hero Carousel Section */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <HeroCarousel slides={heroSlides} />
            </section>

            {/* Categories Section */}
            <SectionWrapper title="Kategori Produk" seeMoreUrl="/categories">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            name={category.name}
                            icon={category.icon}
                            url={category.url}
                            count={category.count}
                        />
                    ))}
                </div>
            </SectionWrapper>

            {/* Latest Products Section */}
            <SectionWrapper title="Produk Terbaru" seeMoreUrl="/products">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            image={product.image}
                            url={product.url}
                        />
                    ))}
                </div>
            </SectionWrapper>

            {/* Video Tutorial Section */}
            <SectionWrapper
                title="Video Tutorial"
                seeMoreUrl="/videos"
                className="bg-gray-50 py-12 dark:bg-gray-900"
            >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {videos.map((video) => (
                        <VideoCard
                            key={video.id}
                            id={video.id}
                            title={video.title}
                            author={video.author}
                            thumbnail={video.thumbnail}
                            url={video.url}
                        />
                    ))}
                </div>
            </SectionWrapper>

            {/* Events Section */}
            <SectionWrapper title="Event & Pameran" seeMoreUrl="/events">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            image={event.image}
                            url={event.url}
                        />
                    ))}
                </div>
            </SectionWrapper>

            {/* Posts / News Section */}
            <SectionWrapper
                title="Berita & Artikel"
                seeMoreUrl="/posts"
                className="bg-gray-50 py-12 dark:bg-gray-900"
            >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            date={post.date}
                            image={post.image}
                            url={post.url}
                            excerpt={post.excerpt}
                        />
                    ))}
                </div>
            </SectionWrapper>

            {/* Partnership Section */}
            <SectionWrapper title="Mitra Kami">
                <LogoCloud logos={partnerLogos} />
            </SectionWrapper>
        </div>
    );
}

Home.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>;
