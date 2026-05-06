"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMenu } from "./menu-context";

const navLinks = [
  { label: "Work", href: "#styling" },
  { label: "Archive", href: "/archive" },
  { label: "Information", href: "/information" },
  { label: "Contact", href: "/contact" },
];

export default function Header({ name }: { name: string }) {
  const { menuOpen, setMenuOpen, stylingOpen, setStylingOpen, preloaderDone, heroActive } = useMenu();

  const allLinks = [
    { label: name, href: "/" },
    ...navLinks,
  ];
  const pathname = usePathname();

  const isDark = false;
  const isHero = heroActive && !menuOpen && !stylingOpen;

  const bgColor = isDark ? "bg-foreground" : "bg-background";
  const textColor = isDark ? "text-background" : isHero ? "text-white" : "text-foreground";
  const washColor = isDark ? "text-background/40" : isHero ? "text-white/40" : "text-wash";

  const handleDesktopLinkClick = (label: string, e: React.MouseEvent) => {
    if (label === "Work") {
      e.preventDefault();
      setStylingOpen(!stylingOpen);
    } else {
      setStylingOpen(false);
    }
  };

  const handleMobileLinkClick = (label: string, e: React.MouseEvent) => {
    if (label === "Work") {
      e.preventDefault();
      setMenuOpen(false);
      setTimeout(() => {
        setStylingOpen(!stylingOpen);
      }, 700);
    } else {
      setMenuOpen(false);
      setStylingOpen(false);
    }
  };

  const handleMenuToggle = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
      if (stylingOpen) setStylingOpen(false);
    }
  };

  return (
    <>
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`md:hidden fixed inset-x-0 top-0 z-40 ${bgColor} overflow-hidden transition-[height,background-color] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${menuOpen ? "h-[50vh]" : "h-0"
          }`}
      >
        <div className="flex flex-col px-6 pt-6 pb-20 h-full">
          <nav aria-label="Mobile navigation" className="flex flex-col items-start gap-0">
            {allLinks.map((link, i) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleMobileLinkClick(link.label, e)}
                  className={`font-mono text-xl font-bold tracking-normal leading-tight transition-all hover:text-accent ${isActive ? washColor : textColor
                    }`}
                  style={{
                    transitionDuration: "600ms",
                    transitionDelay: menuOpen ? `${i * 80}ms` : "0ms",
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <header
        className={`fixed left-0 w-full z-50 transition-[transform,top,color] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${!stylingOpen ? "md:bg-transparent" : ""} ${menuOpen ? bgColor : isDark ? "bg-transparent" : isHero ? "bg-transparent" : "bg-background"
          } ${menuOpen
            ? "top-[50vh] -translate-y-full md:top-0 md:translate-y-0"
            : "top-0 translate-y-0"
          }`}
      >
        <div className="flex items-center justify-between px-6 py-5 md:px-10 lg:px-16">
          <nav aria-label="Main navigation" className="hidden md:flex items-center justify-between w-full">
            {allLinks.map((link, i) => {
              const isNav = link.href !== "/";
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleDesktopLinkClick(link.label, e)}
                  className={`font-mono text-[9px] font-bold tracking-normal uppercase transition-all hover:text-accent ${link.label === "Work" && stylingOpen
                    ? "text-accent"
                    : textColor
                    }`}
                  style={
                    isNav
                      ? {
                        transitionDuration: "600ms",
                        transitionDelay: preloaderDone ? `${i * 100}ms` : "0ms",
                        opacity: preloaderDone ? 1 : 0,
                        transform: preloaderDone ? "translateY(0)" : "translateY(-8px)",
                      }
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/"
            onClick={() => setStylingOpen(false)}
            className={`md:hidden font-mono text-[9px] font-bold tracking-normal transition-colors hover:text-accent ${textColor}`}
          >
            {name}
          </Link>
          <button
            onClick={handleMenuToggle}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`md:hidden font-mono text-[9px] font-bold tracking-normal transition-all duration-[600ms] hover:text-accent ${textColor}`}
            style={{
              opacity: preloaderDone ? 1 : 0,
              transform: preloaderDone ? "translateY(0)" : "translateY(-8px)",
            }}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>
    </>
  );
}
