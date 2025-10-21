import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { PublicLayout } from '@/layouts/public-layout';
import { type BreadcrumbItem } from '@/types';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Partnership() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Beranda', href: '/' },
        { title: 'Kemitraan', href: '/partnership' },
    ];

    return (
        <div className="space-y-0">
            {/* Hero Title Section */}
            <div className="bg-gray-200 py-16 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-center text-4xl font-bold text-gray-900 md:text-5xl dark:text-gray-100">
                        Kemitraan
                    </h1>
                </div>
            </div>

            {/* Breadcrumb Section */}
            <div className="bg-white py-4 dark:bg-gray-950">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>

            {/* Main Content Grid Section */}
            <div className="bg-white py-12 dark:bg-gray-950">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Contact Us Section */}
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <p className="text-sm font-semibold tracking-wider text-orange-600 uppercase">
                                    Kemitraan
                                </p>
                                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-gray-100">
                                    Hubungi Kami
                                </h2>
                            </div>

                            <div className="space-y-8">
                                {/* Phone */}
                                <div className="flex items-start gap-4">
                                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Nomor Telepon
                                        </p>
                                        <a
                                            href="tel:+6282223122243"
                                            className="text-lg font-semibold text-gray-900 hover:text-orange-600 dark:text-gray-100 dark:hover:text-orange-500"
                                        >
                                            0822 2312 2243
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Alamat Email
                                        </p>
                                        <a
                                            href="mailto:Tyrostudio@gmail.com"
                                            className="text-lg font-semibold text-gray-900 hover:text-orange-600 dark:text-gray-100 dark:hover:text-orange-500"
                                        >
                                            Tyrostudio@gmail.com
                                        </a>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-4">
                                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Alamat Kantor Kami
                                        </p>
                                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            8502 Preston Rd. Inglewood, Maine
                                            98380
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Google Maps Section */}
                        <div className="space-y-6">
                            <div className="rounded-lg bg-gray-900 px-6 py-4">
                                <h3 className="text-xl font-bold text-white md:text-2xl">
                                    Lokasi Kantor Kami
                                </h3>
                            </div>
                            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.1951398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sMonumen%20Nasional!5e0!3m2!1sen!2sid!4v1234567890"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps Location"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div
                className="relative bg-cover bg-center py-16"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(234, 88, 12, 0.9), rgba(194, 65, 12, 0.9)), url(https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80)',
                }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div className="space-y-2 text-center md:text-left">
                            <p className="text-sm tracking-wider text-orange-100 uppercase">
                                Butuh solusi buat kembangkan bisnismu?
                            </p>
                            <h2 className="text-2xl font-bold text-white md:text-3xl">
                                Kami Menanti Telepon Dari Anda
                            </h2>
                        </div>
                        <Button
                            asChild
                            size="lg"
                            className="bg-green-600 hover:bg-green-700"
                        >
                            <a
                                href="https://wa.me/6282223122243"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                Whatsapp Kami
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

Partnership.layout = (page: React.ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
