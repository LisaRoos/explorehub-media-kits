import { Instagram, Twitter, Youtube, Facebook, Twitch, Play } from "lucide-react";

const socialLinks = [
  {
    platform: "Instagram",
    icon: Instagram,
    color: "bg-pink-500",
    url: "#",
  },
  {
    platform: "Twitter",
    icon: Twitter,
    color: "bg-blue-400",
    url: "#",
  },
  {
    platform: "YouTube",
    icon: Youtube,
    color: "bg-red-500",
    url: "#",
  },
  {
    platform: "Facebook",
    icon: Facebook,
    color: "bg-blue-600",
    url: "#",
  },
  {
    platform: "Twitch",
    icon: Twitch,
    color: "bg-purple-500",
    url: "#",
  },
  {
    platform: "TikTok",
    icon: Play,
    color: "bg-black",
    url: "#",
  },
];

export const SocialLinks = () => {
  return (
    <div className="grid grid-cols-6 gap-4 px-4">
      {socialLinks.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center"
        >
          <div className={`p-2 rounded-full ${link.color} group-hover:scale-110 transition-transform`}>
            <link.icon className="w-4 h-4 text-white" />
          </div>
        </a>
      ))}
    </div>
  );
};