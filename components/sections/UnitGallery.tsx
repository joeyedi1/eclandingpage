'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { UNITS } from '@/lib/constants';
import { ChevronLeft, ChevronRight, Bed, Maximize } from 'lucide-react';

export const UnitGallery = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % UNITS.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + UNITS.length) % UNITS.length);
    };

    return (
        <Section className="py-20 bg-navy-900 overflow-hidden" id="floor-plans">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                <div>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Exquisite Residences</h2>
                    <p className="text-slate-400 max-w-md">Thoughtfully designed layouts maximizing space, luxury, and comfort.</p>
                </div>

                <div className="flex gap-4">
                    <button onClick={prevSlide} className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition">
                        <ChevronLeft />
                    </button>
                    <button onClick={nextSlide} className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition">
                        <ChevronRight />
                    </button>
                </div>
            </div>

            <div className="relative h-[600px] w-full max-w-5xl mx-auto">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 100, scale: 0.9, rotate: 5 }}
                        animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, x: -100, scale: 0.9, rotate: -5 }}
                        transition={{ duration: 0.6, ease: "circOut" }}
                        className="absolute inset-0 z-10"
                    >
                        <div className="h-full w-full bg-navy-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                            <div className="h-1/2 md:h-full md:w-3/5 relative">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${UNITS[activeIndex].image})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent md:bg-gradient-to-r" />
                            </div>

                            <div className="h-1/2 md:h-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center space-y-6">
                                <div>
                                    <h3 className="text-3xl font-serif text-white mb-2">{UNITS[activeIndex].type}</h3>
                                    <p className="text-gold-400 font-medium text-xl">{UNITS[activeIndex].price}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/10">
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <Maximize className="w-5 h-5 text-gold-400" />
                                        <span>{UNITS[activeIndex].size}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <Bed className="w-5 h-5 text-gold-400" />
                                        <span>{UNITS[activeIndex].type.split(' ')[0]}</span>
                                    </div>
                                </div>

                                <Button className="w-full">View Floor Plan</Button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Background Decor */}
                <div className="absolute top-10 -right-10 w-full h-full bg-navy-800/30 rounded-3xl -z-10 rotate-6 scale-95" />
                <div className="absolute top-20 -right-20 w-full h-full bg-navy-800/10 rounded-3xl -z-20 rotate-12 scale-90" />
            </div>
        </Section>
    );
};
