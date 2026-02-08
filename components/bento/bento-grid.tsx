"use client"

import { motion } from "motion/react"
import { ReactNode } from "react"

interface BentoGridProps {
    children: ReactNode
    className?: string
}

export function BentoGrid({ children, className = "" }: BentoGridProps) {
    return (
        <motion.div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[140px] ${className}`}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            {children}
        </motion.div>
    )
}

interface BentoItemProps {
    children: ReactNode
    className?: string
    colSpan?: number
    rowSpan?: number
    accent?: "amber" | "sky" | "rose" | "lime" | "orange" | "default"
}

const accentColors = {
    amber: "hover:border-amber-500/40",
    sky: "hover:border-sky-500/40",
    rose: "hover:border-rose-500/40",
    lime: "hover:border-lime-500/40",
    orange: "hover:border-orange-500/40",
    default: "hover:border-stone-600",
}

export function BentoItem({
    children,
    className = "",
    colSpan = 1,
    rowSpan = 1,
    accent = "default"
}: BentoItemProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            transition={{
                layout: { type: "spring", stiffness: 300, damping: 30 },
                y: { duration: 0.2 }
            }}
            className={`
        bg-stone-900 border border-stone-800 
        rounded-lg overflow-hidden cursor-pointer
        ${accentColors[accent]}
        transition-colors duration-200
        shadow-sm hover:shadow-md hover:shadow-stone-950/50
        ${className}
      `}
            style={{
                gridColumn: `span ${colSpan}`,
                gridRow: `span ${rowSpan}`,
            }}
        >
            {children}
        </motion.div>
    )
}
