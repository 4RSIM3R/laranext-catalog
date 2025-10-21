import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Link } from '@inertiajs/react';
import {
    Building2,
    ChevronDown,
    Facebook,
    Instagram,
    Mail,
    Phone,
    Search,
    Twitter,
} from 'lucide-react';

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    // Dummy data
    const categories = [
        { id: 1, name: 'Produk Lokal', href: '/categories/produk-lokal' },
        { id: 2, name: 'Makanan & Minuman', href: '/categories/makanan' },
        { id: 3, name: 'Kerajinan', href: '/categories/kerajinan' },
        { id: 4, name: 'Fashion', href: '/categories/fashion' },
        { id: 5, name: 'Pertanian', href: '/categories/pertanian' },
    ];

    const pages = [
        { name: 'Home', href: '/' },
        { name: 'Produk', href: '/products' },
        { name: 'Berita', href: '/posts' },
        { name: 'Acara', href: '/events' },
        { name: 'Tentang', href: '/about' },
    ];

    const socialMedia = [
        { name: 'Facebook', icon: Facebook, href: '#' },
        { name: 'Instagram', icon: Instagram, href: '#' },
        { name: 'Twitter', icon: Twitter, href: '#' },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* First Row: Logo | Search | Phone */}
                    <div className="flex items-center justify-between gap-4 py-4">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-8 w-8 text-primary" />
                                <span className="text-xl font-bold text-gray-900">
                                    Lokal Berdaya
                                </span>
                            </div>
                        </Link>

                        {/* Search Bar */}
                        <div className="hidden flex-1 md:block md:max-w-md">
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="search"
                                    placeholder="Cari produk, berita..."
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="hidden items-center gap-2 text-sm lg:flex">
                            <Phone className="h-4 w-4 text-primary" />
                            <span className="font-medium text-gray-700">
                                +62 812-3456-7890
                            </span>
                        </div>
                    </div>

                    {/* Second Row: Categories Button | Page Links */}
                    <div className="flex items-center gap-6 border-t py-3">
                        {/* Categories Popover */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    <Building2 className="h-4 w-4" />
                                    Kategori
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-2">
                                <div className="flex flex-col gap-1">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            href={category.href}
                                            className="rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* Page Links */}
                        <div className="flex flex-wrap items-center gap-6">
                            {pages.map((page) => (
                                <Link
                                    key={page.name}
                                    href={page.href}
                                    className="text-sm font-medium text-gray-700 transition-colors hover:text-primary"
                                >
                                    {page.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Search Bar */}
                    <div className="pb-4 md:hidden">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                type="search"
                                placeholder="Cari produk, berita..."
                                className="pl-10"
                            />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="bg-white">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Grid 1: Logo and Description */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-6 w-6 text-primary" />
                                <span className="text-lg font-bold text-gray-900">
                                    Lokal Berdaya
                                </span>
                            </div>
                            <p className="text-sm text-gray-600">
                                Platform yang memberdayakan produk dan UMKM
                                lokal Indonesia untuk tumbuh dan berkembang di
                                era digital.
                            </p>
                        </div>

                        {/* Grid 2: Social Media */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">
                                Ikuti Kami
                            </h3>
                            <ul className="space-y-3">
                                {socialMedia.map((social) => (
                                    <li key={social.name}>
                                        <a
                                            href={social.href}
                                            className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary"
                                        >
                                            <social.icon className="h-4 w-4" />
                                            {social.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Grid 3: Pages */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">
                                Halaman
                            </h3>
                            <ul className="space-y-3">
                                {pages.map((page) => (
                                    <li key={page.name}>
                                        <Link
                                            href={page.href}
                                            className="text-sm text-gray-600 transition-colors hover:text-primary"
                                        >
                                            {page.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Grid 4: Contact */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">
                                Kontak
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="mailto:info@lokalberdaya.id"
                                        className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary"
                                    >
                                        <Mail className="h-4 w-4" />
                                        info@lokalberdaya.id
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="tel:+6281234567890"
                                        className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary"
                                    >
                                        <Phone className="h-4 w-4" />
                                        +62 812-3456-7890
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-12 border-t pt-8">
                        <p className="text-center text-sm text-gray-500">
                            © {new Date().getFullYear()} Lokal Berdaya. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
