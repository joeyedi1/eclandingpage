"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Environment } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

function BuildingModel() {
    const meshRef = useRef<THREE.Group>(null);
    const scroll = useScroll();

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // SCROLL ANIMATION LOGIC: "Construction" Effect
        // The building starts flat (scale 0) and grows up (scale 1) as you scroll.

        // 1. Growth Animation (Scale Y)
        // We clamp it slightly so it doesn't disappear completely at the very top (min 0.01)
        const growth = Math.max(0.01, scroll.offset);
        meshRef.current.scale.y = growth;
        meshRef.current.scale.x = 1;
        meshRef.current.scale.z = 1;

        // 2. Gentle Rotation (Constant, not scroll-linked)
        // Gives 3D depth without dizziness
        meshRef.current.rotation.y += delta * 0.05; // Slower rotation
    });

    // Helper for repeating floor slabs to create "detail" texture
    const floors = Array.from({ length: 8 });
    const tallerFloors = Array.from({ length: 10 });

    // Procedural Mullions (Window Frames)
    const Mullions = ({ height, width, count = 3 }: { height: number, width: number, count?: number }) => (
        <group>
            {Array.from({ length: count }).map((_, i) => {
                const x = (i - (count - 1) / 2) * (width / count);
                return (
                    <group key={i} position={[x, height / 2, 0]}>
                        {/* Front Face */}
                        <mesh position={[0, 0, width / 2]}>
                            <boxGeometry args={[0.05, height, 0.05]} />
                            <meshStandardMaterial color="#5A4B3E" />
                        </mesh>
                        {/* Back Face */}
                        <mesh position={[0, 0, -width / 2]}>
                            <boxGeometry args={[0.05, height, 0.05]} />
                            <meshStandardMaterial color="#5A4B3E" />
                        </mesh>
                    </group>
                )
            })}
            {/* Side Mullions */}
            <mesh position={[width / 2, height / 2, 0]}>
                <boxGeometry args={[0.05, height, width]} />
                <meshStandardMaterial color="#5A4B3E" />
            </mesh>
            <mesh position={[-width / 2, height / 2, 0]}>
                <boxGeometry args={[0.05, height, width]} />
                <meshStandardMaterial color="#5A4B3E" />
            </mesh>
        </group>
    );

    return (
        <group ref={meshRef} position={[0, -2.5, 0]} scale={[0.85, 0.85, 0.85]}>
            {/* --- LEFT TOWER --- */}
            <group position={[-1.2, 0, 0]}>
                {/* Core Glass reflecting 'units' */}
                <mesh position={[0, 2, 0]}>
                    <boxGeometry args={[1.4, 4, 1.4]} />
                    <meshStandardMaterial color="#A6B3C3" metalness={0.9} roughness={0.05} />
                </mesh>

                {/* Window Mullions Grid */}
                <Mullions height={4} width={1.5} count={4} />

                {/* Floor Slabs / Balconies */}
                {floors.map((_, i) => (
                    <group key={`l-${i}`} position={[0, i * 0.5 + 0.25, 0]}>
                        {/* Slab */}
                        <mesh>
                            <boxGeometry args={[1.6, 0.08, 1.6]} />
                            <meshStandardMaterial color="#EDE3D6" />
                        </mesh>
                        {/* Glass Railing Hint */}
                        <mesh position={[0, 0.1, 0]}>
                            <boxGeometry args={[1.55, 0.1, 1.55]} />
                            <meshStandardMaterial color="#7A6B5E" transparent opacity={0.3} />
                        </mesh>
                    </group>
                ))}

                {/* Roof Garden */}
                <mesh position={[0, 4.1, 0]}>
                    <boxGeometry args={[1.4, 0.4, 1.4]} />
                    <meshStandardMaterial color="#4A5D4F" />
                </mesh>
            </group>

            {/* --- RIGHT TOWER (Taller) --- */}
            <group position={[1.2, 0, 0]}>
                {/* Core Glass */}
                <mesh position={[0, 2.5, 0]}>
                    <boxGeometry args={[1.4, 5, 1.4]} />
                    <meshStandardMaterial color="#A6B3C3" metalness={0.9} roughness={0.05} />
                </mesh>

                {/* Window Mullions Grid */}
                <Mullions height={5} width={1.5} count={4} />

                {/* Floor Slabs */}
                {tallerFloors.map((_, i) => (
                    <group key={`r-${i}`} position={[0, i * 0.5 + 0.25, 0]}>
                        <mesh>
                            <boxGeometry args={[1.6, 0.08, 1.6]} />
                            <meshStandardMaterial color="#EDE3D6" />
                        </mesh>
                        <mesh position={[0, 0.1, 0]}>
                            <boxGeometry args={[1.55, 0.1, 1.55]} />
                            <meshStandardMaterial color="#7A6B5E" transparent opacity={0.3} />
                        </mesh>
                    </group>
                ))}
                {/* Roof Garden */}
                <mesh position={[0, 5.1, 0]}>
                    <boxGeometry args={[1.4, 0.6, 1.4]} />
                    <meshStandardMaterial color="#4A5D4F" />
                </mesh>
            </group>

            {/* --- SKY BRIDGE --- */}
            <group position={[0, 3, 0]}>
                <mesh>
                    <boxGeometry args={[2, 0.2, 1]} />
                    <meshStandardMaterial color="#7A6B5E" metalness={0.5} />
                </mesh>
                {/* Bridge Glass Railing */}
                <mesh position={[0, 0.2, 0]}>
                    <boxGeometry args={[2, 0.2, 0.9]} />
                    <meshStandardMaterial color="#A6B3C3" transparent opacity={0.4} />
                </mesh>
            </group>

            {/* --- PODIUM BASE --- */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[5, 0.5, 4]} />
                <meshStandardMaterial color="#7A6B5E" roughness={0.5} />
            </mesh>
        </group>
    );
}

