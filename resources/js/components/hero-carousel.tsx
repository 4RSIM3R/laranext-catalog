import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Link } from '@inertiajs/react';

interface HeroSlide {
    id: number;
    title: string;
    description: string;
    image: string;
    categoryUrl: string;
    categoryLabel: string;
}

interface HeroCarouselProps {
    slides: HeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
    return (
        <Carousel
            opts={{
                align: 'start',
                loop: true,
            }}
            className="w-full"
        >
            <CarouselContent>
                {slides.map((slide) => (
                    <CarouselItem key={slide.id}>
                        <div className="relative h-[400px] w-full overflow-hidden rounded-2xl md:h-[500px]">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
                            </div>
                            <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-16">
                                <h1 className="mb-4 max-w-2xl text-3xl font-bold text-white md:text-5xl">
                                    {slide.title}
                                </h1>
                                <p className="mb-6 max-w-xl text-base text-gray-200 md:text-lg">
                                    {slide.description}
                                </p>
                                <div>
                                    <Button
                                        asChild
                                        size="lg"
                                        className="bg-white text-gray-900 hover:bg-gray-100"
                                    >
                                        <Link href={slide.categoryUrl}>
                                            {slide.categoryLabel}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="hidden md:block">
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
            </div>
        </Carousel>
    );
}
