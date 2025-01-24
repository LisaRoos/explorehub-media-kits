export interface ContentItem {
  thumbnail: string;
  title: string;
  url: string;
}

export interface SampleContent {
  instagram: ContentItem[];
  tiktok: ContentItem[];
  youtube: ContentItem[];
}