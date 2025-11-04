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
import { about, home, partnership } from '@/routes';
import article from '@/routes/public/article';
import event from '@/routes/public/event';
import product from '@/routes/public/product';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    Menu,
    Phone,
    Search,
    Twitter,
    User,
    Youtube,
} from 'lucide-react';
import { useState } from 'react';

type Props = {
    children: React.ReactNode;
};

export const PublicLayout = ({ children }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { categories } = usePage<SharedData>().props;

    const pages = [
        { name: 'Beranda', href: home().url },
        { name: 'Produk', href: product.index().url },
        { name: 'Video', href: '#' },
        { name: 'Event', href: event.index().url },
        { name: 'Berita', href: article.index().url },
        { name: 'Tentang Kami', href: about().url },
        { name: 'Kemitraan', href: partnership().url },
    ];

    const socialMedia = [
        {
            name: 'Facebook',
            icon: Facebook,
            href: '#',
            username: 'Lokalberdaya',
        },
        { name: 'Twitter', icon: Twitter, href: '#', username: 'Lokalberdaya' },
        {
            name: 'Instagram',
            icon: Instagram,
            href: '#',
            username: 'Lokalberdaya',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            href: '#',
            username: 'Lokalberdaya',
        },
        { name: 'YouTube', icon: Youtube, href: '#', username: 'Lokalberdaya' },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* First Row: Logo | Search | Contact | Mobile Menu */}
                    <div className="flex items-center justify-between gap-4 py-4">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0">
                            <img
                                src="/logo.png"
                                alt="Lokal Berdaya"
                                className="h-10 w-auto md:h-12"
                            />
                        </Link>

                        {/* Search Bar - Desktop */}
                        <div className="hidden flex-1 md:block md:max-w-2xl lg:max-w-3xl">
                            <div className="relative">
                                <Input
                                    type="search"
                                    placeholder="Masukkan Produk atau Brand Yang Ingin Anda Cari"
                                    className="h-11 rounded-lg pr-12 pl-4"
                                />
                                <Button
                                    size="icon"
                                    className="absolute top-1/2 right-1 h-9 w-9 -translate-y-1/2"
                                >
                                    <Search className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Contact Section - Desktop */}
                        <div className="hidden items-center gap-3 xl:flex">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                                <User className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-gray-600">
                                    Hubungi Kami
                                </span>
                                <span className="text-sm font-semibold text-gray-900">
                                    +62 813 3062 1873
                                </span>
                            </div>
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
                                            <Input
                                                type="search"
                                                placeholder="Masukkan Produk atau Brand Yang Ingin Anda Cari"
                                                className="pr-10"
                                            />
                                            <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
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
                                            Hubungi Kami
                                        </h3>
                                        <div className="flex flex-col gap-3 px-6">
                                            <a
                                                href="tel:+6281330621873"
                                                className="flex items-center gap-3 text-sm"
                                            >
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                                                    <User className="h-5 w-5 text-white" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-600">
                                                        Hubungi Kami
                                                    </span>
                                                    <span className="font-semibold text-gray-900">
                                                        +62 813 3062 1873
                                                    </span>
                                                </div>
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

                    {/* Second Row: Categories | Page Links - Desktop Only */}
                    <div className="hidden items-center gap-6 border-t py-3 lg:flex">
                        {/* Categories Popover */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="gap-2 px-0 font-normal text-gray-700 hover:text-primary"
                                >
                                    <Menu className="h-5 w-5" />
                                    Cari Berdasarkan Kategori
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="w-64 p-2">
                                <div className="flex flex-col gap-1">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            href=""
                                            className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-100 hover:text-primary"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* Divider */}
                        <div className="h-5 w-px bg-gray-300" />

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
            <footer className="bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
                        {/* Grid 1: Logo and Description */}
                        <div className="space-y-4 lg:col-span-3">
                            <img
                                src="/logo.png"
                                alt="Lokal Berdaya"
                                className="h-12 w-auto"
                            />
                            <p className="text-sm leading-relaxed text-gray-400">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Et libero pretium amet nec,
                                tristique aenean nunc. Donec ultrices feugiat
                                ligula elit. Dignissim nulla et risus, ut est.
                                Et consequat duis sem fames.
                            </p>
                        </div>

                        {/* Grid 2: Social Media */}
                        <div className="space-y-4 lg:col-span-3">
                            <h3 className="text-lg font-semibold text-primary">
                                Company
                            </h3>
                            <ul className="space-y-3">
                                {socialMedia.map((social) => (
                                    <li key={social.name}>
                                        <a
                                            href={social.href}
                                            className="flex items-center gap-3 text-sm text-gray-300 transition-colors hover:text-primary"
                                        >
                                            <social.icon className="h-5 w-5" />
                                            {social.username}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Grid 3: Pages */}
                        <div className="space-y-4 lg:col-span-3">
                            <h3 className="text-lg font-semibold text-primary">
                                Company
                            </h3>
                            <ul className="space-y-3">
                                {pages.map((page) => (
                                    <li key={page.name}>
                                        <Link
                                            href={page.href}
                                            className="text-sm text-gray-300 transition-colors hover:text-primary"
                                        >
                                            {page.name}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link
                                        href="#"
                                        className="text-sm text-gray-300 transition-colors hover:text-primary"
                                    >
                                        Kontak kami
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Grid 4: Contact */}
                        <div className="space-y-4 lg:col-span-3">
                            <h3 className="text-lg font-semibold text-primary">
                                Contacts us
                            </h3>
                            <ul className="space-y-4">
                                <li>
                                    <a
                                        href="mailto:Alamatemail@gmail.com"
                                        className="flex items-center gap-3 text-sm text-gray-300 transition-colors hover:text-primary"
                                    >
                                        <Mail className="h-5 w-5 text-primary" />
                                        Alamatemail@gmail.com
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="tel:082312312312"
                                        className="flex items-center gap-3 text-sm text-gray-300 transition-colors hover:text-primary"
                                    >
                                        <Phone className="h-5 w-5 text-primary" />
                                        082312312312
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
