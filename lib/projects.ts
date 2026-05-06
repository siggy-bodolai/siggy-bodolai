export interface Project {
  id: string;
  title: string;
  client: string;
  tag?: string;
  year: number;
  featured?: boolean;
  description?: string;
  hero?: string;
  hero_video?: string;
  images?: string[];
  videos?: string[];
}
