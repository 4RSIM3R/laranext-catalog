import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { about, home } from '@/routes';
import article from '@/routes/public/article';
import event from '@/routes/public/event';
import product from '@/routes/public/product';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    Facebook,
    Instagram,
    Mail,
    Menu,
    Phone,
    Search,
    Twitter,
} from 'lucide-react';
import { useState } from 'react';

type Props = {
    children: React.ReactNode;
};

export const PublicLayout = ({ children }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { categories } = usePage<SharedData>().props;

    const pages = [
        { name: 'Home', href: home().url },
        { name: 'Produk', href: product.index().url },
        { name: 'Berita', href: article.index().url },
        { name: 'Acara', href: event.index().url },
        { name: 'Tentang', href: about().url },
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
                    {/* First Row: Logo | Search | Phone | Mobile Menu */}
                    <div className="flex items-center justify-between gap-4 py-4">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0">
                            <img
                                src="/logo.png"
                                alt="Lokal Berdaya"
                                className="h-12 w-auto"
                            />
                        </Link>

                        {/* Search Bar - Desktop */}
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

                        {/* Phone Number - Desktop */}
                        <div className="hidden items-center gap-2 text-sm xl:flex">
                            <Phone className="h-4 w-4 text-primary" />
                            <span className="font-medium text-gray-700">
                                +62 812-3456-7890
                            </span>
                        </div>

                        {/* Mobile Menu Button */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="lg:hidden"
                                >
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-80 p-0">
                                <SheetHeader className="border-b px-6 py-4">
                                    <SheetTitle className="flex items-center justify-center">
                                        <img
                                            src="/logo.png"
                                            alt="Lokal Berdaya"
                                            className="h-10 w-auto"
                                        />
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-col py-4">
                                    {/* Search in Mobile Menu */}
                                    <div className="px-6 pb-4">
                                        <div className="relative">
                                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                            <Input
                                                type="search"
                                                placeholder="Cari produk, berita..."
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>

                                    {/* Categories Section */}
                                    <div className="border-b pb-4">
                                        <h3 className="mb-2 px-6 text-sm font-semibold text-gray-500 uppercase">
                                            Kategori
                                        </h3>
                                        <div className="flex flex-col">
                                            {categories.map((category) => (
                                                <Link
                                                    key={category.id}
                                                    href=""
                                                    onClick={() =>
                                                        setIsOpen(false)
                                                    }
                                                    className="px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-primary"
                                                >
                                                    {category.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Pages Section */}
                                    <div className="border-b py-4">
                                        <h3 className="mb-2 px-6 text-sm font-semibold text-gray-500 uppercase">
                                            Menu
                                        </h3>
                                        <div className="flex flex-col">
                                            {pages.map((page) => (
                                                <Link
                                                    key={page.name}
                                                    href={page.href}
                                                    onClick={() =>
                                                        setIsOpen(false)
                                                    }
                                                    className="px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-primary"
                                                >
                                                    {page.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Contact Section */}
                                    <div className="py-4">
                                        <h3 className="mb-2 px-6 text-sm font-semibold text-gray-500 uppercase">
                                            Kontak
                                        </h3>
                                        <div className="flex flex-col gap-3 px-6">
                                            <a
                                                href="tel:+6281234567890"
                                                className="flex items-center gap-2 text-sm text-gray-600"
                                            >
                                                <Phone className="h-4 w-4 text-primary" />
                                                +62 812-3456-7890
                                            </a>
                                            <a
                                                href="mailto:info@lokalberdaya.id"
                                                className="flex items-center gap-2 text-sm text-gray-600"
                                            >
                                                <Mail className="h-4 w-4 text-primary" />
                                                info@lokalberdaya.id
                                            </a>
                                        </div>
                                    </div>

                                    {/* Social Media */}
                                    <div className="border-t px-6 pt-4">
                                        <h3 className="mb-3 text-sm font-semibold text-gray-500 uppercase">
                                            Ikuti Kami
                                        </h3>
                                        <div className="flex gap-4">
                                            {socialMedia.map((social) => (
                                                <a
                                                    key={social.name}
                                                    href={social.href}
                                                    className="text-gray-600 transition-colors hover:text-primary"
                                                >
                                                    <social.icon className="h-5 w-5" />
                                                    <span className="sr-only">
                                                        {social.name}
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Second Row: Categories Button | Page Links - Desktop Only */}
                    <div className="hidden items-center gap-6 border-t py-3 lg:flex">
                        {/* Categories Popover */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    Kategori
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-2">
                                <div className="flex flex-col gap-1">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            href=""
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
                            <img
                                src="/logo.png"
                                alt="Lokal Berdaya"
                                className="h-10 w-auto"
                            />
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
