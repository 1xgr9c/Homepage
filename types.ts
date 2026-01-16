
export interface LinkItem {
  id: string;
  name: string;
  url: string;
  tracklistUrl?: string;
  streamUrl?: string;
  domain: string;
}

export interface SectionData {
  title: string;
  items: LinkItem[];
}

export type Category = 'news' | 'tools' | 'radio';
