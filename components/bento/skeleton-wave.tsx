"use client"

import { motion } from "motion/react"

interface SkeletonWaveProps {
    className?: string
    lines?: number
    showIcon?: boolean
}

export function SkeletonWave({ className = "", lines = 3, showIcon = true }: SkeletonWaveProps) {
    return (
        <div className={`space-y-3 p-4 ${className}`}>
            {showIcon && (
                <motion.div
                    className="w-10 h-10 bg-stone-800 rounded-lg"
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                />
            )}
            {Array.from({ length: lines }).map((_, i) => (
                <motion.div
                    key={i}
                    className={`h-3 bg-stone-800 rounded ${i === lines - 1 ? "w-1/2" : "w-full"}`}
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                />
            ))}
        </div>
    )
}

interface SkeletonCardProps {
    className?: string
    variant?: "match" | "stat" | "chart"
}

export function SkeletonCard({ className = "", variant = "match" }: SkeletonCardProps) {
    return (
        <div className={`bg-stone-900 border border-stone-800 rounded-lg overflow-hidden ${className}`}>
            {variant === "match" && (
                <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <motion.div
                            className="h-4 w-16 bg-stone-800 rounded"
                            animate={{ opacity: [0.4, 0.7, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.div
                            className="h-4 w-12 bg-stone-800 rounded"
                            animate={{ opacity: [0.4, 0.7, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                        />
                    </div>
                    <div className="flex justify-between items-center py-4">
                        <div className="space-y-2">
                            <motion.div
                                className="h-5 w-24 bg-stone-800 rounded"
                                animate={{ opacity: [0.4, 0.7, 0.4] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                                className="h-8 w-12 bg-stone-800 rounded"
                                animate={{ opacity: [0.4, 0.7, 0.4] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                            />
                        </div>
                        <motion.div
                            className="h-4 w-8 bg-stone-800 rounded"
                            animate={{ opacity: [0.4, 0.7, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                        />
                        <div className="space-y-2 text-right">
                            <motion.div
                                className="h-5 w-24 bg-stone-800 rounded ml-auto"
                                animate={{ opacity: [0.4, 0.7, 0.4] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.div
                                className="h-8 w-12 bg-stone-800 rounded ml-auto"
                                animate={{ opacity: [0.4, 0.7, 0.4] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {variant === "stat" && (
                <div className="p-4 space-y-3">
                    <motion.div
                        className="h-3 w-16 bg-stone-800 rounded"
                        animate={{ opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                        className="h-8 w-20 bg-stone-800 rounded"
                        animate={{ opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    />
                </div>
            )}

            {variant === "chart" && (
                <div className="p-4 h-full flex items-end gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="flex-1 bg-stone-800 rounded-t"
                            style={{ height: `${30 + Math.random() * 50}%` }}
                            animate={{ opacity: [0.4, 0.7, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
