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


// Loan-to-value ratio for EC properties (75% financing)
const LOAN_TO_VALUE_RATIO = 0.75;
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
// 3D BUILDING MODEL — River Modern
// ============================================

// Reusable tower component
function Tower({
    floorCount,
    width,
    depth,
    floorHeight,
    position,
}: {
    floorCount: number;
    width: number;
    depth: number;
    floorHeight: number;
    position: [number, number, number];
}) {
    const totalHeight = floorCount * floorHeight;
    const facadeColor = "#C8B99A";
    const balconyColor = "#D5C9B5";
    const accentColor = "#A89880";
    const mullionColor = "#8A7A68";

    return (
        <group position={position}>
            {/* Main glass core — golden sunset mirror */}
            <mesh position={[0, totalHeight / 2, 0]}>
                <boxGeometry args={[width * 0.94, totalHeight, depth * 0.94]} />
                <meshPhysicalMaterial
                    color="#B8965A"
                    metalness={1}
                    roughness={0.03}
                    envMapIntensity={3.5}
                    clearcoat={1}
                    clearcoatRoughness={0.05}
                />
            </mesh>

            {/* Floor slabs + balconies + glass panels */}
            {Array.from({ length: floorCount }).map((_, i) => {
                const y = i * floorHeight;
                return (
                    <group key={`floor-${i}`} position={[0, y, 0]}>
                        {/* Floor slab — thin to maximize glass */}
                        <mesh position={[0, 0, 0]}>
                            <boxGeometry args={[width, 0.04, depth]} />
                            <meshStandardMaterial color={balconyColor} roughness={0.7} />
                        </mesh>

                        {/* Glass balcony railing — front */}
                        <mesh position={[0, floorHeight * 0.45, depth / 2 + 0.02]}>
                            <boxGeometry args={[width, floorHeight * 0.4, 0.015]} />
                            <meshPhysicalMaterial
                                color="#C8A868"
                                metalness={0.8}
                                roughness={0.1}
                                transparent
                                opacity={0.35}
                                envMapIntensity={3}
                            />
                        </mesh>

                        {/* Glass balcony railing — back */}
                        <mesh position={[0, floorHeight * 0.45, -(depth / 2 + 0.02)]}>
                            <boxGeometry args={[width, floorHeight * 0.4, 0.015]} />
                            <meshPhysicalMaterial
                                color="#C8A868"
                                metalness={0.8}
                                roughness={0.1}
                                transparent
                                opacity={0.35}
                                envMapIntensity={3}
                            />
                        </mesh>

                        {/* Side facade trim — left */}
                        <mesh position={[-(width / 2), floorHeight / 2, 0]}>
                            <boxGeometry args={[0.03, floorHeight * 0.9, depth * 0.96]} />
                            <meshStandardMaterial color={facadeColor} roughness={0.6} />
                        </mesh>

                        {/* Side facade trim — right */}
                        <mesh position={[width / 2, floorHeight / 2, 0]}>
                            <boxGeometry args={[0.03, floorHeight * 0.9, depth * 0.96]} />
                            <meshStandardMaterial color={facadeColor} roughness={0.6} />
                        </mesh>
                    </group>
                );
            })}

            {/* Vertical mullions — front face */}
            {Array.from({ length: 5 }).map((_, i) => {
                const x = (i - 2) * (width / 4.5);
                return (
                    <group key={`mf-${i}`}>
                        <mesh position={[x, totalHeight / 2, depth / 2]}>
                            <boxGeometry args={[0.03, totalHeight, 0.03]} />
                            <meshStandardMaterial color={mullionColor} />
                        </mesh>
                        <mesh position={[x, totalHeight / 2, -(depth / 2)]}>
                            <boxGeometry args={[0.03, totalHeight, 0.03]} />
                            <meshStandardMaterial color={mullionColor} />
                        </mesh>
                    </group>
                );
            })}

            {/* Crown / rooftop cap */}
            <mesh position={[0, totalHeight + 0.1, 0]}>
                <boxGeometry args={[width * 1.02, 0.2, depth * 1.02]} />
                <meshStandardMaterial color={facadeColor} roughness={0.4} metalness={0.2} />
            </mesh>

            {/* Rooftop feature — mechanical penthouse */}
            <mesh position={[0, totalHeight + 0.35, 0]}>
                <boxGeometry args={[width * 0.5, 0.3, depth * 0.5]} />
                <meshStandardMaterial color={accentColor} roughness={0.5} />
            </mesh>
        </group>
    );
}

