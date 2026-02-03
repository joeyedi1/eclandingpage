'use client';
import Image from 'next/image';

// To add more developers in the future, just add entries here
// and the marquee animation will automatically activate
const LOGOS = [
    {
        name: "GuocoLand Limited",
        src: "/guocoland-logo.png",
        width: 1200,
        height: 324,
    },
    // { name: "UOL Group", src: "/uol-logo.png", width: 400, height: 100 },
    // { name: "CapitaLand", src: "/capitaland-logo.png", width: 400, height: 100 },
];

export const LogoMarquee = () => {
    // Single logo — static centered layout
    if (LOGOS.length === 1) {
        const logo = LOGOS[0];
        return (
            <section className="py-10 md:py-14 bg-southern-sand-200 border-y border-pine-tree-900/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-5">
                    <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-taupe-400 font-medium">
                        Developed By
                    </p>
                    <Image
                        src={logo.src}
                        alt={logo.name}
                        width={logo.width}
                        height={logo.height}
                        className="h-10 md:h-14 w-auto"
                    />
                </div>
            </section>
        );
    }

    // Multiple logos — scrolling marquee
    return (
        <section className="py-10 bg-southern-sand-200 overflow-hidden border-y border-pine-tree-900/5 relative">
            {/* Fade Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-southern-sand-200 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-southern-sand-200 to-transparent z-10" />

            <div className="flex w-max animate-marquee gap-16 md:gap-32 items-center">
                {[...LOGOS, ...LOGOS].map((logo, i) => (
                    <Image
                        key={i}
                        src={logo.src}
                        alt={logo.name}
                        width={logo.width}
                        height={logo.height}
                        className="h-8 md:h-12 w-auto"
                    />
                ))}
            </div>
        </section>
    );
};