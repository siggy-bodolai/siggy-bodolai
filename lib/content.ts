import { sanityClient } from "./sanity";
import type { Project } from "./projects";

export interface Settings {
  name: string;
  role: string;
  location: string;
  email: string;
  instagram: string;
  bio: string;
  bio_extended: string;
  contact_intro: string;
  hero_media?: string;
  hero_video?: string;
}

const projectFields = `
  "id": slug.current,
  title,
  client,
  year,
  featured,
  tag,
  description,
  "hero": hero.asset->url,
  "hero_video": hero_video.asset->url,
  "images": images[].asset->url,
  "videos": videos[].asset->url
`;

export async function getProjects(): Promise<Project[]> {
  return sanityClient.fetch(`*[_type == "project"] | order(orderRank) { ${projectFields} }`);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  return sanityClient.fetch(
    `*[_type == "project" && slug.current == $id][0] { ${projectFields} }`,
    { id }
  );
}

const defaultSettings: Settings = {
  name: "",
  role: "",
  location: "",
  email: "",
  instagram: "",
  bio: "",
  bio_extended: "",
  contact_intro: "",
};

export async function getSettings(): Promise<Settings> {
  const data = await sanityClient.fetch(`
    *[_type == "settings"][0] {
      name, role, location, email, instagram, bio, bio_extended, contact_intro,
      "hero_media": hero_media.asset->url,
      "hero_video": hero_video.asset->url
    }
  `);
  return data ?? defaultSettings;
}
