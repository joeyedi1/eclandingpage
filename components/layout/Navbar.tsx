'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAV_LINKS, PROJECT_INFO } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled ? "bg-isabelline-50/90 backdrop-blur-md py-4 border-pine-tree-900/10 shadow-sm" : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-serif font-bold text-pine-tree-900 tracking-tighter">
                    AURA <span className="text-vintage-coin-400">EC</span>
                </Link>

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
                    <Button className="bg-pine-tree-900 text-isabelline-100 hover:bg-pine-tree-800">Book VVIP Preview</Button>
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
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-isabelline-50 border-t border-pine-tree-900/10 absolute w-full top-full left-0 flex flex-col p-6 gap-4 shadow-xl"
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
                    <Button className="w-full bg-pine-tree-900 text-isabelline-100">Book VVIP Preview</Button>
                </motion.div>
            )}
        </motion.nav>
    );
};