// Simple tree
function Tree({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <mesh position={[0, 0.2, 0]}>
                <cylinderGeometry args={[0.03, 0.04, 0.4, 6]} />
                <meshStandardMaterial color="#5A4A38" />
            </mesh>
            <mesh position={[0, 0.55, 0]}>
                <sphereGeometry args={[0.22, 8, 6]} />
                <meshStandardMaterial color="#4A7A42" roughness={0.9} />
            </mesh>
            <mesh position={[0.08, 0.65, 0.05]}>
                <sphereGeometry args={[0.16, 8, 6]} />
                <meshStandardMaterial color="#3D6B35" roughness={0.9} />
            </mesh>
            <mesh position={[-0.06, 0.48, -0.04]}>
                <sphereGeometry args={[0.14, 8, 6]} />
                <meshStandardMaterial color="#5A8A4E" roughness={0.9} />
            </mesh>
        </group>
    );
}

// Arch bridge
function ArchBridge({ span, height, position }: { span: number; height: number; position: [number, number, number] }) {
    const segments = 16;
    return (
        <group position={position}>
            {Array.from({ length: segments }).map((_, i) => {
                const t = i / (segments - 1);
                const x = (t - 0.5) * span;
                const y = Math.sin(t * Math.PI) * height;
                const nextT = (i + 1) / (segments - 1);
                const nextX = (nextT - 0.5) * span;
                const nextY = Math.sin(nextT * Math.PI) * height;
                const midX = (x + nextX) / 2;
                const midY = (y + nextY) / 2;
                const dx = nextX - x;
                const dy = nextY - y;
                const len = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx);

                return i < segments - 1 ? (
                    <mesh key={`arch-${i}`} position={[midX, midY, 0]} rotation={[0, 0, angle]}>
                        <boxGeometry args={[len, 0.06, 0.06]} />
                        <meshStandardMaterial color="#B8B0A0" metalness={0.6} roughness={0.3} />
                    </mesh>
                ) : null;
            })}

            {/* Bridge deck */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[span * 0.95, 0.08, 0.8]} />
                <meshStandardMaterial color="#C0B8A8" roughness={0.5} metalness={0.2} />
            </mesh>

            {/* Deck railings */}
            <mesh position={[0, 0.12, 0.38]}>
                <boxGeometry args={[span * 0.9, 0.18, 0.02]} />
                <meshStandardMaterial color="#B0A898" transparent opacity={0.5} metalness={0.4} />
            </mesh>
            <mesh position={[0, 0.12, -0.38]}>
                <boxGeometry args={[span * 0.9, 0.18, 0.02]} />
                <meshStandardMaterial color="#B0A898" transparent opacity={0.5} metalness={0.4} />
            </mesh>

            {/* Vertical cables from arch to deck */}
            {Array.from({ length: 8 }).map((_, i) => {
                const t = (i + 1) / 9;
                const x = (t - 0.5) * span * 0.9;
                const archY = Math.sin(t * Math.PI) * height;
                return (
                    <mesh key={`cable-${i}`} position={[x, archY / 2, 0]}>
                        <boxGeometry args={[0.015, archY, 0.015]} />
                        <meshStandardMaterial color="#A09888" metalness={0.5} />
                    </mesh>
                );
            })}
        </group>
    );
}

