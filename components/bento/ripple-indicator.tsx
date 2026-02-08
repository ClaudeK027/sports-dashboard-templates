"use client"

import { motion } from "motion/react"

interface RippleIndicatorProps {
    isLive?: boolean
    color?: "red" | "green" | "blue" | "orange"
}

const colorMap = {
    red: { bg: "bg-red-500", ring: "bg-red-400" },
    green: { bg: "bg-emerald-500", ring: "bg-emerald-400" },
    blue: { bg: "bg-blue-500", ring: "bg-blue-400" },
    orange: { bg: "bg-orange-500", ring: "bg-orange-400" },
}

export function RippleIndicator({ isLive = true, color = "red" }: RippleIndicatorProps) {
    const colors = colorMap[color]

    if (!isLive) return null

    return (
        <span className="relative flex h-3 w-3">
            {/* Ripple rings */}
            <motion.span
                className={`absolute inline-flex h-full w-full rounded-full ${colors.ring} opacity-75`}
                animate={{ scale: [1, 2, 2], opacity: [0.7, 0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
                className={`absolute inline-flex h-full w-full rounded-full ${colors.ring} opacity-75`}
                animate={{ scale: [1, 2, 2], opacity: [0.7, 0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            />
            {/* Core dot */}
            <motion.span
                className={`relative inline-flex rounded-full h-3 w-3 ${colors.bg}`}
                animate={{ scale: [1, 0.9, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
            />
        </span>
    )
}
