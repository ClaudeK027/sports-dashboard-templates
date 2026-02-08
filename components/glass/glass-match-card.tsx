"use client"

import { TiltCard } from "@/components/glass/tilt-card"
import { ShimmerButton } from "@/components/glass/shimmer-button"
import { Badge } from "@/components/ui/badge"
import { GlitchText } from "@/components/ui/glitch-text"
import { RollingNumber } from "@/components/ui/rolling-number"
import { ArrowRight, TrendingUp, Activity } from "lucide-react"

interface GlassMatchCardProps {
    teamA: string
    teamB: string
    scoreA: number
    scoreB: number
    confidence: number
    league: string
    time: string
    status: "Live" | "Scheduled" | "Finished"
}

export function GlassMatchCard({ teamA, teamB, scoreA, scoreB, confidence, league, time, status }: GlassMatchCardProps) {
    const isLive = status === "Live"

    return (
        <TiltCard className="w-full">
            <div className="p-6 space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Badge className="bg-slate-700/50 border-slate-600/30 text-slate-300 text-[10px] font-mono">
                            {league}
                        </Badge>
                        {isLive && (
                            <div className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                <span className="text-[10px] text-emerald-400 font-mono uppercase">{time}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono bg-slate-800/50 px-2 py-1 rounded-full border border-slate-700/30">
                        <Activity className="w-3 h-3 text-emerald-500" />
                        <span>AI: <span className="text-white font-semibold">{confidence}%</span></span>
                    </div>
                </div>

                {/* Teams & Scores */}
                <div className="flex justify-between items-center py-4">
                    <div className="space-y-1">
                        <GlitchText text={teamA} className="text-slate-100 font-semibold text-lg" />
                        <div className="text-4xl font-bold text-white font-mono">
                            <RollingNumber value={scoreA} />
                        </div>
                    </div>

                    <div className="text-slate-600 text-lg font-light">vs</div>

                    <div className="space-y-1 text-right">
                        <GlitchText text={teamB} className="text-slate-100 font-semibold text-lg" />
                        <div className="text-4xl font-bold text-white font-mono">
                            <RollingNumber value={scoreB} />
                        </div>
                    </div>
                </div>

                {/* Prediction */}
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/20">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-[10px] text-slate-500 font-mono uppercase">Prédiction IA</span>
                            <div className="flex items-center gap-2 text-sm text-emerald-400">
                                <TrendingUp className="w-4 h-4" />
                                <span className="font-medium">Victoire {teamA}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] text-slate-500 font-mono uppercase">xG</span>
                            <div className="text-sm text-slate-200 font-mono">2.1 vs 0.9</div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <ShimmerButton className="w-full">
                    <span>Voir l'analyse</span>
                    <ArrowRight className="w-4 h-4" />
                </ShimmerButton>
            </div>
        </TiltCard>
    )
}