function BuildingModel() {
    const meshRef = useRef<THREE.Group>(null);
    const scroll = useScroll();

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        const growth = Math.max(0.01, scroll.offset);
        // Eased growth — starts taller so light catches facades earlier
        const easedGrowth = 0.15 + growth * 0.65;
        meshRef.current.scale.y = easedGrowth;
        meshRef.current.scale.x = 1;
        meshRef.current.scale.z = 1;

        meshRef.current.rotation.y += delta * 0.05;
    });

    const leftFloors = 16;
    const rightFloors = 22;
    const floorH = 0.24;
    const towerW = 1.4;
    const towerD = 1.2;

    return (
        <group ref={meshRef} position={[0, -2.8, 0]} scale={[0.7, 0.7, 0.7]}>
            {/* LEFT TOWER — shorter */}
            <Tower floorCount={leftFloors} width={towerW} depth={towerD} floorHeight={floorH} position={[-1.3, 0.5, 0]} />

            {/* RIGHT TOWER — taller */}
            <Tower floorCount={rightFloors} width={towerW} depth={towerD} floorHeight={floorH} position={[1.3, 0.5, 0]} />

            {/* ARCH BRIDGE at base */}
            <ArchBridge span={3.8} height={0.9} position={[0, 0.8, 0.8]} />

            {/* RIVER / WATER PLANE */}
            <mesh position={[0, 0.1, 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[6, 3]} />
                <meshPhysicalMaterial color="#5A8A7A" metalness={0.2} roughness={0.1} transparent opacity={0.7} />
            </mesh>

            {/* GROUND */}
            <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[8, 6]} />
                <meshStandardMaterial color="#6A8A5A" roughness={0.95} />
            </mesh>

            {/* Podium / arrival deck */}
            <mesh position={[0, 0.35, -0.6]}>
                <boxGeometry args={[4.2, 0.15, 1.8]} />
                <meshStandardMaterial color="#C8BCA8" roughness={0.6} />
            </mesh>
            <mesh position={[-1.3, 0.43, -1.6]}>
                <boxGeometry args={[1.6, 0.05, 0.4]} />
                <meshStandardMaterial color="#B8AE9A" roughness={0.5} />
            </mesh>
            <mesh position={[1.3, 0.43, -1.6]}>
                <boxGeometry args={[1.6, 0.05, 0.4]} />
                <meshStandardMaterial color="#B8AE9A" roughness={0.5} />
            </mesh>

            {/* TREES — left */}
            <Tree position={[-2.2, 0, 0.3]} />
            <Tree position={[-2.5, 0, -0.5]} />
            <Tree position={[-2.0, 0, -1.0]} />
            <Tree position={[-2.6, 0, 0.9]} />
            <Tree position={[-1.9, 0, 1.5]} />

            {/* TREES — right */}
            <Tree position={[2.2, 0, 0.3]} />
            <Tree position={[2.5, 0, -0.5]} />
            <Tree position={[2.0, 0, -1.0]} />
            <Tree position={[2.6, 0, 0.9]} />
            <Tree position={[1.9, 0, 1.5]} />

            {/* TREES — river bank */}
            <Tree position={[-1.3, 0, 2.0]} />
            <Tree position={[0, 0, 2.3]} />
            <Tree position={[1.3, 0, 2.0]} />
            <Tree position={[-0.7, 0, 2.5]} />
            <Tree position={[0.7, 0, 2.5]} />

            {/* TREES — behind */}
            <Tree position={[-0.5, 0, -2.0]} />
            <Tree position={[0.5, 0, -2.0]} />
            <Tree position={[-1.5, 0, -1.8]} />
            <Tree position={[1.5, 0, -1.8]} />

            {/* River bank edges */}
            <mesh position={[0, 0.2, 2.4]}>
                <boxGeometry args={[5, 0.15, 0.1]} />
                <meshStandardMaterial color="#7A8A6A" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.2, -0.8]}>
                <boxGeometry args={[5, 0.15, 0.1]} />
                <meshStandardMaterial color="#7A8A6A" roughness={0.8} />
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
    const [currentLoanQuantum, setCurrentLoanQuantum] = useState(purchasePrice * LOAN_TO_VALUE_RATIO);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const purchasePriceRef = useRef(purchasePrice);

    // Skip animation on initial load
    useEffect(() => {
        // Calculate initial payment immediately using ref
        const stage = PAYMENT_STAGES[0];
        const loanQuantum = purchasePriceRef.current * LOAN_TO_VALUE_RATIO;
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
        const newLoanQuantum = purchasePrice * LOAN_TO_VALUE_RATIO;
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
            // Dispatch event for mobile card
            window.dispatchEvent(new CustomEvent('stageChange', {
                detail: { stageIndex }
            }));
        }

        // Calculate monthly payment for current stage using ref for latest value
        const stage = PAYMENT_STAGES[stageIndex];
        const loanQuantum = purchasePriceRef.current * LOAN_TO_VALUE_RATIO;
        const cumulativeLoan = (stage.cumulative / 100) * loanQuantum;
        const monthly = calculateMonthlyPayment(cumulativeLoan);

        // Smooth animation for payment display - only update if meaningful change
        setDisplayedPayment(prev => {
            const diff = monthly - prev;
            // Skip update if difference is negligible (reduces re-renders)
            if (Math.abs(diff) < 0.5) return prev;
            // Snap to final value when very close
            if (Math.abs(diff) < 1) return monthly;
            const newValue = prev + diff * 0.15;
            // Dispatch payment update for mobile card
            window.dispatchEvent(new CustomEvent('paymentUpdate', {
                detail: { payment: newValue, loanQuantum }
            }));
            return newValue;
        });
    });

    const progressPercent = ((currentStageIndex + 1) / PAYMENT_STAGES.length) * 100;

    return (
        <Scroll html style={{ width: '100%' }}>
            {/* Scrollable Content - 8 pages for 8 stages */}
            {PAYMENT_STAGES.map((stage, index) => (
                <section
                    key={stage.name}
                    className="h-screen flex pointer-events-none"
                    style={{
                        justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                        alignItems: 'center',
                        paddingTop: '60px',
                    }}
                >
                    {/* Desktop only - hidden on mobile */}
                    <div className={`
                        hidden md:block
                        px-4 md:px-20 
                        ${index % 2 === 0 ? 'text-left' : 'text-right'} 
                        w-full md:w-auto 
                        transition-opacity duration-500 
                        ${isLoaded ? 'opacity-100' : 'opacity-0'}
                    `}>
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
            return Math.max(180, length * 42 + 10);
        }
        if (isMobile) {
            return Math.max(120, length * 24 + 10);
        }
        return Math.max(180, length * 42 + 10);
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
        <div className="absolute top-20 md:top-24 left-0 right-0 z-[45] pointer-events-none">
            <div className="max-w-7xl mx-auto px-4 md:px-20">
                <div className="text-center text-vintage-coin-400">
                    <p className="text-sm md:text-lg font-medium mb-1 md:mb-2">How much do you need for a</p>
                    <div className="inline-flex items-baseline justify-center pointer-events-auto">
                        <span className="text-4xl md:text-7xl font-extrabold text-vintage-coin-400 font-mono">$</span>
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
                                className="text-4xl md:text-7xl font-extrabold text-vintage-coin-400 bg-transparent border-b-2 border-dashed border-vintage-coin-400/40 hover:border-vintage-coin-400 focus:border-vintage-coin-400 focus:border-solid outline-none text-left font-mono transition-all cursor-text"
                                placeholder="1,500,000"
                            />
                            <Pencil className="absolute -right-6 md:-right-8 top-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 text-vintage-coin-400/50" />
                        </div>
                    </div>
                    <p className="text-sm md:text-lg font-medium mt-1 md:mt-2">Property</p>

                    {/* Apply Button - shows when there are changes */}
                    <AnimatePresence>
                        {hasChanges && (
                            <motion.button
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                onClick={applyChanges}
                                className="mt-3 md:mt-4 px-4 md:px-6 py-1.5 md:py-2 bg-vintage-coin-400 text-white rounded-full text-xs md:text-sm font-medium hover:bg-taupe-400 transition-colors shadow-lg pointer-events-auto"
                            >
                                Apply Price
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Hint text */}
                    <p className="text-[10px] md:text-xs text-vintage-coin-400/60 mt-1 md:mt-2">
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
        const targetZ = isMobile ? 24 : 16;
        const targetY = isMobile ? 1.5 : 2;

        camera.position.z += (targetZ - camera.position.z) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        camera.updateProjectionMatrix();
    });

    return null;
}

// ============================================
// MOBILE STAGE CARD (Outside Canvas)
// ============================================
function MobileStageCard({ purchasePrice, isLoaded, isVisible }: { purchasePrice: number, isLoaded: boolean, isVisible: boolean }) {
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [displayedPayment, setDisplayedPayment] = useState(0);
    const [loanQuantum, setLoanQuantum] = useState(purchasePrice * LOAN_TO_VALUE_RATIO);

    // Listen for stage and payment updates from Canvas
    useEffect(() => {
        const handleStageChange = (e: CustomEvent) => {
            setCurrentStageIndex(e.detail.stageIndex);
        };

        const handlePaymentUpdate = (e: CustomEvent) => {
            setDisplayedPayment(e.detail.payment);
            setLoanQuantum(e.detail.loanQuantum);
        };

        window.addEventListener('stageChange', handleStageChange as EventListener);
        window.addEventListener('paymentUpdate', handlePaymentUpdate as EventListener);

        return () => {
            window.removeEventListener('stageChange', handleStageChange as EventListener);
            window.removeEventListener('paymentUpdate', handlePaymentUpdate as EventListener);
        };
    }, []);

    // Initialize with correct values
    useEffect(() => {
        const newLoanQuantum = purchasePrice * LOAN_TO_VALUE_RATIO;
        setLoanQuantum(newLoanQuantum);
        const stage = PAYMENT_STAGES[currentStageIndex];
        const cumulativeLoan = (stage.cumulative / 100) * newLoanQuantum;
        setDisplayedPayment(calculateMonthlyPayment(cumulativeLoan));
    }, [purchasePrice, currentStageIndex]);

    const stage = PAYMENT_STAGES[currentStageIndex];
    const progressPercent = ((currentStageIndex + 1) / PAYMENT_STAGES.length) * 100;

    // Don't render if not visible or not loaded
    if (!isVisible || !isLoaded) return null;

    return (
        <div className={`
            md:hidden fixed bottom-0 left-0 right-0 z-30
            bg-gradient-to-t from-southern-sand-200 via-southern-sand-200 to-transparent
            pt-3 pb-6 px-4
            pointer-events-none
            transition-opacity duration-300
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={stage.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                >
                    {/* Stage Badge */}
                    <div className="inline-block bg-vintage-coin-400 text-white text-[10px] font-medium px-2 py-0.5 rounded-full mb-2">
                        Stage {currentStageIndex + 1} of {PAYMENT_STAGES.length}
                    </div>

                    {/* Stage Name */}
                    <h2 className="text-xl font-light text-vintage-coin-400 mb-1">
                        {stage.name.split(' ')[0]}{' '}
                        <span className="font-serif italic text-taupe-400">
                            {stage.name.split(' ').slice(1).join(' ')}
                        </span>
                    </h2>

                    {/* Monthly Payment */}
                    <p className="text-3xl font-bold text-vintage-coin-400 font-mono mb-1">
                        ${Math.round(displayedPayment).toLocaleString()}
                        <span className="text-sm text-taupe-400 font-normal">/mo</span>
                    </p>

                    {/* Stage Details - Compact */}
                    <p className="text-xs text-vintage-coin-400/70 mb-2">
                        {stage.cumulative}% drawn • ${Math.round((stage.cumulative / 100) * loanQuantum).toLocaleString()} principal
                    </p>

                    {/* Progress Bar */}
                    <div className="max-w-xs mx-auto">
                        <div className="h-1.5 bg-vintage-coin-400/20 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-vintage-coin-400 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercent}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                        <div className="flex justify-between text-[9px] text-vintage-coin-400/50 mt-1">
                            <span>Foundation</span>
                            <span>Completion</span>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function ScrollytellingHero() {
    const [purchasePrice, setPurchasePrice] = useState(1500000);
    const [resetKey, setResetKey] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobileCardVisible, setIsMobileCardVisible] = useState(true);

    // Listen for reset event from Navbar
    useEffect(() => {
        const handleReset = () => {
            setResetKey(prev => prev + 1);
            setIsLoaded(false); // Reset loading state on reset
            setIsMobileCardVisible(true); // Show card again on reset
        };

        window.addEventListener('resetScrollytelling', handleReset);
        return () => window.removeEventListener('resetScrollytelling', handleReset);
    }, []);

    // Track scroll position to hide mobile card when past hero section
    useEffect(() => {
        const handleScroll = () => {
            // Hide card as soon as user scrolls past the hero
            // The scrollytelling uses 8 pages inside ScrollControls, but the hero container is 1 viewport
            // So we hide the card once the user scrolls at all past the hero
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            // Hide when we've scrolled just 10% past the hero section start
            setIsMobileCardVisible(scrollY < viewportHeight * 0.1);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initial position

        return () => window.removeEventListener('scroll', handleScroll);
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
            {/* Gradient fade overlay at top - fades content as it approaches navbar */}
            <div
                className="absolute top-0 left-0 right-0 h-32 md:h-40 z-40 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, rgba(237, 227, 214, 1) 0%, rgba(237, 227, 214, 0.9) 70%, rgba(237, 227, 214, 0) 100%)'
                }}
            />

            {/* Price Input - Only show after Canvas is loaded */}
            <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <PriceInputSection purchasePrice={purchasePrice} setPurchasePrice={setPurchasePrice} />
            </div>

            <Canvas
                key={resetKey}
                shadows
                camera={{ position: [0, 2, 16], fov: 32 }}
                onCreated={handleCanvasReady}
            >
                <ResponsiveCameraRig />
                <ambientLight intensity={0.5} color="#FFE0C0" />
                <directionalLight position={[4, 6, 4]} intensity={2} castShadow color="#FFCB8A" />
                <directionalLight position={[-3, 5, -2]} intensity={0.8} color="#FFD4A8" />
                {/* Golden sunset glow — hits glass from the front */}
                <pointLight position={[0, 3, 8]} intensity={15} color="#FF9940" distance={20} decay={2} />
                {/* Warm rim light from side */}
                <pointLight position={[6, 4, 0]} intensity={8} color="#FFB060" distance={15} decay={2} />
                <Environment preset="sunset" />

                <ScrollControls pages={8} damping={0.3}>
                    <BuildingModel />
                    <ProgressivePaymentOverlay purchasePrice={purchasePrice} isLoaded={isLoaded} />
                </ScrollControls>
            </Canvas>

            {/* Mobile Stage Card - Fixed at bottom, outside Canvas */}
            <MobileStageCard purchasePrice={purchasePrice} isLoaded={isLoaded} isVisible={isMobileCardVisible} />

            {/* Scroll indicator - Only show after loaded, hidden on mobile */}
            <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 text-vintage-coin-400/60 animate-bounce transition-opacity duration-500 hidden md:block ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] whitespace-nowrap text-center mr-[-0.3em]">Scroll to Explore</p>
            </div>
        </div>
    );
}