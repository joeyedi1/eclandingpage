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

        // SCROLL ANIMATION LOGIC
        // scroll.offset is between 0 and 1

        // Rotate the model based on scroll
        // One full rotation over the entire scroll distance
        meshRef.current.rotation.y = scroll.offset * Math.PI * 2;

        // Slight tilt on X axis
        meshRef.current.rotation.x = scroll.offset * Math.PI * 0.1;

        // Move gently up/down
        meshRef.current.position.y = -1 + Math.sin(scroll.offset * Math.PI) * 0.5;
    });

    return (
        <group ref={meshRef}>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2.5, 3.5, 2.5]} />
                <meshStandardMaterial color="#B3A696" roughness={0.2} metalness={0.8} />
            </mesh>
            {/* Decorative elements to show rotation better */}
            <mesh position={[1.5, -1, 1.5]}>
                <sphereGeometry args={[0.5]} />
                <meshStandardMaterial color="#7A6B5E" roughness={0.1} />
            </mesh>
        </group>
    );
}

export default function ScrollytellingHero() {
    return (
        <div className="h-screen w-full relative bg-southern-sand-200 [&_*::-webkit-scrollbar]:hidden [&_*]:[scrollbar-width:none] [&_*]:[-ms-overflow-style:none]">
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 40 }}>
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
                        <section className="h-screen flex items-center justify-start px-20 text-vintage-coin-400 pointer-events-none relative z-50">
                            <div className="max-w-xl">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="text-7xl font-light tracking-tighter mb-6"
                                >
                                    The <span className="font-serif italic text-taupe-400">Vision</span>
                                </motion.h1>
                                <p className="text-xl text-vintage-coin-400/90">
                                    A sanctuary in the sky. Experience luxury defined by nature and architectural elegance.
                                </p>
                            </div>
                        </section>

                        {/* Page 2: Feature 1 */}
                        <section className="h-screen flex items-center justify-end px-20 text-vintage-coin-400 pointer-events-none">
                            <div className="max-w-xl text-right">
                                <h2 className="text-5xl font-light mb-4 text-vintage-coin-400">Timeless Design</h2>
                                <p className="text-lg text-vintage-coin-400/80">
                                    Crafted with precision. Every angle tells a story of modern sophistication.
                                </p>
                            </div>
                        </section>

                        {/* Page 3: Feature 2 */}
                        <section className="h-screen flex items-center justify-center text-center px-4 text-vintage-coin-400 pointer-events-none">
                            <div className="max-w-2xl bg-white/40 backdrop-blur-md p-12 rounded-2xl border border-vintage-coin-400/10 shadow-lg">
                                <h2 className="text-5xl font-light mb-4 text-vintage-coin-400">360° Living</h2>
                                <p className="text-lg text-vintage-coin-400/80">
                                    Panoramic views that take your breath away. Seamless indoor-outdoor living.
                                </p>
                            </div>
                        </section>

                        {/* Page 4: Call to Action (Transition out) */}
                        <section className="h-screen flex flex-col items-center justify-center text-vintage-coin-400 pointer-events-auto">
                            <h2 className="text-4xl mb-8 font-serif">Ready to explore?</h2>
                        </section>

                    </Scroll>
                </ScrollControls>
            </Canvas>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-vintage-coin-400/30 animate-bounce">
                <p className="text-sm uppercase tracking-[0.3em]">Scroll to Explore</p>
            </div>
        </div>
    );
}
