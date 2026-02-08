"use client"

import { CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { GlitchText } from "@/components/ui/glitch-text"
import { RollingNumber } from "@/components/ui/rolling-number"
import { GradientBorder } from "@/components/ui/gradient-border"
import { RadarChart } from "@/components/ui/radar-chart"
import { ArrowRight, TrendingUp, Activity } from "lucide-react"

interface MatchCardProps {
    teamA: string
    teamB: string
    scoreA: number
    scoreB: number
    confidence: number
    league: string
    time: string
    status: "Live" | "Scheduled" | "Finished"
}

export function MatchCard({ teamA, teamB, scoreA, scoreB, confidence, league, time, status }: MatchCardProps) {
    return (
        <GradientBorder className="h-full p-5">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="text-[10px] font-mono text-zinc-400 border-zinc-700 bg-zinc-900/50">
                        {league}
                    </Badge>
                    <div className="flex items-center space-x-2">
                        {status === "Live" && (
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                        )}
                        <span className="text-[10px] text-zinc-500 font-mono uppercase">{time}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-1.5 text-[10px] text-zinc-400 font-mono border border-zinc-800 px-2 py-1 rounded-md bg-zinc-900/50">
                    <Activity className="w-3 h-3 text-[hsl(var(--primary))]" />
                    <span>CONF: <span className="text-[hsl(var(--primary))] font-bold">{confidence}%</span></span>
                </div>
            </div>

            {/* Scores Section - More Space */}
            <div className="flex justify-between items-center py-4">
                <div className="flex flex-col">
                    <GlitchText text={teamA} className="font-bold text-base text-zinc-100" />
                    <div className="text-4xl font-mono font-black text-white mt-1">
                        <RollingNumber value={scoreA} />
                    </div>
                </div>
                <div className="text-zinc-700 font-mono text-lg px-4">VS</div>
                <div className="flex flex-col items-end">
                    <GlitchText text={teamB} className="font-bold text-base text-zinc-100 text-right" />
                    <div className="text-4xl font-mono font-black text-white mt-1">
                        <RollingNumber value={scoreB} />
                    </div>
                </div>
            </div>

            <Separator className="bg-zinc-800/50 my-4" />

            {/* Analysis Section - Vertical Stack */}
            <div className="space-y-4">
                {/* AI Prediction */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <span className="text-[10px] text-zinc-500 font-mono uppercase">Prédiction IA</span>
                        <div className="flex items-center space-x-2 text-sm text-[hsl(var(--primary))]">
                            <TrendingUp className="w-4 h-4" />
                            <GlitchText text="Victoire Domicile" className="font-semibold" />
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] text-zinc-500 font-mono uppercase">xG</span>
                        <div className="text-sm font-mono text-white">2.4 vs 0.8</div>
                    </div>
                </div>

                {/* Radar Chart - Full Width, Larger */}
                <div className="h-40 w-full bg-zinc-900/30 rounded-lg border border-zinc-800/30 p-2">
                    <RadarChart className="w-full h-full" />
                </div>
            </div>

            {/* Footer */}
            <div className="mt-5">
                <Button className="w-full bg-zinc-800 text-zinc-100 hover:bg-zinc-700 font-mono text-xs uppercase tracking-wider group border border-zinc-700">
                    <span>Accéder au Terminal</span>
                    <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </GradientBorder>
    )
}
