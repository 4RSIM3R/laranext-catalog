import { ProductCard } from '@/components/product-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PublicLayout } from '@/layouts/public-layout';
import product from '@/routes/public/product';
import { Product } from '@/types/product';
import { Link } from '@inertiajs/react';
import {
    Facebook,
    Heart,
    Link2,
    Linkedin,
    MessageCircle,
    Package,
    Store,
    Tag,
    Twitter,
} from 'lucide-react';
import { useState } from 'react';

type Props = {
    props: {
        product: Product;
        related: Product[];
    };
};

export default function ProductDetail({ props }: Props) {
    const { product: productData, related } = props;
    const [isFavorite, setIsFavorite] = useState(false);
    const [copied, setCopied] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleWhatsAppContact = () => {
        const phoneNumber = productData.phone_number.replace(/[^0-9]/g, '');
        const message = `Halo, saya tertarik dengan produk ${productData.title}. Apakah masih tersedia?`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOnFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
            '_blank',
        );
    };

    const shareOnTwitter = () => {
        window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(productData.title)}`,
            '_blank',
        );
    };

    const shareOnLinkedIn = () => {
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
            '_blank',
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="mb-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Link
                        href={product.index().url}
                        className="transition-colors hover:text-primary"
                    >
                        Produk
                    </Link>
                    {productData.category && (
                        <>
                            <span>/</span>
                            <span>{productData.category.name}</span>
                        </>
                    )}
                    <span>/</span>
                    <span className="text-gray-900 dark:text-gray-100">
                        {productData.title}
                    </span>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column - Product Image & Info */}
                    <div className="lg:col-span-2">
                        <div className="space-y-6">
                            {/* Product Image */}
                            <Card className="overflow-hidden p-0">
                                <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                                    {productData.thumbnail?.original_url ? (
                                        <img
                                            src={
                                                productData.thumbnail
                                                    .original_url
                                            }
                                            alt={productData.title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <Package className="h-24 w-24 text-gray-400" />
                                        </div>
                                    )}

                                    {/* Category Badge */}
                                    {productData.category && (
                                        <div className="absolute top-4 left-4">
                                            <Badge variant="default">
                                                <Tag className="mr-1 h-3 w-3" />
                                                {productData.category.name}
                                            </Badge>
                                        </div>
                                    )}

                                    {/* Favorite Button */}
                                    <button
                                        onClick={() =>
                                            setIsFavorite(!isFavorite)
                                        }
                                        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 dark:bg-gray-800"
                                    >
                                        <Heart
                                            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`}
                                        />
                                    </button>
                                </div>
                            </Card>

                            {/* Product Details */}
                            <Card className="p-6 md:p-8">
                                <div className="mb-6">
                                    <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl dark:text-gray-100">
                                        {productData.title}
                                    </h1>
                                    {productData.excerpt && (
                                        <p className="text-lg text-gray-600 dark:text-gray-400">
                                            {productData.excerpt}
                                        </p>
                                    )}
                                </div>

                                <Separator className="my-6" />

                                {/* Description */}
                                <div>
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                                        Deskripsi Produk
                                    </h2>
                                    <div
                                        className="prose prose-gray dark:prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                productData.content ||
                                                '<p>Deskripsi produk tidak tersedia.</p>',
                                        }}
                                    />
                                </div>

                                <Separator className="my-6" />

                                {/* Share Section */}
                                <div>
                                    <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        Bagikan Produk
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={shareOnFacebook}
                                        >
                                            <Facebook className="mr-2 h-4 w-4" />
                                            Facebook
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={shareOnTwitter}
                                        >
                                            <Twitter className="mr-2 h-4 w-4" />
                                            Twitter
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={shareOnLinkedIn}
                                        >
                                            <Linkedin className="mr-2 h-4 w-4" />
                                            LinkedIn
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleCopyLink}
                                        >
                                            <Link2 className="mr-2 h-4 w-4" />
                                            {copied
                                                ? 'Tersalin!'
                                                : 'Salin Link'}
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Right Column - Purchase Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Price & Action Card */}
                            <Card className="overflow-hidden p-0">
                                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6">
                                    <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                                        Harga
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                        {formatPrice(productData.price)}
                                    </p>
                                </div>

                                <div className="p-6">
                                    <Button
                                        size="lg"
                                        className="mb-3 w-full"
                                        onClick={handleWhatsAppContact}
                                    >
                                        <MessageCircle className="mr-2 h-5 w-5" />
                                        Hubungi via WhatsApp
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full"
                                        onClick={() =>
                                            setIsFavorite(!isFavorite)
                                        }
                                    >
                                        <Heart
                                            className={`mr-2 h-5 w-5 ${isFavorite ? 'fill-current' : ''}`}
                                        />
                                        {isFavorite
                                            ? 'Hapus dari Favorit'
                                            : 'Tambah ke Favorit'}
                                    </Button>
                                </div>

                                <Separator />

                                <div className="p-6">
                                    <h4 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">
                                        Status Produk
                                    </h4>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Kondisi
                                            </span>
                                            <Badge variant="secondary">
                                                {productData.status || 'Baru'}
                                            </Badge>
                                        </div>
                                        {productData.category && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    Kategori
                                                </span>
                                                <Badge variant="outline">
                                                    {productData.category.name}
                                                </Badge>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>

                            {/* Seller Info Card */}
                            <Card className="p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                        <Store className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                            Penjual
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            UMKM Lokal Indonesia
                                        </p>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-start gap-2">
                                        <span className="mt-0.5 text-primary">
                                            ✓
                                        </span>
                                        <span>Produk berkualitas terjamin</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="mt-0.5 text-primary">
                                            ✓
                                        </span>
                                        <span>
                                            Mendukung UMKM lokal Indonesia
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="mt-0.5 text-primary">
                                            ✓
                                        </span>
                                        <span>
                                            Respons cepat melalui WhatsApp
                                        </span>
                                    </div>
                                </div>
                            </Card>

                            {/* CTA Card */}
                            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 p-6">
                                <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                                    Butuh Bantuan?
                                </h3>
                                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                                    Hubungi kami untuk informasi lebih lanjut
                                    tentang produk ini
                                </p>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={handleWhatsAppContact}
                                >
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Chat Sekarang
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                {related && related.length > 0 && (
                    <div className="mt-16">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                Produk Terkait
                            </h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Produk lain yang mungkin Anda sukai
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {related.map((relatedProduct) => (
                                <ProductCard
                                    key={relatedProduct.id}
                                    props={relatedProduct}
                                />
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <Button variant="outline" asChild>
                                <Link href={product.index().url}>
                                    <Package className="mr-2 h-4 w-4" />
                                    Lihat Semua Produk
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

ProductDetail.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
