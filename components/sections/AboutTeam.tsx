'use client';
import { Section } from '@/components/ui/Section';
import Image from 'next/image';

const TEAM_MEMBERS = [
    {
        name: "LOREM",
        role: "Lead Architect",
        bio: "Visionary design combining sustainable luxury with timeless aesthetics."
    },
    {
        name: "LOREM",
        role: "Project Director",
        bio: "Over 20 years of experience delivering Singapore's most iconic residences."
    },
    {
        name: "LOREM",
        role: "Interior Design Head",
        bio: "Curating spaces that breathe life, warmth, and sophistication."
    }
];

export const AboutTeam = () => {
    return (
        <Section className="py-24 relative bg-vintage-coin-400 overflow-hidden" id="about-team">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-taupe-400 via-transparent to-transparent opacity-30" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
                        About Us <span className="italic text-southern-sand-200">About Us</span>
                    </h2>
                    <p className="text-southern-sand-200/80 max-w-2xl mx-auto text-lg">
                        Meet the dedicated experts behind Aura EC. Driven by passion, precision, and a commitment to excellence.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {TEAM_MEMBERS.map((member, index) => (
                        <div key={index} className="group text-center">
                            <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-southern-sand-200/20 group-hover:border-southern-sand-200 transition-colors duration-500">
                                {/* Placeholder for Team Image - using a colored div for now or noise */}
                                <div className="absolute inset-0 bg-taupe-400/20 group-hover:bg-taupe-400/30 transition-colors" />
                                <div className="absolute inset-0 flex items-center justify-center text-southern-sand-200/40 text-4xl font-serif">
                                    {member.name.charAt(0)}
                                </div>
                            </div>

                            <h3 className="text-xl font-serif text-white mb-2">{member.name}</h3>
                            <p className="text-southern-sand-200 font-medium text-sm tracking-widest uppercase mb-3">{member.role}</p>
                            <p className="text-southern-sand-200/60 text-sm leading-relaxed max-w-xs mx-auto">
                                {member.bio}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};
