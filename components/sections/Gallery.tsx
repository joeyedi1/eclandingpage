'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { GALLERY_IMAGES } from '@/lib/constants';

export const Gallery = () => {
    return (
        <section className="py-16 md:py-24 bg-southern-sand-200">
            <div className="max-w-7xl mx-auto px-4 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-14"
                >
                    <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-taupe-400 font-medium mb-3">
                        Artist&apos;s Impression
                    </p>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-vintage-coin-400">
                        A Life Less Ordinary
                    </h2>
                </motion.div>

                {/* Bento-style grid: 1 large + 2 stacked on desktop, stacked on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {/* Large featured image */}
                    {GALLERY_IMAGES[0] && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="md:row-span-2 relative overflow-hidden rounded-2xl group aspect-[4/3] md:aspect-auto"
                        >
                            <Image
                                src={GALLERY_IMAGES[0].src}
                                alt={GALLERY_IMAGES[0].alt}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    )}

                    {/* Two stacked images on the right */}
                    {GALLERY_IMAGES.slice(1, 3).map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: (i + 1) * 0.15 }}
                            className="relative overflow-hidden rounded-2xl group aspect-[16/9]"
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom row - full width image if available */}
                {GALLERY_IMAGES[3] && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-3 md:mt-4 relative overflow-hidden rounded-2xl group aspect-[21/9]"
                    >
                        <Image
                            src={GALLERY_IMAGES[3].src}
                            alt={GALLERY_IMAGES[3].alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                )}
            </div>
        </section>
    );
};