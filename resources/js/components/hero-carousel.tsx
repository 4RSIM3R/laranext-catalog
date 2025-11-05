import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Banner } from '@/types/banner';

interface HeroCarouselProps {
    slides: Banner[];
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
                        <a
                            href={slide.button_link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl md:h-[500px]">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${typeof slide.thumbnail === 'object' && 'original_url' in slide.thumbnail ? slide.thumbnail.original_url : 'https://placehold.co/600x400'})`,
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
                                </div>
                                <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-16">
                                    <h1 className="mb-4 max-w-2xl text-3xl font-bold text-white md:text-5xl">
                                        {slide.title}
                                    </h1>
                                    <p className="mb-6 max-w-xl text-base text-gray-200 md:text-lg">
                                        {slide.subtitle}
                                    </p>
                                    <div className="w-fit">
                                        <Button
                                            size="lg"
                                            className="bg-yellow-500 text-gray-900 hover:bg-yellow-600"
                                        >
                                            {slide.button_text}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </a>
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
