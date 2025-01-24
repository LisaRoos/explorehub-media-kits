import { Card } from "@/components/ui/card";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { useEffect } from "react";
import { Instagram, Youtube } from "lucide-react";
import { TikTokIcon } from "@/components/landing/media-kit/TikTokIcon";

interface ContentItem {
  thumbnail: string;
  title: string;
  url: string;
}

interface ContentCarouselProps {
  platform: string;
  content: ContentItem[];
}

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return <Instagram className="w-5 h-5 text-pink-500" />;
    case 'tiktok':
      return <TikTokIcon className="w-5 h-5" />;
    case 'youtube':
      return <Youtube className="w-5 h-5 text-red-500" />;
    default:
      return null;
  }
};

export const ContentCarousel = ({ platform, content }: ContentCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "center",
      dragFree: true,
      containScroll: "trimSnaps"
    },
    [AutoPlay({ delay: 3000, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (emblaApi) {
      console.log(`${platform} carousel initialized`);
    }
  }, [emblaApi, platform]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {getPlatformIcon(platform)}
        <h3 className="text-lg font-medium">{platform}</h3>
      </div>
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {content.map((item, index) => (
            <div 
              key={index} 
              className="flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] transition-transform duration-300"
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
                    <h3 className="font-medium line-clamp-2">{item.title}</h3>
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