export default function ScrollytellingHero() {
    // Adjust camera based on screen width
    function ResponsiveCameraRig() {
        const { camera, size } = useThree();

        // Simple logic: if aspect ratio is portrait (mobile), move camera back
        const isMobile = size.width < 768; // standard md breakpoint

        useFrame(() => {
            // Smoothly interpolate camera position
            const targetZ = isMobile ? 22 : 15;
            const targetY = isMobile ? 0.5 : 1; // Look a bit lower on mobile

            camera.position.z += (targetZ - camera.position.z) * 0.05;
            camera.position.y += (targetY - camera.position.y) * 0.05;
            camera.updateProjectionMatrix();
        });

        return null;
    }

    return (
        <div className="h-screen w-full relative bg-southern-sand-200 [&_*::-webkit-scrollbar]:hidden [&_*]:[scrollbar-width:none] [&_*]:[-ms-overflow-style:none]">
            <Canvas shadows camera={{ position: [0, 1, 15], fov: 30 }}>
                <ResponsiveCameraRig />
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[5, 10, 5]}
                    intensity={1.5}
                    castShadow
                />
                <Environment preset="city" />

                {/* ScrollControls manages the scroll container */}
                <ScrollControls pages={4} damping={0.3}>

                    {/* 3D Content affected by scroll */}
                    <BuildingModel />

                    {/* HTML Overlay Content */}
                    <Scroll html style={{ width: '100%' }}>

                        {/* Page 1: Intro */}
                        <section className="h-screen flex items-center justify-start px-6 md:px-20 text-vintage-coin-400 pointer-events-none relative z-50">
                            <div className="max-w-xl">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="text-5xl md:text-7xl font-light tracking-tighter mb-6"
                                >
                                    The <span className="font-serif italic text-taupe-400">Vision</span>
                                </motion.h1>
                                <p className="text-lg md:text-xl text-vintage-coin-400/90">
                                    A sanctuary in the sky. Experience luxury defined by nature and architectural elegance.
                                </p>
                            </div>
                        </section>

                        {/* Page 2: Feature 1 */}
                        <section className="h-screen flex items-center justify-end px-6 md:px-20 text-vintage-coin-400 pointer-events-none">
                            <div className="max-w-xl text-right">
                                <h2 className="text-4xl md:text-5xl font-light mb-4 text-vintage-coin-400">Timeless Design</h2>
                                <p className="text-base md:text-lg text-vintage-coin-400/80">
                                    Crafted with precision. Every angle tells a story of modern sophistication.
                                </p>
                            </div>
                        </section>

                        {/* Page 3: Feature 2 */}
                        <section className="h-screen flex items-center justify-center text-center px-4 text-vintage-coin-400 pointer-events-none">
                            <div className="max-w-2xl bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-vintage-coin-400/10 shadow-lg">
                                <h2 className="text-4xl md:text-5xl font-light mb-4 text-vintage-coin-400">360° Living</h2>
                                <p className="text-base md:text-lg text-vintage-coin-400/80">
                                    Panoramic views that take your breath away. Seamless indoor-outdoor living.
                                </p>
                            </div>
                        </section>

                        {/* Page 4: Call to Action (Transition out) */}
                        <section className="h-screen flex flex-col items-center justify-center text-vintage-coin-400 pointer-events-auto">
                            <h2 className="text-3xl md:text-4xl mb-8 font-serif">Ready to explore?</h2>
                        </section>

                    </Scroll>
                </ScrollControls>
            </Canvas>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-vintage-coin-400/30 animate-bounce">
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] whitespace-nowrap">Scroll to Explore</p>
            </div>
        </div>
    );
}
