"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Environment } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil } from "lucide-react";

// ============================================
// PROGRESSIVE PAYMENT STAGES DATA
// ============================================
const PAYMENT_STAGES = [
    { name: "Foundation Stage", percentage: 5, cumulative: 5, description: "Initial 5% of loan drawn. Construction begins." },
    { name: "Framework Stage", percentage: 10, cumulative: 15, description: "Structural framework taking shape." },
    { name: "Wall Stage", percentage: 5, cumulative: 20, description: "External and internal walls erected." },
    { name: "Ceiling Stage", percentage: 5, cumulative: 25, description: "Ceiling and roofing completed." },
    { name: "Windows Stage", percentage: 5, cumulative: 30, description: "Windows and doors installed." },
    { name: "Car Park Stage", percentage: 5, cumulative: 35, description: "Car park and common areas done." },
    { name: "TOP Stage", percentage: 25, cumulative: 60, description: "Temporary Occupation Permit obtained." },
    { name: "Legal Completion", percentage: 15, cumulative: 75, description: "Keys collected. Welcome home!" },
];

// Stage scroll thresholds - later stages get more scroll range
// Each value represents when that stage ENDS
const STAGE_THRESHOLDS = [0.10, 0.20, 0.30, 0.40, 0.55, 0.70, 0.85, 1.0];

// ============================================
// MORTGAGE CALCULATION HELPER
// ============================================
function calculateMonthlyPayment(principal: number, annualRate: number = 3.5, years: number = 30): number {
    if (principal <= 0) return 0;
    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = years * 12;

    if (monthlyRate === 0) {
        return principal / numberOfPayments;
    }

    const payment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return payment;
}

// Helper to get stage index from scroll offset
function getStageFromScroll(offset: number): number {
    for (let i = 0; i < STAGE_THRESHOLDS.length; i++) {
        if (offset <= STAGE_THRESHOLDS[i]) {
            return i;
        }
    }
    return PAYMENT_STAGES.length - 1;
}

