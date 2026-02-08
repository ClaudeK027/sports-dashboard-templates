"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, LayoutGroup } from "motion/react"
import { BentoItem } from "@/components/bento/bento-grid"
import { BentoMatchCard } from "@/components/bento/bento-match-card"
import { RippleIndicator } from "@/components/bento/ripple-indicator"
import { SkeletonCard } from "@/components/bento/skeleton-wave"
import { GridBackground } from "@/components/bento/grid-background"
import { NavDock } from "@/components/bento/nav-dock"
import { LiveFeedFloating } from "@/components/bento/live-feed"
import { TemplateNavigator } from "@/components/template-navigator"
import { Badge } from "@/components/ui/badge"
import { RollingNumber } from "@/components/ui/rolling-number"
import { TrendingUp, BarChart3, Zap, Trophy, Target, Layers, Brain, Calendar, Clock } from "lucide-react"

const allMatches = [
    { id: 1, teamA: "Real Madrid", teamB: "Barcelona", scoreA: 2, scoreB: 1, confidence: 88, league: "La Liga", time: "86'", status: "Live" as const, sport: "Football" as const },
    { id: 2, teamA: "Lakers", teamB: "Warriors", scoreA: 104, scoreB: 98, confidence: 92, league: "NBA", time: "Q4 04:20", status: "Live" as const, sport: "Basketball" as const },
    { id: 3, teamA: "Djokovic", teamB: "Alcaraz", scoreA: 2, scoreB: 3, confidence: 65, league: "Wimbledon", time: "Set 5", status: "Live" as const, sport: "Tennis" as const },
    { id: 4, teamA: "Man City", teamB: "Liverpool", scoreA: 0, scoreB: 0, confidence: 78, league: "Premier League", time: "12'", status: "Live" as const, sport: "Football" as const },
    { id: 5, teamA: "PSG", teamB: "Bayern", scoreA: 1, scoreB: 1, confidence: 55, league: "UCL", time: "72'", status: "Live" as const, sport: "Football" as const },
    { id: 6, teamA: "Sinner", teamB: "Medvedev", scoreA: 1, scoreB: 0, confidence: 81, league: "ATP Finals", time: "Set 2", status: "Live" as const, sport: "Tennis" as const },
]

const upcomingMatches = [
    { id: 7, teamA: "Arsenal", teamB: "Chelsea", time: "20:00", league: "Premier League", sport: "Football" },
    { id: 8, teamA: "Nadal", teamB: "Rune", time: "21:30", league: "ATP 500", sport: "Tennis" },
    { id: 9, teamA: "Celtics", teamB: "Bucks", time: "02:00", league: "NBA", sport: "Basketball" },
    { id: 10, teamA: "Juventus", teamB: "Milan", time: "20:45", league: "Serie A", sport: "Football" },
]

const filters = [
    { name: "Tous", color: "bg-stone-800 text-stone-300 border-stone-700", activeColor: "bg-stone-100 text-stone-900" },
    { name: "Football", color: "bg-amber-500/10 text-amber-400 border-amber-500/20", activeColor: "bg-amber-500 text-stone-900" },
    { name: "Tennis", color: "bg-lime-500/10 text-lime-400 border-lime-500/20", activeColor: "bg-lime-500 text-stone-900" },
    { name: "Basketball", color: "bg-orange-500/10 text-orange-400 border-orange-500/20", activeColor: "bg-orange-500 text-stone-900" },
]

