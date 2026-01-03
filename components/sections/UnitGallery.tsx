'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { UNITS } from '@/lib/constants';
import { ChevronLeft, ChevronRight, Bed, Maximize } from 'lucide-react';
import Image from 'next/image';

export const UnitGallery = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % UNITS.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + UNITS.length) % UNITS.length);
    };

    return (
        <Section className="py-20 bg-southern-sand-200 overflow-hidden" id="floor-plans">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                <div>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-vintage-coin-400 mb-4">Exquisite Residences</h2>
                    <p className="text-taupe-400 max-w-md">Thoughtfully designed layouts maximizing space, luxury, and comfort.</p>
                </div>

                <div className="flex gap-4">
                    <button onClick={prevSlide} className="p-3 rounded-full border border-vintage-coin-400/20 text-vintage-coin-400 hover:bg-vintage-coin-400/10 transition">
                        <ChevronLeft />
                    </button>
                    <button onClick={nextSlide} className="p-3 rounded-full border border-vintage-coin-400/20 text-vintage-coin-400 hover:bg-vintage-coin-400/10 transition">
                        <ChevronRight />
                    </button>
                </div>
            </div>

            <div className="relative h-[600px] w-full max-w-5xl mx-auto">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, zIndex: -1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute inset-0 z-10"
                    >
                        <div className="h-full w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-vintage-coin-400/10">
                            <div className="h-1/2 md:h-full md:w-3/5 relative">
                                <Image
                                    src={UNITS[activeIndex].image}
                                    alt={UNITS[activeIndex].type}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 60vw"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent md:bg-gradient-to-r z-10" />
                            </div>

                            <div className="h-1/2 md:h-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center space-y-6 relative z-20">
                                <div>
                                    <h3 className="text-3xl font-serif text-vintage-coin-400 mb-2">{UNITS[activeIndex].type}</h3>
                                    <p className="text-taupe-400 font-medium text-2xl mt-1">{UNITS[activeIndex].price}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-6 border-y border-vintage-coin-400/10">
                                    <div className="flex items-center gap-3 text-vintage-coin-400/80">
                                        <Maximize className="w-5 h-5 text-taupe-400" />
                                        <span>{UNITS[activeIndex].size}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-vintage-coin-400/80">
                                        <Bed className="w-5 h-5 text-taupe-400" />
                                        <span>{UNITS[activeIndex].type.split(' ')[0]}</span>
                                    </div>
                                </div>

                                <Button className="w-full bg-vintage-coin-400 hover:bg-taupe-400 text-white border-none shadow-lg">View Floor Plan</Button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Background Decor */}
                <div className="absolute top-10 -right-10 w-full h-full bg-vintage-coin-400/5 rounded-3xl -z-10 rotate-6 scale-95" />
                <div className="absolute top-20 -right-20 w-full h-full bg-vintage-coin-400/5 rounded-3xl -z-20 rotate-12 scale-90" />
            </div>
        </Section>
    );
};
