'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IMAGES, PROJECT_INFO } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { ArrowDown } from 'lucide-react';

const LETTER_ANIMATION = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
}

const STAGGER_CHILDREN = {
    animate: {
        transition: {
            staggerChildren: 0.03
        }
    }
}

export const Hero = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);

    // Split text into letters for animation
    const title = "Aura EC: Nature-Inspired Living";
    const letters = title.split("");

    return (
        <section className="relative h-screen min-h-[800px] w-full overflow-hidden flex items-center justify-center">
            {/* Background Image with Reveal Animation */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y }}
                initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                transition={{ duration: 1.5, ease: "circOut" }}
            >
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${IMAGES.hero})` }}
                />
            </motion.div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center pt-32">

                {/* Text Reveal Animation */}
                <motion.div
                    variants={STAGGER_CHILDREN}
                    initial="initial"
                    animate="animate"
                    className="overflow-hidden mb-6"
                >
                    <div className="flex flex-wrap justify-center overflow-hidden">
                        {letters.map((letter, i) => (
                            <motion.span
                                key={i}
                                variants={LETTER_ANIMATION}
                                transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
                                className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-normal drop-shadow-xl"
                            >
                                {letter === " " ? "\u00A0" : letter}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="text-lg md:text-xl text-white/90 max-w-2xl font-light mb-10 text-balance"
                >
                    New Executive Condominium Launch in {PROJECT_INFO.district}. <br />
                    <span className="text-gold-400 font-medium">Up to $30k Grant for First Timers.</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                >
                    <Button className="h-14 px-10 text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        Get E-Brochure & Floor Plans
                    </Button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white flex flex-col items-center gap-2 opacity-60"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <span className="text-xs uppercase tracking-[0.2em]">Explore</span>
                <ArrowDown className="w-4 h-4" />
            </motion.div>
        </section>
    );
};
