'use client';
import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { FEATURES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { Home, Train, School, Dumbbell, MousePointer2 } from 'lucide-react';

const iconMap: Record<string, any> = {
    Home,
    Train,
    School,
    Dumbbell,
    Smartphone: MousePointer2 // Approximation
};

function FeatureCard({ feature }: { feature: typeof FEATURES[0] }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const Icon = iconMap[feature.icon] || Home;

    return (
        <div
            className="group relative border border-white/10 bg-navy-800/80 md:bg-navy-800/50 px-8 py-10 shadow-2xl overflow-hidden rounded-xl"
            onMouseMove={handleMouseMove}
        >
            {/* Flashlight Gradient - Desktop Only */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          650px circle at ${mouseX}px ${mouseY}px,
                          rgba(212, 175, 55, 0.15),
                          transparent 80%
                        )
                    `,
                }}
            />
            {/* Spotlight Border - Desktop Only */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          400px circle at ${mouseX}px ${mouseY}px,
                          rgba(255, 255, 255, 0.2),
                          transparent 80%
                        )
                    `,
                }}
            />

            <div className="relative z-10 flex flex-col items-start gap-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-gold-400">
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className={cn("text-xl font-bold font-serif", feature.title.includes("Within 1km") ? "text-gold-400" : "text-white")}>{feature.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{feature.description}</p>
            </div>
        </div>
    );
}

export const FeaturesGrid = () => {
    return (
        <Section className="py-32">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">Why Choose Aura EC?</h2>
                <div className="w-24 h-1 bg-gold-400 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {FEATURES.map((feature, i) => (
                    <FeatureCard key={i} feature={feature} />
                ))}
            </div>
        </Section>
    );
};
