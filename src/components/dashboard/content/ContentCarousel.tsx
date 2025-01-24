import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

interface ContentItem {
  thumbnail: string;
  title: string;
  url: string;
}

interface ContentCarouselProps {
  platform: string;
  content: ContentItem[];
}

export const ContentCarousel = ({ platform, content }: ContentCarouselProps) => {
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (!api) return;

    // Start autoplay when component mounts
    const autoplayPlugin = Autoplay({ delay: 3000, stopOnInteraction: true });
    api.plugins.add(autoplayPlugin);

    return () => {
      if (api) {
        api.plugins.remove(autoplayPlugin);
      }
    };
  }, [api]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{platform}</h3>
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {content.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="overflow-hidden hover:scale-105 transition-transform glass-card">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium">{item.title}</h3>
                  </div>
                </Card>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};