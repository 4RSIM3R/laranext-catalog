import { Toaster } from '@/components/ui/sonner';
import { PropsWithChildren } from 'react';

export const AuthLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="relative col-span-6 flex h-screen flex-col items-start justify-end overflow-hidden p-4 text-white">
                <img
                    src="https://proscia.com/wp-content/uploads/2019/12/proscia-img-where-is-it-headed.jpg"
                    alt="Background"
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 z-10 bg-black opacity-50"></div>
                <div className="relative z-20">
                    <blockquote className="max-w-sm text-sm text-white">
                        Lokal Berdaya is a platform that empowers local products
                        and businesses to grow and thrive in the digital era.
                    </blockquote>
                    <footer className="mt-4 flex items-center gap-4 text-sm">
                        <img
                            src="https://i.pravatar.cc/300"
                            alt="Profile"
                            className="size-9 rounded-full"
                        />
                        <div className="flex flex-col">
                            <span className="text-sm">CEO NAME</span>
                            <span className="text-xs">Direktur Utama</span>
                        </div>
                    </footer>
                </div>
            </div>
            <div className="col-span-6 h-screen p-4">
                <Toaster position="bottom-right" richColors />
                {children}
            </div>
        </div>
    );
};
