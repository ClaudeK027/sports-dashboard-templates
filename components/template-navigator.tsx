"use client"

import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import { ChevronRight, ChevronLeft } from "lucide-react"

interface TemplateNavigatorProps {
    direction: "next" | "prev"
    href: string
    label?: string
}

export function TemplateNavigator({ direction, href, label }: TemplateNavigatorProps) {
    const router = useRouter()
    const isNext = direction === "next"

    const handleNavigation = () => {
        // Use View Transitions API if available
        if (typeof document !== "undefined" && "startViewTransition" in document) {
            (document as any).startViewTransition(() => {
                router.push(href)
            })
        } else {
            router.push(href)
        }
    }

    return (
        <>
            {/* Permanent Edge Indicator */}
            <div
                className={`fixed ${isNext ? "right-0" : "left-0"} top-0 h-full w-1 z-40 pointer-events-none`}
            >
                <div className={`absolute top-1/2 -translate-y-1/2 h-24 w-full bg-gradient-to-b from-transparent via-[hsl(var(--primary))]/30 to-transparent`} />
            </div>

            {/* Clickable Navigation Button */}
            <motion.button
                onClick={handleNavigation}
                className={`fixed ${isNext ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 z-50 cursor-pointer`}
                initial="idle"
                whileHover="hover"
                aria-label={label || (isNext ? "Next template" : "Previous template")}
            >
                {/* Invisible Hover Zone */}
                <div className="absolute -inset-4 w-20" />

                {/* Arrow Container */}
                <motion.div
                    className={`flex items-center px-2 py-8 bg-zinc-900/90 backdrop-blur-md border border-zinc-700/50 ${isNext ? "rounded-l-lg border-r-0 pr-1" : "rounded-r-lg border-l-0 pl-1"
                        }`}
                    variants={{
                        idle: {
                            x: isNext ? 30 : -30,
                            opacity: 0.6,
                        },
                        hover: {
                            x: 0,
                            opacity: 1,
                        }
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                    {isNext ? (
                        <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-[hsl(var(--primary))]" />
                    ) : (
                        <ChevronLeft className="w-5 h-5 text-zinc-400 group-hover:text-[hsl(var(--primary))]" />
                    )}
                </motion.div>

                {/* Label on Hover */}
                <motion.div
                    className={`absolute top-full mt-2 ${isNext ? "right-0" : "left-0"} whitespace-nowrap`}
                    variants={{
                        idle: { opacity: 0, y: -5 },
                        hover: { opacity: 1, y: 0 }
                    }}
                >
                    <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900/90 px-2 py-1 rounded border border-zinc-800">
                        {label}
                    </span>
                </motion.div>

                {/* Glow Effect on Hover */}
                <motion.div
                    className={`absolute ${isNext ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 w-1 h-32 bg-[hsl(var(--primary))] blur-md pointer-events-none`}
                    variants={{
                        idle: { opacity: 0 },
                        hover: { opacity: 0.7 }
                    }}
                />
            </motion.button>
        </>
    )
}
