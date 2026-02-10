'use client';
import { motion } from 'framer-motion';
import { Train, Waves, GraduationCap, ShoppingBag, MapPin } from 'lucide-react';
import { HIGHLIGHTS } from '@/lib/constants';

const iconMap: Record<string, any> = {
    Train,
    Waves,
    GraduationCap,
    ShoppingBag,
    MapPin,
};

export const Highlights = () => {
    return (
        <section className="py-12 md:py-16 bg-vintage-coin-400 scroll-mt-32" id="project-info">
            <div className="max-w-7xl mx-auto px-4 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
                    {HIGHLIGHTS.map((item, i) => {
                        const Icon = iconMap[item.icon] || MapPin;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className={`flex flex-col items-center text-center gap-3 ${
                                    i === 4 ? 'col-span-2 md:col-span-1' : ''
                                }`}
                            >
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-southern-sand-200/10 border border-southern-sand-200/20 flex items-center justify-center">
                                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-southern-sand-200" />
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-southern-sand-200 font-serif font-semibold text-sm md:text-base leading-tight">
                                        {item.title}
                                    </p>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <p className="text-southern-sand-200/60 text-xs md:text-sm">
                                            {item.subtitle}
                                        </p>
                                        {item.title === "Great World MRT" && (
                                            <img src="/mrt-great-world.png" alt="TE15" className="h-3.5" />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};