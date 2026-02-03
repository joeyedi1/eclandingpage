'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Train, ShoppingBag, GraduationCap, TreePine } from 'lucide-react';

const NEARBY = [
    { icon: Train, name: "Great World MRT (TEL)", distance: "Integrated" },
    { icon: ShoppingBag, name: "Great World Mall", distance: "Sheltered walkway" },
    { icon: GraduationCap, name: "River Valley Primary", distance: "~1 min walk" },
    { icon: TreePine, name: "Kim Seng Park", distance: "At doorstep" },
];

export const Location = () => {
    return (
        <section className="py-16 md:py-24 bg-southern-sand-200" id="location">
            <div className="max-w-7xl mx-auto px-4 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-14"
                >
                    <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-taupe-400 font-medium mb-3">
                        Prime Location
                    </p>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-vintage-coin-400">
                        Heart of River Valley
                    </h2>
                    <p className="text-taupe-400 mt-3 max-w-xl mx-auto">
                        District 09 — minutes from Orchard Road, Robertson Quay, and the CBD.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    {/* Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-3/5 relative rounded-2xl overflow-hidden border border-vintage-coin-400/10 aspect-square lg:aspect-auto"
                    >
                        <Image
                            src="/location-map.png"
                            alt="River Modern location map — Kim Seng Road, near Great World MRT"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                    </motion.div>

                    {/* Nearby amenities */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:w-2/5 flex flex-col gap-4"
                    >
                        {NEARBY.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 bg-white/60 border border-vintage-coin-400/10 rounded-xl p-5 backdrop-blur-sm"
                                >
                                    <div className="w-11 h-11 rounded-full bg-vintage-coin-400/10 flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-5 h-5 text-vintage-coin-400" />
                                    </div>
                                    <div>
                                        <p className="text-vintage-coin-400 font-serif font-semibold text-sm md:text-base">
                                            {item.name}
                                        </p>
                                        <p className="text-taupe-400 text-xs md:text-sm">
                                            {item.distance}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Connectivity highlights */}
                        <div className="bg-vintage-coin-400 rounded-xl p-5 mt-auto">
                            <p className="text-southern-sand-200/80 text-xs uppercase tracking-widest mb-2">By MRT</p>
                            <div className="space-y-1.5">
                                <p className="text-southern-sand-200 text-sm">
                                    <span className="font-semibold">Orchard</span> — 2 stops
                                </p>
                                <p className="text-southern-sand-200 text-sm">
                                    <span className="font-semibold">Marina Bay</span> — 5 stops
                                </p>
                                <p className="text-southern-sand-200 text-sm">
                                    <span className="font-semibold">Woodlands</span> — Direct TEL
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};