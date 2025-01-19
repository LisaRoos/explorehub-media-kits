import { ContentCarousel } from "./ContentCarousel";

const featuredContent = {
  instagram: [
    {
      thumbnail: "/placeholder.svg",
      title: "Latest Instagram Post",
      url: "#"
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Featured Reel",
      url: "#"
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Popular Post",
      url: "#"
    }
  ],
  tiktok: [
    {
      thumbnail: "/placeholder.svg",
      title: "Viral TikTok",
      url: "#"
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Latest Dance",
      url: "#"
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Tutorial Video",
      url: "#"
    }
  ],
  youtube: [
    {
      thumbnail: "/placeholder.svg",
      title: "Latest Video",
      url: "#"
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Popular Tutorial",
      url: "#"
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Channel Highlight",
      url: "#"
    }
  ]
};

export const FeaturedContent = () => {
  return (
    <div className="space-y-8 px-4">
      <h2 className="text-xl font-semibold text-center">Featured Content</h2>
      <ContentCarousel platform="Instagram" content={featuredContent.instagram} />
      <ContentCarousel platform="TikTok" content={featuredContent.tiktok} />
      <ContentCarousel platform="YouTube" content={featuredContent.youtube} />
    </div>
  );
};