export default function BentoFocusTemplate() {
    const [activeFilter, setActiveFilter] = useState("Tous")
    const [isLoading, setIsLoading] = useState(true)
    const [matches, setMatches] = useState(allMatches)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        setIsLoading(true)
        const timer = setTimeout(() => {
            if (activeFilter === "Tous") {
                setMatches(allMatches)
            } else {
                setMatches(allMatches.filter(m => m.sport === activeFilter))
            }
            setIsLoading(false)
        }, 250)
        return () => clearTimeout(timer)
    }, [activeFilter])

    const getAccent = (sport: string) => {
        switch (sport) {
            case "Football": return "amber" as const
            case "Tennis": return "lime" as const
            case "Basketball": return "orange" as const
            default: return "default" as const
        }
    }

    const getSportColor = (sport: string) => {
        switch (sport) {
            case "Football": return "text-amber-400"
            case "Tennis": return "text-lime-400"
            case "Basketball": return "text-orange-400"
            default: return "text-stone-400"
        }
    }

    return (
        <div className="min-h-screen flex flex-col text-white">
            <GridBackground />
            <NavDock />
            <TemplateNavigator direction="prev" href="/glass" label="Glass Template" />

            {/* Header - with sidebar margins */}
            <header className="sticky top-0 z-40 bg-stone-950/80 backdrop-blur-md border-b border-stone-800 ml-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-stone-900 p-2 rounded-lg border border-stone-800">
                                <Layers className="w-5 h-5 text-amber-400" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold tracking-tight text-stone-100">SPORTS.AI</h1>
                                <p className="text-[10px] text-stone-500 font-mono uppercase tracking-widest">Bento Focus</p>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-2">
                            {filters.map((filter) => (
                                <motion.button
                                    key={filter.name}
                                    onClick={() => setActiveFilter(filter.name)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${activeFilter === filter.name ? filter.activeColor : filter.color
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {filter.name}
                                </motion.button>
                            ))}
                        </div>

                        <Badge className="bg-lime-500/10 border-lime-500/20 text-lime-400 text-[10px] rounded-lg px-2 py-1">
                            <RippleIndicator color="green" />
                            <span className="ml-2 font-mono">{matches.length} LIVE</span>
                        </Badge>
                    </div>
                </div>
            </header>

            {/* Main Content - Flex-1 to fill viewport */}
            <main className="flex-1 flex flex-col justify-center ml-12 px-8 py-6 relative">
                <div className="max-w-5xl mx-auto w-full">
                    <LayoutGroup>
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <motion.div
                                    key="skeleton"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[100px]"
                                >
                                    {Array.from({ length: 12 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.03 }}
                                            style={{
                                                gridColumn: i === 0 ? "span 2" : i === 7 ? "span 2" : "span 1",
                                                gridRow: i === 0 ? "span 2" : i === 7 ? "span 2" : "span 1"
                                            }}
                                        >
                                            <SkeletonCard variant="stat" className="h-full" />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[100px]"
                                >
                                    {/* ROW 1-2: Hero Match + AI Insights + Secondary Match */}
                                    {matches[0] && (
                                        <BentoItem colSpan={2} rowSpan={2} accent={getAccent(matches[0].sport)}>
                                            <BentoMatchCard {...matches[0]} size="large" />
                                        </BentoItem>
                                    )}

                                    <BentoItem colSpan={2} rowSpan={1} accent="sky">
                                        <div className="h-full p-3 flex items-center gap-4">
                                            <div className="flex items-center gap-2 flex-1">
                                                <TrendingUp className="w-4 h-4 text-lime-400" />
                                                <div>
                                                    <span className="text-[9px] text-stone-500 font-mono uppercase">Win</span>
                                                    <div className="text-xl font-bold text-white font-mono">84%</div>
                                                </div>
                                            </div>
                                            <div className="w-px h-8 bg-stone-800" />
                                            <div className="flex items-center gap-2 flex-1">
                                                <Target className="w-4 h-4 text-sky-400" />
                                                <div>
                                                    <span className="text-[9px] text-stone-500 font-mono uppercase">Analyses</span>
                                                    <div className="text-xl font-bold text-white font-mono">127</div>
                                                </div>
                                            </div>
                                            <div className="w-px h-8 bg-stone-800" />
                                            <div className="flex items-center gap-2 flex-1">
                                                <Brain className="w-4 h-4 text-amber-400" />
                                                <div>
                                                    <span className="text-[9px] text-stone-500 font-mono uppercase">Précision</span>
                                                    <div className="text-xl font-bold text-white font-mono">91%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </BentoItem>

                                    {matches[1] && (
                                        <BentoItem colSpan={2} rowSpan={1} accent={getAccent(matches[1].sport)}>
                                            <BentoMatchCard {...matches[1]} size="small" />
                                        </BentoItem>
                                    )}

                                    {/* ROW 3-4: 4 matches + Chart */}
                                    {matches.slice(2, 4).map((match) => (
                                        <BentoItem key={match.id} colSpan={1} rowSpan={1} accent={getAccent(match.sport)}>
                                            <BentoMatchCard {...match} size="small" />
                                        </BentoItem>
                                    ))}

                                    <BentoItem colSpan={2} rowSpan={2} accent="amber">
                                        <div className="h-full p-3 flex flex-col">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <BarChart3 className="w-4 h-4 text-amber-400" />
                                                    <span className="text-[10px] text-stone-400 font-mono uppercase">Performance</span>
                                                </div>
                                                <span className="text-[9px] text-stone-500 font-mono">30j</span>
                                            </div>
                                            <div className="flex-1 flex items-end gap-0.5">
                                                {[65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 50, 88, 72, 68, 82, 91, 65, 78, 85, 92, 70, 88, 76, 94].map((value, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="flex-1 bg-gradient-to-t from-amber-500/70 to-amber-400/20 rounded-sm"
                                                        initial={{ height: 0 }}
                                                        animate={{ height: `${value}%` }}
                                                        transition={{ delay: i * 0.02, duration: 0.3 }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </BentoItem>

                                    {matches.slice(4, 6).map((match) => (
                                        <BentoItem key={match.id} colSpan={1} rowSpan={1} accent={getAccent(match.sport)}>
                                            <BentoMatchCard {...match} size="small" />
                                        </BentoItem>
                                    ))}

                                    {/* ROW 5: Upcoming Matches */}
                                    <BentoItem colSpan={4} rowSpan={1} accent="default">
                                        <div className="h-full p-4 flex flex-col justify-center">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Calendar className="w-4 h-4 text-stone-400" />
                                                <span className="text-[10px] text-stone-400 font-mono uppercase tracking-wider">À venir</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                {upcomingMatches.slice(0, 3).map((match) => (
                                                    <div key={match.id} className="flex items-center justify-between bg-stone-800/40 rounded-lg px-3 py-2">
                                                        <div className="flex items-center gap-2">
                                                            <Clock className={`w-3.5 h-3.5 ${getSportColor(match.sport)}`} />
                                                            <span className="text-[11px] text-stone-200 font-medium">
                                                                {match.teamA} vs {match.teamB}
                                                            </span>
                                                        </div>
                                                        <span className="text-[10px] text-stone-500 font-mono">{match.time}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </BentoItem>

                                    {/* ROW 6: Footer Stats */}
                                    <BentoItem colSpan={2} rowSpan={1} accent="lime">
                                        <div className="h-full p-3 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Trophy className="w-4 h-4 text-amber-400" />
                                                <div>
                                                    <span className="text-[9px] text-stone-500 font-mono uppercase">Gains</span>
                                                    <div className="text-lg font-bold text-lime-400 font-mono">+€2,450</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[9px] text-stone-500 font-mono uppercase">ROI</span>
                                                <div className="text-lg font-bold text-white font-mono">+18.5%</div>
                                            </div>
                                        </div>
                                    </BentoItem>

                                    <BentoItem colSpan={2} rowSpan={1}>
                                        <div className="h-full p-3 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Zap className="w-4 h-4 text-amber-400" />
                                                <div>
                                                    <span className="text-[9px] text-stone-500 font-mono uppercase">IA</span>
                                                    <div className="flex items-center gap-1.5">
                                                        <RippleIndicator color="green" />
                                                        <span className="text-sm font-medium text-stone-100">Active</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[9px] text-stone-500 font-mono uppercase">Latence</span>
                                                <div className="text-lg font-bold text-white font-mono">12ms</div>
                                            </div>
                                        </div>
                                    </BentoItem>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </LayoutGroup>
                </div>

                {/* Floating Live Feed */}
                <div className="fixed bottom-6 right-6 z-30 w-48">
                    <LiveFeedFloating />
                </div>
            </main>

            {/* Minimal Footer */}
            <footer className="py-2">
                <p className="text-center text-[9px] text-stone-700 font-mono uppercase tracking-widest">
                    Sports.AI — Bento Focus
                </p>
            </footer>
        </div>
    )
}
