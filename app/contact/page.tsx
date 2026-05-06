import { getSettings } from "@/lib/content";

export default async function ContactPage() {
    const { email, instagram, contact_intro } = await getSettings();

    return (
        <section className="w-full min-h-[100dvh] bg-background text-foreground flex flex-col justify-start px-6 md:px-10 lg:px-16 pt-16 pb-12 relative overflow-x-hidden">

            <div className="w-full flex flex-col items-start relative z-10">
                <div className="w-full">
                    <p className="font-mono font-bold text-lg md:text-2xl lg:text-3xl leading-[1.0] tracking-tight pb-1">
                        {contact_intro}
                    </p>

                    <div className="pt-12 md:pt-16">
                        <span className="block font-mono text-[9px] font-bold tracking-normal uppercase text-foreground/40 mb-2">
                            EMAIL
                        </span>
                        <a
                            href={`mailto:${email}`}
                            className="inline-block font-mono font-bold text-2xl md:text-4xl lg:text-5xl tracking-tight cursor-pointer transition-opacity duration-300 hover:opacity-40"
                        >
                            {email}
                        </a>
                    </div>

                    <div className="pt-8 md:pt-12">
                        <span className="block font-mono text-[9px] font-bold tracking-normal uppercase text-foreground/40 mb-2">
                            SOCIAL
                        </span>
                        <a
                            href={`https://instagram.com/${instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block font-mono font-bold text-base md:text-lg tracking-tight cursor-pointer transition-opacity duration-300 hover:opacity-40"
                        >
                            @{instagram}
                        </a>
                    </div>
                </div>
            </div>

        </section>
    );
}
