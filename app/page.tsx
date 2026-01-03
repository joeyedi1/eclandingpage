import ScrollytellingHero from "@/components/sections/ScrollytellingHero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { LoanCalculator } from "@/components/sections/LoanCalculator";
import { UnitGallery } from "@/components/sections/UnitGallery";
import { AboutTeam } from "@/components/sections/AboutTeam";
import { LeadForm } from "@/components/sections/LeadForm";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col bg-southern-sand-200">
            <ScrollytellingHero />
            <LogoMarquee />
            <LoanCalculator />
            <AboutTeam />
            <UnitGallery />
            <LeadForm />
        </main>
    );
}
