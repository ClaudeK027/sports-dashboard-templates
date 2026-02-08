"use client"

import { motion } from "motion/react"

export function LiquidBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Base Gradient - Dark slate */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

            {/* Animated Orbs - Subtle teal/slate tones */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-slate-700/10 rounded-full blur-[100px]"
                animate={{
                    x: [0, 100, 50, 0],
                    y: [0, 50, 100, 0],
                    scale: [1, 1.1, 0.95, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-900/10 rounded-full blur-[100px]"
                animate={{
                    x: [0, -80, -30, 0],
                    y: [0, 80, 30, 0],
                    scale: [1, 0.9, 1.1, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-800/10 rounded-full blur-[120px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Smaller accent orbs */}
            <motion.div
                className="absolute top-[10%] right-[20%] w-[200px] h-[200px] bg-emerald-950/10 rounded-full blur-[80px]"
                animate={{
                    y: [0, 30, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="absolute bottom-[15%] left-[10%] w-[250px] h-[250px] bg-slate-600/10 rounded-full blur-[80px]"
                animate={{
                    x: [0, 40, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Noise/Grain Overlay */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    )
}
