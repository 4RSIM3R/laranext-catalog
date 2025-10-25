import { SidebarMenuItemComponent } from '@/components/sidebar-menu-item';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { useSidebarState } from '@/hooks/use-sidebar-state';
import { FormResponse } from '@/lib/constant';
import { initial_name } from '@/lib/format';
import { logout } from '@/routes';
import backoffice from '@/routes/backoffice';
import banner from '@/routes/master/banner';
import category from '@/routes/master/category';
import event from '@/routes/master/event';
import file from '@/routes/master/file';
import post from '@/routes/master/post';
import product from '@/routes/master/product';
import user from '@/routes/master/user';
import video from '@/routes/master/video';
import page from '@/routes/setting/page';
import system from '@/routes/setting/system';
import { SharedData } from '@/types';
import { MenuGroup } from '@/types/ui';
import { Link, useForm, usePage } from '@inertiajs/react';
import {
    CalendarIcon,
    ChevronsUpDown,
    FileIcon,
    ListIcon,
    LogOut,
    Settings2Icon,
    ShoppingCartIcon,
    SlidersIcon,
    UserIcon,
    VideoIcon,
} from 'lucide-react';
import * as React from 'react';

const navigations: MenuGroup[] = [
    {
        id: 'master',
        title: 'Master',
        items: [
            {
                id: 'banner',
                title: 'Banner',
                icon: SlidersIcon,
                url: banner.index().url,
            },
            {
                id: 'category',
                title: 'Category',
                icon: ListIcon,
                url: category.index().url,
            },
            {
                id: 'event',
                title: 'Event',
                icon: CalendarIcon,
                url: event.index().url,
            },
            {
                id: 'file',
                title: 'File',
                icon: ListIcon,
                url: file.index().url,
            },
            {
                id: 'post',
                title: 'Post',
                icon: SlidersIcon,
                url: post.index().url,
            },
            {
                id: 'product',
                title: 'Product',
                icon: ShoppingCartIcon,
                url: product.index().url,
            },
            {
                id: 'user',
                title: 'User',
                icon: UserIcon,
                url: user.index().url,
            },
            {
                id: 'video',
                title: 'Video',
                icon: VideoIcon,
                url: video.index().url,
            },
        ],
    },
    {
        id: 'setting',
        title: 'Setting',
        items: [
            {
                id: 'page',
                title: 'Page',
                icon: FileIcon,
                url: page.index().url,
            },
            {
                id: 'system',
                title: 'System',
                icon: Settings2Icon,
                url: system.index().url,
            },
        ],
    },
];

interface AppLayoutProps {
    children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const { toggleSection, isSectionOpen } = useSidebarState();
    const { post } = useForm();

    const onLogout = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        post(logout().url, FormResponse);
    };

    return (
        <SidebarProvider>
            <Sidebar className="border-r">
                <SidebarHeader className="border-b">
                    <Link href={backoffice.index().url}>
                        <SidebarMenuButton
                            size="lg"
                            className="flex items-center justify-center data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <img
                                src="/logo.png"
                                className="h-12 w-auto object-cover"
                            />
                        </SidebarMenuButton>
                    </Link>
                </SidebarHeader>

                <SidebarContent>
                    {navigations.map((group) => (
                        <SidebarGroup key={group.id}>
                            {group.title && (
                                <SidebarGroupLabel className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                                    {group.title}
                                </SidebarGroupLabel>
                            )}
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {group.items.map((item: any) => (
                                        <SidebarMenuItemComponent
                                            key={item.id}
                                            item={item}
                                            isOpen={isSectionOpen(
                                                item.id,
                                                group.defaultOpen,
                                            )}
                                            onToggle={() =>
                                                toggleSection(item.id)
                                            }
                                        />
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    ))}
                </SidebarContent>

                <SidebarFooter className="border-t">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage
                                                src="/placeholder.svg?height=32&width=32"
                                                alt="User"
                                            />
                                            <AvatarFallback className="rounded-lg">
                                                {initial_name(
                                                    auth.user?.name ?? '',
                                                )}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {auth.user?.name ?? ''}
                                            </span>
                                            <span className="truncate text-xs text-muted-foreground">
                                                {auth.user?.email ?? ''}
                                            </span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    side="bottom"
                                    align="end"
                                    sideOffset={4}
                                >
                                    <DropdownMenuItem
                                        onClick={onLogout}
                                        className="gap-2 text-red-600"
                                    >
                                        <LogOut className="size-4" />
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>

            <SidebarInset className="overflow-hidden">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                </header>
                <main className="flex-1 overflow-hidden p-4">
                    <Toaster />
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
