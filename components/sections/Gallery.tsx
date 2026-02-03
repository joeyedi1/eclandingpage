"use client"

import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { GALLERY_IMAGES } from "@/lib/constants"

const GALLERY_META = [
    { label: "The Panorama", sub: "360\u00B0 River Valley vista" },
    { label: "The Pool", sub: "Resort-style infinity pool" },
    { label: "The Garden", sub: "Landscaped pavilion grounds" },
    { label: "The Location", sub: "Singapore River & Jiak Kim" },
    { label: "The Skyline", sub: "District 09 cityscape" },
    { label: "The Site", sub: "Development plot & river frontage" },
]

const LAYOUT = [
    { imgIdx: 3, metaIdx: 0 },
    { imgIdx: 0, metaIdx: 1 },
    { imgIdx: 1, metaIdx: 2 },
    { imgIdx: 2, metaIdx: 3 },
    { imgIdx: 5, metaIdx: 4 },
    { imgIdx: 4, metaIdx: 5 },
]

function Lightbox({
    image,
    meta,
    onClose,
    onPrev,
    onNext,
    current,
    total,
}: {
    image: (typeof GALLERY_IMAGES)[number] | null
    meta: (typeof GALLERY_META)[number] | null
    onClose: () => void
    onPrev: () => void
    onNext: () => void
    current: number
    total: number
}) {
    const touchStartX = useRef<number | null>(null)

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowLeft") onPrev()
            if (e.key === "ArrowRight") onNext()
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [onClose, onPrev, onNext])

    if (!image || !meta) return null

    // Swipe handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return
        const diff = e.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(diff) > 50) {
            if (diff > 0) onPrev()
            else onNext()
        }
        touchStartX.current = null
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
            style={{ background: "rgba(15,12,10,0.92)", backdropFilter: "blur(20px)" }}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
            >
                <X size={28} />
            </button>

            {/* Left arrow */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrev() }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
            >
                <ChevronLeft className="w-6 h-6 text-white/80" />
            </button>

            {/* Right arrow */}
            <button
                onClick={(e) => { e.stopPropagation(); onNext() }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
            >
                <ChevronRight className="w-6 h-6 text-white/80" />
            </button>

            <AnimatePresence mode="wait">
                <motion.div
                    key={image.src}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-[85vw] max-w-5xl max-h-[80vh] rounded-xl overflow-hidden"
                    style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={1600}
                        height={900}
                        className="w-full h-full object-contain"
                        sizes="85vw"
                    />
                </motion.div>
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
            >
                <p className="font-serif text-2xl text-white/90 tracking-wider mb-1">
                    {meta.label}
                </p>
                <p className="text-xs text-white/50 tracking-widest mb-2">
                    {meta.sub}
                </p>
                <p className="text-xs text-white/30">
                    {current + 1} / {total}
                </p>
            </motion.div>
        </motion.div>
    )
}

function GalleryCard({
    image,
    meta,
    index,
    className,
    aspectRatio,
    fillHeight,
    onOpen,
    labelSize = "text-xl",
}: {
    image: (typeof GALLERY_IMAGES)[number]
    meta: (typeof GALLERY_META)[number]
    index: number
    className?: string
    aspectRatio?: string
    fillHeight?: boolean
    onOpen: () => void
    labelSize?: string
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className={`relative overflow-hidden rounded-2xl cursor-pointer group ${className || ""}`}
            style={fillHeight ? { height: "100%" } : { aspectRatio }}
            onClick={onOpen}
        >
            <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
            />

            <span className="absolute top-4 left-5 font-serif text-sm text-white/40 tracking-widest z-10">
                {String(index + 1).padStart(2, "0")}
            </span>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-7">
                <p className={`font-serif ${labelSize} text-white tracking-wider mb-0.5`}>
                    {meta.label}
                </p>
                <p className="text-[11px] text-white/60 tracking-widest">
                    {meta.sub}
                </p>
            </div>
        </motion.div>
    )
}

export function Gallery() {
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

    const currentLightbox = lightboxIdx !== null ? LAYOUT[lightboxIdx] : null

    const handlePrev = useCallback(() => {
        setLightboxIdx((prev) => {
            if (prev === null) return null
            return prev === 0 ? LAYOUT.length - 1 : prev - 1
        })
    }, [])

    const handleNext = useCallback(() => {
        setLightboxIdx((prev) => {
            if (prev === null) return null
            return prev === LAYOUT.length - 1 ? 0 : prev + 1
        })
    }, [])

    return (
        <section id="gallery" className="scroll-mt-32 py-16 md:py-24 bg-southern-sand-200/40">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-14"
                >
                    <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-taupe-400 font-medium mb-3">
                        Artist&apos;s Impression
                    </p>
                    <h2 className="text-3xl md:text-[42px] font-serif italic font-normal text-vintage-coin-400 mb-3">
                        A Life Less Ordinary
                    </h2>
                    <div className="w-12 h-px bg-gold-400 mx-auto" />
                </motion.div>

                {/* HERO ROW */}
                {GALLERY_IMAGES[3] && (
                    <GalleryCard
                        image={GALLERY_IMAGES[3]}
                        meta={GALLERY_META[0]}
                        index={0}
                        aspectRatio="2.8/1"
                        className="mb-3 md:mb-4"
                        onOpen={() => setLightboxIdx(0)}
                        labelSize="text-2xl"
                    />
                )}

                {/* MIDDLE SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-3 md:gap-4 mb-3 md:mb-4">
                    {GALLERY_IMAGES[0] && (
                        <GalleryCard
                            image={GALLERY_IMAGES[0]}
                            meta={GALLERY_META[1]}
                            index={1}
                            fillHeight
                            className="aspect-[1.78/1] md:aspect-auto"
                            onOpen={() => setLightboxIdx(1)}
                        />
                    )}

                    <div className="flex flex-col gap-3 md:gap-4">
                        {GALLERY_IMAGES[1] && (
                            <GalleryCard
                                image={GALLERY_IMAGES[1]}
                                meta={GALLERY_META[2]}
                                index={2}
                                aspectRatio="2.3/1"
                                onOpen={() => setLightboxIdx(2)}
                            />
                        )}

                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            {GALLERY_IMAGES[2] && (
                                <GalleryCard
                                    image={GALLERY_IMAGES[2]}
                                    meta={GALLERY_META[3]}
                                    index={3}
                                    aspectRatio="1/1"
                                    onOpen={() => setLightboxIdx(3)}
                                    labelSize="text-lg"
                                />
                            )}
                            {GALLERY_IMAGES[5] && (
                                <GalleryCard
                                    image={GALLERY_IMAGES[5]}
                                    meta={GALLERY_META[4]}
                                    index={4}
                                    aspectRatio="1/1"
                                    onOpen={() => setLightboxIdx(4)}
                                    labelSize="text-lg"
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* BOTTOM ROW */}
                {GALLERY_IMAGES[4] && (
                    <GalleryCard
                        image={GALLERY_IMAGES[4]}
                        meta={GALLERY_META[5]}
                        index={5}
                        aspectRatio="3/1"
                        onOpen={() => setLightboxIdx(5)}
                        labelSize="text-2xl"
                    />
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {currentLightbox && lightboxIdx !== null && (
                    <Lightbox
                        image={GALLERY_IMAGES[currentLightbox.imgIdx]}
                        meta={GALLERY_META[currentLightbox.metaIdx]}
                        onClose={() => setLightboxIdx(null)}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        current={lightboxIdx}
                        total={LAYOUT.length}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}