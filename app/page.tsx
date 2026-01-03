import ScrollytellingHero from "@/components/sections/ScrollytellingHero";
import { LoanCalculator } from "@/components/sections/LoanCalculator";
import { UnitGallery } from "@/components/sections/UnitGallery";
import { Urgency } from "@/components/sections/Urgency";
import { LeadForm } from "@/components/sections/LeadForm";
import { LogoMarquee } from "@/components/sections/LogoMarquee";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col bg-southern-sand-200">
            <ScrollytellingHero />
            <LogoMarquee />
            <LoanCalculator />
            <UnitGallery />
            <Urgency />
            <LeadForm />
        </main>
    )
}
