"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useMenu } from "@/components/menu-context";
import type { Project } from "@/lib/projects";

const isVideo = (src: string) => /\.(webm|mp4|mov)$/i.test(src);

export default function HomeClient({ projects, name, role, location, heroMedia }: { projects: Project[]; name: string; role: string; location: string; heroMedia: string }) {
  const containerRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const { menuOpen, preloaderDone, setHeroActive } = useMenu();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimer: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / container.clientHeight);
      setHeroActive(index === 0);
      setActiveIndex(-1);
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => setActiveIndex(index), 150);
    };

    setHeroActive(true);
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
      setHeroActive(false);
    };
  }, [setHeroActive]);

  useEffect(() => {
    if (preloaderDone && heroVideoRef.current) {
      heroVideoRef.current.play();
    }
  }, [preloaderDone]);

  return (
    <main
      id="main-content"
      ref={containerRef}
      className={`h-[100dvh] snap-y snap-mandatory overflow-y-auto transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${menuOpen ? "md:translate-y-0 translate-y-[50vh]" : "translate-y-0"}`}
    >
      <section className="relative h-[100dvh] snap-start overflow-hidden bg-black">
        {isVideo(heroMedia) ? (
          <video
            ref={heroVideoRef}
            src={heroMedia}
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Image
            src={heroMedia}
            alt=""
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex items-center justify-end px-6 md:px-10 lg:px-16">
          <div className="flex flex-col items-end gap-1">
            <span className="font-mono text-white text-2xl md:text-3xl font-bold tracking-normal uppercase">{name}</span>
            <span className="font-mono text-white/60 text-[9px] font-bold tracking-normal uppercase">{role}</span>
            <span className="font-mono text-white/60 text-[9px] font-bold tracking-normal uppercase">{location}</span>
          </div>
        </div>
      </section>

      {projects.map((project, i) => (
        <section
          key={project.id}
          className="relative h-[100dvh] snap-start flex flex-col pt-16 pb-6 gap-6"
        >
          <div
            className="relative flex-1 w-full overflow-hidden flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{
              opacity: preloaderDone ? 1 : 0,
              transform: preloaderDone ? "translateY(0) scale(1)" : "translateY(30px) scale(0.98)",
              transitionDelay: i === 0 ? "200ms" : "0ms",
            }}
          >
            <div className="absolute inset-y-0 inset-x-6 md:inset-x-0">
              {(() => {
                const src = project.hero_video || project.hero || "";
                return isVideo(src) ? (
                  <video
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain object-center"
                  />
                ) : src ? (
                  <Image
                    src={src}
                    alt={project.title}
                    fill
                    className="object-contain object-center"
                    priority={i === 0}
                  />
                ) : null;
              })()}
            </div>
          </div>

          <div
            className="flex shrink-0 w-full items-end justify-between pb-8 px-6 md:px-10 lg:px-16 transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{
              opacity: preloaderDone ? 1 : 0,
              transform: preloaderDone ? "translateY(0)" : "translateY(20px)",
              transitionDelay: i === 0 ? "400ms" : "0ms",
            }}
          >
            <div className="flex items-end gap-3">
              <h2 className="font-mono text-[9px] font-bold tracking-normal uppercase text-foreground">
                {project.title}{project.client ? ` for ${project.client}` : ""}
              </h2>
              <span
                className="font-mono text-[9px] font-bold tracking-normal uppercase text-foreground/40"
                style={{
                  opacity: activeIndex === i + 1 ? 1 : 0,
                  transform: activeIndex === i + 1 ? "translateX(0)" : "translateX(-6px)",
                  transition: "opacity 500ms cubic-bezier(0.76,0,0.24,1), transform 500ms cubic-bezier(0.76,0,0.24,1)",
                }}
              >
                {project.year}
              </span>
            </div>
            <Link
              href={`/projects/${project.id}`}
              aria-label={`View ${project.title}${project.client ? ` for ${project.client}` : ""}`}
              className="font-mono text-[9px] font-bold tracking-normal uppercase text-foreground/40 transition-colors hover:text-accent"
            >
              View
            </Link>
          </div>
        </section>
      ))}
    </main>
  );
}
