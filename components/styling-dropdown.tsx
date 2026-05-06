"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMenu } from "./menu-context";
import type { Project } from "@/lib/projects";

function getPreviewImage(project: Project): string {
  if (project.hero && !/\.(webm|mp4|mov)$/i.test(project.hero)) return project.hero;
  return (project.images ?? []).find((img) => !/\.(webm|mp4|mov)$/i.test(img)) ?? "";
}

export default function StylingDropdown({ projects }: { projects: Project[] }) {
  const { stylingOpen, setStylingOpen, menuOpen } = useMenu();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const [leftOffset, setLeftOffset] = useState(0);

  const pathname = usePathname();
  const isDark = false;

  const bgColor = isDark ? "bg-foreground" : "bg-background";
  const textColor = isDark ? "text-background" : "text-foreground";
  const washColor = isDark ? "text-background/40" : "text-wash";

  useEffect(() => {
    if (stylingOpen && markerRef.current) {
      setLeftOffset(markerRef.current.getBoundingClientRect().left);
    }
  }, [stylingOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (markerRef.current) {
        setLeftOffset(markerRef.current.getBoundingClientRect().left);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!stylingOpen) return null;

  return (
    <div className={`fixed inset-x-0 top-[42px] bottom-0 z-30 ${bgColor} transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${menuOpen ? "md:translate-y-0 translate-y-[50vh]" : "translate-y-0"
      }`}>
      <div className="hidden md:block h-full w-full">
        {hoveredIndex !== null && getPreviewImage(projects[hoveredIndex]) && (
          <div className="absolute left-10 lg:left-16 top-2 w-[300px] h-[420px]">
            <Image
              src={getPreviewImage(projects[hoveredIndex])}
              alt={projects[hoveredIndex].title}
              fill
              className="object-contain object-top transition-opacity duration-300"
            />
          </div>
        )}

        <div className="flex justify-between w-full px-10 lg:px-16 pt-2 h-0 overflow-hidden">
          <span className="font-mono text-[9px] font-bold tracking-normal uppercase invisible">SIGGY BODOLAÍ</span>
          <span ref={markerRef} className="font-mono text-[9px] font-bold tracking-normal uppercase invisible">WORK</span>
          <span className="font-mono text-[9px] font-bold tracking-normal uppercase invisible">ARCHIVE</span>
          <span className="font-mono text-[9px] font-bold tracking-normal uppercase invisible">INFORMATION</span>
          <span className="font-mono text-[9px] font-bold tracking-normal uppercase invisible">CONTACT</span>
        </div>

        <div
          className="absolute top-2 flex flex-col items-start"
          style={{ left: `${leftOffset}px` }}
        >
          {projects.map((project, i) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setStylingOpen(false)}
              className={`font-mono text-[9px] font-bold tracking-normal transition-colors duration-300 leading-loose ${hoveredIndex === null ? textColor : hoveredIndex === i ? textColor : washColor}`}
            >
              {project.title} for {project.client}
            </Link>
          ))}
        </div>
      </div>

      <nav className="md:hidden flex flex-col px-6 pt-6">
        {projects.map((project, i) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            onClick={() => setStylingOpen(false)}
            className={`font-mono text-[9px] font-bold tracking-normal transition-colors duration-300 leading-loose ${hoveredIndex === null ? textColor : hoveredIndex === i ? textColor : washColor}`}
          >
            {project.title} for {project.client}
          </Link>
        ))}
      </nav>
    </div>
  );
}