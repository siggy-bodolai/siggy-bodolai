import { getSettings } from "@/lib/content";
import InformationClient from "@/components/information-client";

export default async function InformationPage() {
    const { bio, bio_extended, instagram } = await getSettings();

    return (
        <section className="w-full min-h-[100dvh] bg-background text-foreground flex flex-col justify-start px-6 md:px-10 lg:px-16 pt-16 pb-12 relative overflow-x-hidden">
            <div className="w-full flex flex-col items-start relative z-10">
                <InformationClient bio={bio} bioExtended={bio_extended} instagram={instagram} />
            </div>
        </section>
    );
}
