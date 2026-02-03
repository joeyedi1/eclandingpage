'use client';
import { motion } from 'framer-motion';
import { PROJECT_INFO } from '@/lib/constants';
import { Building2, MapPin, Calendar, Home, Ruler, Clock } from 'lucide-react';

const details = [
    { icon: Building2, label: "Developer", value: PROJECT_INFO.developer },
    { icon: MapPin, label: "Address", value: PROJECT_INFO.address },
    { icon: Home, label: "Total Units", value: `${PROJECT_INFO.totalUnits} Units` },
    { icon: Ruler, label: "Site Area", value: PROJECT_INFO.siteArea },
    { icon: Clock, label: "Tenure", value: "99 Years" },
    { icon: Calendar, label: "Est. TOP", value: PROJECT_INFO.estTop },
];

export const ProjectDetails = () => {
    return (
        <section className="py-16 md:py-20 bg-pine-tree-900" id="project-details">
            <div className="max-w-7xl mx-auto px-4 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-14"
                >
                    <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-taupe-400 font-medium mb-3">
                        Development Details
                    </p>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-southern-sand-200">
                        River Modern
                    </h2>
                    <p className="text-taupe-400 mt-3 max-w-xl mx-auto">
                        The flagship development of River Valley — 455 residences nestled along the Singapore River in prime District 09.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                    {details.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.4 }}
                                className="bg-pine-tree-800/50 border border-southern-sand-200/5 rounded-xl p-5 text-center"
                            >
                                <Icon className="w-5 h-5 text-taupe-400 mx-auto mb-3" />
                                <p className="text-southern-sand-200 font-serif font-semibold text-sm md:text-base leading-tight">
                                    {item.value}
                                </p>
                                <p className="text-taupe-400/60 text-xs mt-1.5 uppercase tracking-wider">
                                    {item.label}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Unit size range */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center"
                >
                    <p className="text-taupe-400/60 text-sm">
                        Unit sizes from <span className="text-southern-sand-200 font-medium">538 sqft</span> (2BR) to <span className="text-southern-sand-200 font-medium">1,830 sqft</span> (4BR Plus)
                    </p>
                </motion.div>
            </div>
        </section>
    );
};