// ============================================
// 3D BUILDING MODEL
// ============================================
function BuildingModel() {
    const meshRef = useRef<THREE.Group>(null);
    const scroll = useScroll();

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Building grows as user scrolls (0 to 1)
        const growth = Math.max(0.01, scroll.offset);
        meshRef.current.scale.y = growth;
        meshRef.current.scale.x = 1;
        meshRef.current.scale.z = 1;

        // Gentle rotation for 3D effect
        meshRef.current.rotation.y += delta * 0.05;
    });

    const floors = Array.from({ length: 8 });
    const tallerFloors = Array.from({ length: 10 });

    const Mullions = ({ height, width, count = 3 }: { height: number, width: number, count?: number }) => (
        <group>
            {Array.from({ length: count }).map((_, i) => {
                const x = (i - (count - 1) / 2) * (width / count);
                return (
                    <group key={i} position={[x, height / 2, 0]}>
                        <mesh position={[0, 0, width / 2]}>
                            <boxGeometry args={[0.05, height, 0.05]} />
                            <meshStandardMaterial color="#5A4B3E" />
                        </mesh>
                        <mesh position={[0, 0, -width / 2]}>
                            <boxGeometry args={[0.05, height, 0.05]} />
                            <meshStandardMaterial color="#5A4B3E" />
                        </mesh>
                    </group>
                )
            })}
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
            {/* LEFT TOWER */}
            <group position={[-1.2, 0, 0]}>
                <mesh position={[0, 2, 0]}>
                    <boxGeometry args={[1.4, 4, 1.4]} />
                    <meshStandardMaterial color="#A6B3C3" metalness={0.9} roughness={0.05} />
                </mesh>
                <Mullions height={4} width={1.5} count={4} />
                {floors.map((_, i) => (
                    <group key={`l-${i}`} position={[0, i * 0.5 + 0.25, 0]}>
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
                <mesh position={[0, 4.1, 0]}>
                    <boxGeometry args={[1.4, 0.4, 1.4]} />
                    <meshStandardMaterial color="#4A5D4F" />
                </mesh>
            </group>

            {/* RIGHT TOWER (Taller) */}
            <group position={[1.2, 0, 0]}>
                <mesh position={[0, 2.5, 0]}>
                    <boxGeometry args={[1.4, 5, 1.4]} />
                    <meshStandardMaterial color="#A6B3C3" metalness={0.9} roughness={0.05} />
                </mesh>
                <Mullions height={5} width={1.5} count={4} />
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
                <mesh position={[0, 5.1, 0]}>
                    <boxGeometry args={[1.4, 0.6, 1.4]} />
                    <meshStandardMaterial color="#4A5D4F" />
                </mesh>
            </group>

            {/* SKY BRIDGE */}
            <group position={[0, 3, 0]}>
                <mesh>
                    <boxGeometry args={[2, 0.2, 1]} />
                    <meshStandardMaterial color="#7A6B5E" metalness={0.5} />
                </mesh>
                <mesh position={[0, 0.2, 0]}>
                    <boxGeometry args={[2, 0.2, 0.9]} />
                    <meshStandardMaterial color="#A6B3C3" transparent opacity={0.4} />
                </mesh>
            </group>

            {/* PODIUM BASE */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[5, 0.5, 4]} />
                <meshStandardMaterial color="#7A6B5E" roughness={0.5} />
            </mesh>
        </group>
    );
}

// ============================================
// PROGRESSIVE PAYMENT OVERLAY (HTML inside Canvas)
// ============================================
function ProgressivePaymentOverlay({ purchasePrice, isLoaded }: { purchasePrice: number, isLoaded: boolean }) {
    const scroll = useScroll();
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [displayedPayment, setDisplayedPayment] = useState(0);
    const [currentLoanQuantum, setCurrentLoanQuantum] = useState(purchasePrice * 0.75);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const purchasePriceRef = useRef(purchasePrice);

    // Skip animation on initial load
    useEffect(() => {
        // Calculate initial payment immediately
        const stage = PAYMENT_STAGES[0];
        const loanQuantum = purchasePrice * 0.75;
        const cumulativeLoan = (stage.cumulative / 100) * loanQuantum;
        const monthly = calculateMonthlyPayment(cumulativeLoan);
        setDisplayedPayment(monthly);
        setCurrentLoanQuantum(loanQuantum);
        
        // Mark initial load complete after a short delay
        const timer = setTimeout(() => setIsInitialLoad(false), 100);
        return () => clearTimeout(timer);
    }, []);

    // Recalculate when purchasePrice changes
    useEffect(() => {
        purchasePriceRef.current = purchasePrice;
        const newLoanQuantum = purchasePrice * 0.75;
        setCurrentLoanQuantum(newLoanQuantum);
        
        // Immediately recalculate the displayed payment for current stage
        const stage = PAYMENT_STAGES[currentStageIndex];
        const cumulativeLoan = (stage.cumulative / 100) * newLoanQuantum;
        const monthly = calculateMonthlyPayment(cumulativeLoan);
        setDisplayedPayment(monthly);
    }, [purchasePrice, currentStageIndex]);

    useFrame(() => {
        // Use custom thresholds for better stage distribution
        const stageIndex = getStageFromScroll(scroll.offset);

        if (stageIndex !== currentStageIndex) {
            setCurrentStageIndex(stageIndex);
        }

        // Calculate monthly payment for current stage using ref for latest value
        const stage = PAYMENT_STAGES[stageIndex];
        const loanQuantum = purchasePriceRef.current * 0.75;
        const cumulativeLoan = (stage.cumulative / 100) * loanQuantum;
        const monthly = calculateMonthlyPayment(cumulativeLoan);

        // Smooth animation for payment display
        setDisplayedPayment(prev => {
            const diff = monthly - prev;
            if (Math.abs(diff) < 1) return monthly; // Snap to final value
            return prev + diff * 0.15;
        });
    });

    const currentStage = PAYMENT_STAGES[currentStageIndex];
    const progressPercent = ((currentStageIndex + 1) / PAYMENT_STAGES.length) * 100;

    return (
        <Scroll html style={{ width: '100%' }}>
            {/* Scrollable Content - 8 pages for 8 stages */}
            {PAYMENT_STAGES.map((stage, index) => (
                <section
                    key={stage.name}
                    className="h-screen flex items-center pointer-events-none pt-32 md:pt-0"
                    style={{
                        justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                    }}
                >
                    <div className={`px-4 md:px-20 ${index % 2 === 0 ? 'text-left' : 'text-right'} w-full md:w-auto transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                        <AnimatePresence mode="wait">
                            {currentStageIndex === index && (
                                <motion.div
                                    key={stage.name}
                                    initial={isInitialLoad ? false : { opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="max-w-sm md:max-w-md"
                                >
                                    {/* Stage Badge */}
                                    <div className="inline-block bg-vintage-coin-400 text-white text-[10px] md:text-xs font-medium px-2 md:px-3 py-0.5 md:py-1 rounded-full mb-2 md:mb-4">
                                        Stage {index + 1} of {PAYMENT_STAGES.length}
                                    </div>

                                    {/* Stage Name */}
                                    <h2 className="text-2xl md:text-6xl font-light text-vintage-coin-400 mb-1 md:mb-2">
                                        {stage.name.split(' ')[0]}{' '}
                                        <span className="font-serif italic text-taupe-400">
                                            {stage.name.split(' ').slice(1).join(' ')}
                                        </span>
                                    </h2>

                                    {/* Monthly Payment */}
                                    <div className="my-3 md:my-6">
                                        <p className="text-xs md:text-sm text-vintage-coin-400/60 mb-0.5 md:mb-1">Monthly Payment</p>
                                        <p className="text-3xl md:text-7xl font-bold text-vintage-coin-400 font-mono">
                                            ${Math.round(displayedPayment).toLocaleString()}
                                            <span className="text-sm md:text-2xl text-taupe-400 font-normal">/mo</span>
                                        </p>
                                    </div>

                                    {/* Stage Details */}
                                    <div className="space-y-1 md:space-y-2 text-vintage-coin-400/80">
                                        <p className="text-sm md:text-lg">{stage.description}</p>
                                        <p className="text-xs md:text-sm">
                                            <span className="font-medium">{stage.cumulative}%</span> of loan drawn
                                            <span className="mx-1 md:mx-2">•</span>
                                            <span className="font-medium">
                                                ${Math.round((stage.cumulative / 100) * currentLoanQuantum).toLocaleString()}
                                            </span> principal
                                        </p>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-4 md:mt-6">
                                        <div className="h-1.5 md:h-2 bg-vintage-coin-400/20 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-vintage-coin-400 rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progressPercent}%` }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-[10px] md:text-xs text-vintage-coin-400/50 mt-1 md:mt-2">
                                            <span>Foundation</span>
                                            <span>Completion</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>
            ))}
        </Scroll>
    );
}

// ============================================
// PRICE INPUT COMPONENT (Outside Canvas)
// ============================================
function PriceInputSection({ purchasePrice, setPurchasePrice }: { purchasePrice: number, setPurchasePrice: (price: number) => void }) {
    const [inputValue, setInputValue] = useState(purchasePrice.toLocaleString());
    const [hasChanges, setHasChanges] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Check for mobile on mount and resize
    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Calculate dynamic width based on input length
    const getInputWidth = (value: string) => {
        const length = value.length;
        // Use desktop width initially to prevent layout shift, then adjust
        if (!mounted) {
            return Math.max(160, length * 36 + 10);
        }
        if (isMobile) {
            return Math.max(100, length * 20 + 10);
        }
        return Math.max(160, length * 36 + 10);
    };

    // Format number with commas
    const formatWithCommas = (value: string) => {
        const num = value.replace(/[^0-9]/g, '');
        if (!num || num === '0') return '0';
        return parseInt(num).toLocaleString();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^0-9]/g, '');
        
        // Allow empty/zero state while typing
        if (!raw || raw === '0') {
            setInputValue('0');
            setHasChanges(purchasePrice !== 0);
            return;
        }
        
        const formatted = formatWithCommas(raw);
        setInputValue(formatted);
        
        const parsed = parseInt(raw);
        if (!isNaN(parsed) && parsed > 0 && parsed <= 99999999) {
            setHasChanges(parsed !== purchasePrice);
        } else {
            setHasChanges(true); // Mark as changed but invalid
        }
    };

    const applyChanges = () => {
        const raw = inputValue.replace(/[^0-9]/g, '');
        const parsed = parseInt(raw);
        if (!isNaN(parsed) && parsed > 0 && parsed <= 99999999) {
            setPurchasePrice(parsed);
            setHasChanges(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            applyChanges();
            inputRef.current?.blur();
        }
    };

    const handleBlur = () => {
        // Reset to current purchase price if invalid
        const raw = inputValue.replace(/[^0-9]/g, '');
        const parsed = parseInt(raw);
        if (isNaN(parsed) || parsed <= 0 || parsed > 99999999) {
            setInputValue(purchasePrice.toLocaleString());
            setHasChanges(false);
        }
    };

    const handleFocus = () => {
        setTimeout(() => inputRef.current?.select(), 0);
    };

    // Sync input when purchasePrice changes externally
    useEffect(() => {
        setInputValue(purchasePrice.toLocaleString());
        setHasChanges(false);
    }, [purchasePrice]);

    return (
        <div className="absolute top-20 md:top-24 left-0 right-0 z-50 pointer-events-auto">
            <div className="max-w-7xl mx-auto px-4 md:px-20">
                <div className="text-center text-vintage-coin-400/70">
                    <p className="text-xs md:text-base mb-1 md:mb-2">How much do you need for a</p>
                    <div className="inline-flex items-baseline justify-center">
                        <span className="text-3xl md:text-6xl font-bold text-vintage-coin-400 font-mono">$</span>
                        <div className="relative">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                onKeyDown={handleKeyDown}
                                style={{ width: `${getInputWidth(inputValue)}px` }}
                                className="text-3xl md:text-6xl font-bold text-vintage-coin-400 bg-transparent border-b-2 border-dashed border-vintage-coin-400/40 hover:border-vintage-coin-400 focus:border-vintage-coin-400 focus:border-solid outline-none text-left font-mono transition-all cursor-text"
                                placeholder="1,500,000"
                            />
                            <Pencil className="absolute -right-5 md:-right-7 top-1/2 -translate-y-1/2 w-3 h-3 md:w-5 md:h-5 text-vintage-coin-400/40" />
                        </div>
                    </div>
                    <p className="text-xs md:text-base mt-1 md:mt-2">Property</p>
                    
                    {/* Apply Button - shows when there are changes */}
                    <AnimatePresence>
                        {hasChanges && (
                            <motion.button
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                onClick={applyChanges}
                                className="mt-3 md:mt-4 px-4 md:px-6 py-1.5 md:py-2 bg-vintage-coin-400 text-white rounded-full text-xs md:text-sm font-medium hover:bg-taupe-400 transition-colors shadow-lg"
                            >
                                Apply Price
                            </motion.button>
                        )}
                    </AnimatePresence>
                    
                    {/* Hint text */}
                    <p className="text-[10px] md:text-xs text-vintage-coin-400/40 mt-1 md:mt-2">
                        {hasChanges ? "Press Enter or click Apply" : "Click to edit price"}
                    </p>
                </div>
            </div>
        </div>
    );
}

// ============================================
// RESPONSIVE CAMERA RIG
// ============================================
function ResponsiveCameraRig() {
    const { camera, size } = useThree();
    const isMobile = size.width < 768;

    useFrame(() => {
        const targetZ = isMobile ? 22 : 15;
        const targetY = isMobile ? 0.5 : 1;

        camera.position.z += (targetZ - camera.position.z) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        camera.updateProjectionMatrix();
    });

    return null;
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function ScrollytellingHero() {
    const [purchasePrice, setPurchasePrice] = useState(1500000);
    const [resetKey, setResetKey] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Listen for reset event from Navbar
    useEffect(() => {
        const handleReset = () => {
            setResetKey(prev => prev + 1);
            setIsLoaded(false); // Reset loading state on reset
        };

        window.addEventListener('resetScrollytelling', handleReset);
        return () => window.removeEventListener('resetScrollytelling', handleReset);
    }, []);

    // Handle Canvas loaded - with small delay to ensure 3D is rendered
    const handleCanvasReady = () => {
        setTimeout(() => {
            setIsLoaded(true);
            // Dispatch event so Navbar knows to show
            window.dispatchEvent(new CustomEvent('pageFullyLoaded'));
        }, 300);
    };

    return (
        <div className="h-screen w-full relative bg-southern-sand-200 [&_*::-webkit-scrollbar]:hidden [&_*]:[scrollbar-width:none] [&_*]:[-ms-overflow-style:none]">
            {/* Price Input - Only show after Canvas is loaded */}
            <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <PriceInputSection purchasePrice={purchasePrice} setPurchasePrice={setPurchasePrice} />
            </div>
            
            <Canvas 
                key={resetKey} 
                shadows 
                camera={{ position: [0, 1, 15], fov: 30 }} 
                onCreated={handleCanvasReady}
            >
                <ResponsiveCameraRig />
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
                <Environment preset="city" />

                <ScrollControls pages={8} damping={0.3}>
                    <BuildingModel />
                    <ProgressivePaymentOverlay purchasePrice={purchasePrice} isLoaded={isLoaded} />
                </ScrollControls>
            </Canvas>

            {/* Scroll indicator - Only show after loaded */}
            <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 text-vintage-coin-400/30 animate-bounce transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] whitespace-nowrap">Scroll to Explore</p>
            </div>
        </div>
    );
}