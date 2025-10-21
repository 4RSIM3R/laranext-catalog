interface LogoCloudProps {
    logos: {
        id: number;
        name: string;
        image: string;
    }[];
}

export function LogoCloud({ logos }: LogoCloudProps) {
    return (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
            {logos.map((logo) => (
                <div
                    key={logo.id}
                    className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                    <img
                        src={logo.image}
                        alt={logo.name}
                        className="h-12 w-auto object-contain grayscale transition-all hover:grayscale-0"
                    />
                </div>
            ))}
        </div>
    );
}
