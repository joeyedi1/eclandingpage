'use client';
import { Section } from '@/components/ui/Section';

const LOGOS = [
    "UOL Group", "Singapore Land", "CapitaLand", "CDL", "Far East Org", "GuocoLand", "Frasers Property"
];

export const LogoMarquee = () => {
    return (
        <section className="py-10 bg-southern-sand-200 overflow-hidden border-y border-pine-tree-900/5 relative">
            {/* Fade Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-southern-sand-200 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-southern-sand-200 to-transparent z-10" />

            <div className="flex w-max animate-marquee gap-16 md:gap-32">
                {[...LOGOS, ...LOGOS].map((logo, i) => (
                    <span
                        key={i}
                        className="text-xl md:text-2xl font-serif text-pine-tree-900 whitespace-nowrap uppercase tracking-widest opacity-60"
                    >
                        {logo}
                    </span>
                ))}
            </div>
        </section>
    );
};
