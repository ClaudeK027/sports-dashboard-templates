"use client"

import { Badge } from "@/components/ui/badge"
import { RippleIndicator } from "@/components/bento/ripple-indicator"
import { RollingNumber } from "@/components/ui/rolling-number"
import { TrendingUp, ArrowRight } from "lucide-react"
import { motion } from "motion/react"

interface BentoMatchCardProps {
    teamA: string
    teamB: string
    scoreA: number
    scoreB: number
    confidence: number
    league: string
    time: string
    status: "Live" | "Scheduled" | "Finished"
    sport?: "Football" | "Tennis" | "Basketball"
    size?: "small" | "large"
}

const sportColors = {
    Football: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400" },
    Tennis: { bg: "bg-lime-500/10", border: "border-lime-500/20", text: "text-lime-400" },
    Basketball: { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400" },
}

export function BentoMatchCard({
    teamA, teamB, scoreA, scoreB, confidence, league, time, status, sport = "Football", size = "small"
}: BentoMatchCardProps) {
    const isLive = status === "Live"
    const isLarge = size === "large"
    const colors = sportColors[sport]

    return (
        <div className={`h-full flex flex-col justify-between ${isLarge ? "p-3" : "p-2"}`}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <Badge className={`${colors.bg} ${colors.border} ${colors.text} text-[8px] font-mono uppercase px-1.5 py-0 h-4 rounded`}>
                    {league}
                </Badge>
                <div className="flex items-center gap-1">
                    {isLive && <RippleIndicator color="red" />}
                    <span className="text-[9px] text-stone-500 font-mono">{time}</span>
                </div>
            </div>

            {/* Match Info - Flex-1 to fill available space */}
            <div className="flex-1 flex items-center justify-between min-h-0">
                <div className="min-w-0">
                    <p className={`text-stone-100 font-semibold truncate ${isLarge ? "text-sm" : "text-[11px]"}`}>
                        {teamA}
                    </p>
                    <div className={`font-bold text-white font-mono leading-tight ${isLarge ? "text-2xl" : "text-lg"}`}>
                        <RollingNumber value={scoreA} />
                    </div>
                </div>

                <div className="text-stone-600 text-[10px] font-light px-1.5 shrink-0">—</div>

                <div className="min-w-0 text-right">
                    <p className={`text-stone-100 font-semibold truncate ${isLarge ? "text-sm" : "text-[11px]"}`}>
                        {teamB}
                    </p>
                    <div className={`font-bold text-white font-mono leading-tight ${isLarge ? "text-2xl" : "text-lg"}`}>
                        <RollingNumber value={scoreB} />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-1 border-t border-stone-800">
                <div className="flex items-center gap-1 text-[9px] text-lime-400">
                    <TrendingUp className="w-2.5 h-2.5" />
                    <span className="font-mono font-medium">{confidence}%</span>
                </div>
                <motion.button
                    className="text-[8px] text-stone-500 hover:text-stone-300 flex items-center gap-0.5 font-mono uppercase"
                    whileHover={{ x: 1 }}
                >
                    Détails
                    <ArrowRight className="w-2.5 h-2.5" />
                </motion.button>
            </div>
        </div>
    )
}
