import { Hero } from "@/components/sections/Hero";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { UnitGallery } from "@/components/sections/UnitGallery";
import { Urgency } from "@/components/sections/Urgency";
import { LeadForm } from "@/components/sections/LeadForm";
import { LogoMarquee } from "@/components/sections/LogoMarquee";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col bg-slate-950">
            <Hero />
            <LogoMarquee />
            <FeaturesGrid />
            <UnitGallery />
            <Urgency />
            <LeadForm />
        </main>
    )
}
