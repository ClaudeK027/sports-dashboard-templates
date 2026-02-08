"use client"

import { GlassMatchCard } from "@/components/glass/glass-match-card"
import { LiquidBackground } from "@/components/glass/liquid-background"
import { ShimmerButton } from "@/components/glass/shimmer-button"
import { TemplateNavigator } from "@/components/template-navigator"
import { GlitchText } from "@/components/ui/glitch-text"
import { Badge } from "@/components/ui/badge"
import { Activity, Zap, Globe, TrendingUp, Clock, Filter } from "lucide-react"
import { motion } from "motion/react"

const liveMatches = [
    { teamA: "Real Madrid", teamB: "Barcelona", scoreA: 2, scoreB: 1, confidence: 88, league: "La Liga", time: "86'", status: "Live" as const },
    { teamA: "Lakers", teamB: "Warriors", scoreA: 104, scoreB: 98, confidence: 92, league: "NBA", time: "Q4 04:20", status: "Live" as const },
    { teamA: "Djokovic", teamB: "Alcaraz", scoreA: 2, scoreB: 3, confidence: 65, league: "Wimbledon", time: "Set 5", status: "Live" as const },
    { teamA: "Man City", teamB: "Liverpool", scoreA: 0, scoreB: 0, confidence: 78, league: "Premier League", time: "12'", status: "Live" as const },
    { teamA: "PSG", teamB: "Bayern", scoreA: 1, scoreB: 1, confidence: 55, league: "UCL", time: "72'", status: "Live" as const },
    { teamA: "Celtics", teamB: "Heat", scoreA: 89, scoreB: 85, confidence: 81, league: "NBA", time: "Q3 02:15", status: "Live" as const },
]

export default function GlassMorphismTemplate() {
    return (
        <div className="min-h-screen text-white relative overflow-x-hidden">
            {/* Liquid Background */}
            <LiquidBackground />

            {/* Navigation */}
            <TemplateNavigator direction="prev" href="/" label="Command Center" />
            <TemplateNavigator direction="next" href="/bento" label="Bento Template" />

            {/* Header */}
            <header className="sticky top-0 z-40 bg-slate-900/60 backdrop-blur-xl border-b border-slate-700/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700/50">
                                <Activity className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold tracking-tight text-slate-100">
                                    <GlitchText text="SPORTS.AI" />
                                </h1>
                                <p className="text-[10px] text-slate-500 font-mono">GLASS INTERFACE // V.2.0</p>
                            </div>
                        </div>

                        {/* Stats - Hidden on mobile */}
                        <div className="hidden md:flex items-center gap-6">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                <span className="text-slate-400 font-mono text-xs">48 LIVE</span>
                            </div>
                            <div className="h-4 w-px bg-slate-700" />
                            <div className="flex items-center gap-2 text-sm">
                                <TrendingUp className="w-3 h-3 text-emerald-500" />
                                <span className="text-slate-400 font-mono text-xs">AVG: 84%</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <ShimmerButton variant="secondary" className="hidden sm:flex text-xs px-4 py-2">
                                <Globe className="w-3 h-3" />
                                <span>Live Feed</span>
                            </ShimmerButton>
                            <ShimmerButton className="text-xs px-4 py-2">
                                <Zap className="w-3 h-3" />
                                <span className="hidden sm:inline">Connect</span>
                            </ShimmerButton>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-emerald-500" />
                        <h2 className="text-lg font-semibold text-slate-100">Matchs en Direct</h2>
                        <Badge className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400 text-[10px]">
                            {liveMatches.length} LIVE
                        </Badge>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-2">
                        {["Tous", "Football", "Tennis", "NBA"].map((filter, i) => (
                            <button
                                key={filter}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${i === 0
                                    ? "bg-slate-700/50 text-slate-100 border border-slate-600/30"
                                    : "text-slate-500 hover:text-slate-300"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cards Grid - Responsive */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {liveMatches.map((match, index) => (
                        <motion.div
                            key={`${match.teamA}-${match.teamB}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <GlassMatchCard {...match} />
                        </motion.div>
                    ))}
                </div>

                {/* Load More */}
                <div className="flex justify-center mt-10">
                    <ShimmerButton variant="secondary">
                        <Filter className="w-4 h-4" />
                        <span>Charger plus de matchs</span>
                    </ShimmerButton>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-slate-800/50 py-6 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-xs text-slate-600 font-mono">
                        SPORTS.AI © 2025 — Glass Morphism Template
                    </p>
                </div>
            </footer>
        </div>
    )
}
