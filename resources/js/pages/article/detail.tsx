import { PostCard } from '@/components/post-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PublicLayout } from '@/layouts/public-layout';
import { Article } from '@/types/article';
import { Link } from '@inertiajs/react';
import { Calendar, Copy, Facebook, Linkedin, Tag, Twitter } from 'lucide-react';
import { useState } from 'react';

type Props = {
    props: {
        article: Article;
        related: Article[];
    };
};

export default function PostDetail({ props }: Props) {
    const { article, related } = props;
    const [copied, setCopied] = useState(false);

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date(dateString));
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
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`,
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
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white py-16 dark:bg-gray-800">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="mb-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Link
                            href="/article"
                            className="transition-colors hover:text-primary"
                        >
                            Blog
                        </Link>
                        {article.category && (
                            <>
                                <span>/</span>
                                <span>{article.category.name}</span>
                            </>
                        )}
                    </div>

                    {/* Category Badge */}
                    {article.category && (
                        <Badge variant="default" className="mb-4">
                            <Tag className="mr-1 h-3 w-3" />
                            {article.category.name}
                        </Badge>
                    )}

                    {/* Title */}
                    <h1 className="mb-6 text-3xl leading-tight font-bold text-gray-900 md:text-4xl lg:text-5xl dark:text-gray-100">
                        {article.title}
                    </h1>

                    {/* Meta Information */}
                    <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <span className="font-semibold text-primary">
                                    LB
                                </span>
                            </div>
                            <span className="font-medium">Lokal Berdaya</span>
                        </div>
                        <Separator
                            orientation="vertical"
                            className="hidden h-4 sm:block"
                        />
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(article.created_at)}</span>
                        </div>
                    </div>

                    {/* Excerpt */}
                    {article.excerpt && (
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                            {article.excerpt}
                        </p>
                    )}
                </div>
            </div>

            {/* Featured Image */}
            {article.thumbnail &&
                typeof article.thumbnail === 'object' &&
                'original_url' in article.thumbnail && (
                    <div className="mx-auto -mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
                        <div className="aspect-video overflow-hidden rounded-lg shadow-xl">
                            <img
                                src={article.thumbnail.original_url}
                                alt={article.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                )}

            {/* Main Content */}
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Article Content */}
                    <div className="lg:col-span-2">
                        <Card className="p-8 md:p-12">
                            <article
                                className="prose prose-lg prose-gray dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        article.content ||
                                        '<p>Konten artikel tidak tersedia.</p>',
                                }}
                            />

                            <Separator className="my-8" />

                            {/* Share Section */}
                            <div>
                                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    Bagikan Artikel
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
                                        <Copy className="mr-2 h-4 w-4" />
                                        {copied ? 'Tersalin!' : 'Salin Link'}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Author Card */}
                            <Card className="p-6">
                                <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">
                                    Tentang Penulis
                                </h3>
                                <div className="flex items-start gap-3">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                        <span className="text-lg font-semibold text-primary">
                                            LB
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-gray-100">
                                            Lokal Berdaya
                                        </p>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            Platform untuk memberdayakan UMKM
                                            dan pengusaha lokal Indonesia
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            {/* Table of Contents (Optional) */}
                            <Card className="p-6">
                                <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">
                                    Artikel Terkait
                                </h3>
                                {related && related.length > 0 ? (
                                    <div className="space-y-4">
                                        {related
                                            .slice(0, 3)
                                            .map((relatedArticle) => (
                                                <Link
                                                    key={relatedArticle.id}
                                                    href={`/article/${relatedArticle.slug || relatedArticle.id}`}
                                                    className="group block"
                                                >
                                                    <h4 className="line-clamp-2 text-sm font-medium text-gray-900 transition-colors group-hover:text-primary dark:text-gray-100">
                                                        {relatedArticle.title}
                                                    </h4>
                                                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                                                        {formatDate(
                                                            relatedArticle.created_at,
                                                        )}
                                                    </p>
                                                </Link>
                                            ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Tidak ada artikel terkait
                                    </p>
                                )}
                            </Card>

                            {/* CTA Card */}
                            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 p-6">
                                <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                                    Ingin tahu lebih banyak?
                                </h3>
                                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                                    Ikuti kami untuk mendapatkan artikel dan
                                    update terbaru
                                </p>
                                <Button className="w-full" asChild>
                                    <Link href="/article">
                                        Lihat Semua Artikel
                                    </Link>
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* More Related Articles */}
                {related && related.length > 0 && (
                    <div className="mt-16">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                Baca Juga
                            </h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Artikel menarik lainnya untuk Anda
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {related.map((relatedArticle) => (
                                <div key={relatedArticle.id}>
                                    <PostCard
                                        id={relatedArticle.id}
                                        title={relatedArticle.title}
                                        author="Lokal Berdaya"
                                        date={relatedArticle.created_at}
                                        image={
                                            relatedArticle.thumbnail &&
                                            typeof relatedArticle.thumbnail ===
                                                'object' &&
                                            'original_url' in
                                                relatedArticle.thumbnail
                                                ? relatedArticle.thumbnail
                                                      .original_url ||
                                                  '/logo.png'
                                                : '/logo.png'
                                        }
                                        url={`/article/${relatedArticle.slug || relatedArticle.id}`}
                                    />
                                    {relatedArticle.category && (
                                        <Badge
                                            variant="secondary"
                                            className="mt-3"
                                        >
                                            {relatedArticle.category.name}
                                        </Badge>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

PostDetail.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
