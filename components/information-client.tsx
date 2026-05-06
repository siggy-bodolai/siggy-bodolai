"use client";

import { useState } from "react";

interface Props {
  bio: string;
  bioExtended: string;
  instagram: string;
}

export default function InformationClient({ bio, bioExtended, instagram }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full md:max-w-[80%]">
      <p className="font-mono font-bold text-lg md:text-2xl lg:text-3xl leading-[1.0] tracking-tight pb-1">
        {bio}
      </p>

      {bioExtended && (
        <div
          className="overflow-hidden transition-[max-height] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ maxHeight: isExpanded ? "2000px" : "0px" }}
        >
          <p className="font-mono font-bold text-lg md:text-2xl lg:text-3xl leading-[1.0] tracking-tight pt-6 pb-1">
            {bioExtended}
          </p>
        </div>
      )}

      {bioExtended && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-6 font-mono font-bold text-[9px] tracking-normal uppercase text-foreground/40 hover:text-foreground transition-colors duration-300"
        >
          {isExpanded ? "READ LESS" : "READ MORE"}
        </button>
      )}

      <div className="pt-8 md:pt-12">
        <a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono font-bold text-[9px] tracking-normal uppercase text-foreground/40 hover:text-foreground transition-colors duration-300"
        >
          @{instagram}
        </a>
      </div>
    </div>
  );
}
