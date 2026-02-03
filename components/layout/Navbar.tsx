'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    // Listen for page loaded event from ScrollytellingHero
    useEffect(() => {
        const handlePageLoaded = () => setIsPageLoaded(true);
        const handlePageReset = () => {
            // Delay hiding to allow scroll animation to complete
            setTimeout(() => setIsPageLoaded(false), 100);
        };
        
        window.addEventListener('pageFullyLoaded', handlePageLoaded);
        window.addEventListener('resetScrollytelling', handlePageReset);
        
        return () => {
            window.removeEventListener('pageFullyLoaded', handlePageLoaded);
            window.removeEventListener('resetScrollytelling', handlePageReset);
        };
    }, []);

    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        
        // First scroll window to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // After a short delay, dispatch event to reset the scrollytelling
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent('resetScrollytelling'));
        }, 300);
    };

    const scrollToRegister = (e: React.MouseEvent) => {
        e.preventDefault();
        setMobileMenuOpen(false); // Close mobile menu if open
        
        const registerSection = document.getElementById('register');
        if (registerSection) {
            registerSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
                opacity: isPageLoaded ? 1 : 0, 
                y: isPageLoaded ? 0 : -20 
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled ? "bg-isabelline-50/90 backdrop-blur-md py-4 border-pine-tree-900/10 shadow-sm" : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo - Smooth scroll to top */}
                <a 
                    href="/"
                    onClick={scrollToTop}
                    className="cursor-pointer"
                >
                    <Image
                        src="/river-modern-logo.png"
                        alt="River Modern"
                        width={140}
                        height={50}
                        className="h-8 md:h-10 w-auto"
                        priority
                    />
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-pine-tree-800 hover:text-vintage-coin-400 transition-colors uppercase tracking-widest"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button 
                        onClick={scrollToRegister}
                        className="bg-pine-tree-900 text-isabelline-100 hover:bg-pine-tree-800"
                    >
                        Book VVIP Preview
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-pine-tree-900"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-isabelline-50 border-t border-pine-tree-900/10 absolute w-full top-full left-0 flex flex-col p-6 gap-4 shadow-xl overflow-hidden z-[60]"
                    >
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-lg font-serif text-pine-tree-900 hover:text-vintage-coin-400"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button 
                            onClick={scrollToRegister}
                            className="w-full bg-pine-tree-900 text-isabelline-100"
                        >
                            Book VVIP Preview
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};