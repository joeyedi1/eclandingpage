'use client';
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    children: React.ReactNode;
}

export const Button = ({ className, variant = 'primary', children, ...props }: ButtonProps) => {
    return (
        <button
            className={cn(
                "relative rounded-full px-8 py-3 font-medium transition-all duration-300 transform active:scale-95 text-sm uppercase tracking-wider overflow-hidden group",
                variant === 'primary' && "bg-white text-navy-900 hover:bg-gray-100",
                variant === 'outline' && "bg-transparent text-white border border-white/20 hover:bg-white/10",
                className
            )}
            {...props}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>

            {/* Border Beam Effect on Hover */}
            <span className="absolute inset-0 rounded-full border border-white/0 group-hover:border-white/50 transition-colors duration-500" />

            {variant === 'primary' && (
                <span className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            )}
        </button>
    )
}
