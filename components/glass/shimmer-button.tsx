"use client"

import { motion, type HTMLMotionProps } from "motion/react"

interface ShimmerButtonProps {
    children: React.ReactNode
    variant?: "primary" | "secondary"
    className?: string
    onClick?: () => void
    disabled?: boolean
}

export function ShimmerButton({ children, variant = "primary", className = "", onClick, disabled }: ShimmerButtonProps) {
    const isPrimary = variant === "primary"

    return (
        <motion.button
            className={`relative overflow-hidden px-6 py-3 rounded-xl font-medium text-sm transition-all
        ${isPrimary
                    ? "bg-gradient-to-r from-slate-700 to-slate-600 text-white shadow-lg shadow-slate-900/50 border border-slate-500/20"
                    : "bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 hover:bg-white/10 hover:text-white"
                } ${className}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            disabled={disabled}
        >
            {/* Shimmer Effect */}
            <motion.div
                className="absolute inset-0 -translate-x-full"
                animate={{
                    translateX: ["-100%", "200%"],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                }}
            >
                <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            </motion.div>

            {/* Button Content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </motion.button>
    )
}
