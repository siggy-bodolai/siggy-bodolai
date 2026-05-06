import { getProjects, getSettings } from "@/lib/content";
import HomeClient from "@/components/home-client";

export default async function Home() {
  const [projects, settings] = await Promise.all([getProjects(), getSettings()]);
  const featured = projects.filter((p) => p.featured);
  const { name, role, location, hero_video, hero_media } = settings;
  return <HomeClient projects={featured} name={name} role={role} location={location} heroMedia={hero_video || hero_media || ""} />;
}
