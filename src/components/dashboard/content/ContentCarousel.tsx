import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { useEffect } from "react";

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
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
    },
    [AutoPlay({ delay: 3000, stopOnInteraction: true })]
  );

  useEffect(() => {
    if (emblaApi) {
      console.log("Carousel initialized");
    }
  }, [emblaApi]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{platform}</h3>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {content.map((item, index) => (
            <div 
              key={index} 
              className="flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};