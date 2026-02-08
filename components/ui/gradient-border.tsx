"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"

interface GradientBorderProps extends React.HTMLAttributes<HTMLDivElement> {
    containerClassName?: string
    isActive?: boolean
}

export function GradientBorder({
    children,
    className,
    containerClassName,
    isActive = false,
    ...props
}: GradientBorderProps) {
    return (
        <div className={cn("relative group", containerClassName)}>
            {/* Rotating gradient border */}
            <motion.div
                className="absolute -inset-[1px] rounded-xl overflow-hidden"
                initial={{ opacity: 0.3 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,hsl(var(--primary)),transparent,hsl(var(--destructive)),transparent)]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    style={{
                        width: "200%",
                        height: "200%",
                        left: "-50%",
                        top: "-50%"
                    }}
                />
            </motion.div>

            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(var(--primary))] via-transparent to-[hsl(var(--destructive))] rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

            {/* Content */}
            <div className={cn("relative bg-zinc-950 rounded-xl border border-zinc-800/50", className)} {...props}>
                {children}
            </div>
        </div>
    )
}
