import ScrollytellingHero from "@/components/sections/ScrollytellingHero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { Highlights } from "@/components/sections/Highlights";
import { Gallery } from "@/components/sections/Gallery";
import { ProjectDetails } from "@/components/sections/ProjectDetails";
import { Location } from "@/components/sections/Location";
import { LoanCalculator } from "@/components/sections/LoanCalculator";
import { LeadForm } from "@/components/sections/LeadForm";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col bg-southern-sand-200">
            <ScrollytellingHero />
            <LogoMarquee />
            <Highlights />
            <Gallery />
            <ProjectDetails />
            <Location />
            <LoanCalculator />
            <LeadForm />
        </main>
    );
}