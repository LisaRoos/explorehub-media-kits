import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ContentItem {
  thumbnail: string;
  title: string;
  url: string;
}

interface ContentCarouselProps {
  platform: string;
  content: ContentItem[];
}

export const ContentCarousel = ({ platform, content }: ContentCarouselProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium">{platform}</h3>
    <Carousel className="w-full">
      <CarouselContent>
        {content.map((item, index) => (
          <CarouselItem key={index}>
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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
);