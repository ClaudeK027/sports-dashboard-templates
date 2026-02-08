"use client"

import { MatchCard } from "@/components/match-card"
import { GlitchText } from "@/components/ui/glitch-text"
import { TemplateNavigator } from "@/components/template-navigator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, BarChart3, Globe, Zap, TrendingUp, Clock, Gamepad2 } from "lucide-react"
import { motion } from "motion/react"

const liveMatches = [
  { teamA: "Real Madrid", teamB: "Barcelona", scoreA: 2, scoreB: 1, confidence: 88, league: "La Liga", time: "86'", status: "Live" as const },
  { teamA: "Lakers", teamB: "Warriors", scoreA: 104, scoreB: 98, confidence: 92, league: "NBA", time: "Q4 04:20", status: "Live" as const },
  { teamA: "Djokovic", teamB: "Alcaraz", scoreA: 2, scoreB: 3, confidence: 65, league: "Wimbledon", time: "Set 5", status: "Live" as const },
  { teamA: "Man City", teamB: "Liverpool", scoreA: 0, scoreB: 0, confidence: 78, league: "Premier League", time: "12'", status: "Live" as const },
]

const sportsFilters = [
  { name: "Football", icon: Activity, count: 24 },
  { name: "Tennis", icon: Gamepad2, count: 8 },
  { name: "Basketball", icon: BarChart3, count: 12 },
]

export default function CommandCenterPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-foreground font-sans">
      {/* Navigation Arrow to Next Template */}
      <TemplateNavigator direction="next" href="/glass" label="Glass Template" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-zinc-900 p-2 rounded-lg border border-zinc-800">
              <Activity className="w-5 h-5 text-[hsl(var(--primary))]" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tighter text-white">
                <GlitchText text="SPORTS.AI / TERMINAL" />
              </h1>
              <span className="text-[10px] text-zinc-500 font-mono">SYSTEM_STATUS: ONLINE // V.2.0.4</span>
            </div>
          </div>

          {/* Header Stats */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex items-center space-x-1 text-zinc-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="font-mono">44 LIVE</span>
              </div>
              <div className="h-4 w-px bg-zinc-800" />
              <div className="flex items-center space-x-1 text-zinc-400">
                <TrendingUp className="w-3 h-3 text-[hsl(var(--primary))]" />
                <span className="font-mono">AVG CONF: 82%</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" size="sm" className="border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 text-xs">
              <Globe className="w-3 h-3 mr-2" />
              LIVE FEED
            </Button>
            <Button size="sm" className="bg-[hsl(var(--primary))] text-zinc-950 hover:bg-green-400 text-xs font-semibold">
              <Zap className="w-3 h-3 mr-2" />
              CONNECT
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Slim & Sticky */}
        <aside className="hidden lg:block w-56 shrink-0 border-r border-zinc-800/50 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Sports Filter */}
            <div>
              <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">MARCHÉS</h3>
              <div className="space-y-1">
                {sportsFilters.map((sport) => (
                  <Button
                    key={sport.name}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between text-zinc-400 hover:text-white hover:bg-zinc-800/50 text-xs h-9"
                  >
                    <span className="flex items-center">
                      <sport.icon className="w-3 h-3 mr-2" />
                      {sport.name}
                    </span>
                    <Badge variant="secondary" className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5">
                      {sport.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Live Activity Feed */}
            <div>
              <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">ACTIVITÉ LIVE</h3>
              <div className="space-y-2">
                {[
                  { text: "Chelsea vs Arsenal: Goal (1-0)", type: "event" },
                  { text: "New Bet Alert: Man City (92%)", type: "alert" },
                  { text: "System: Odds Refresh Complete", type: "system" },
                  { text: "PSG vs Bayern: Kick-off", type: "event" },
                ].map((item, i) => (
                  <div key={i} className={`text-[10px] font-mono p-2 rounded border ${item.type === "alert"
                    ? "text-[hsl(var(--primary))] border-[hsl(var(--primary))]/20 bg-[hsl(var(--primary))]/5"
                    : "text-zinc-500 border-zinc-800/50 bg-zinc-900/30"
                    }`}>
                    <span className="text-zinc-600 mr-1">→</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="pt-4 border-t border-zinc-800/50">
              <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">SESSION</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-zinc-900/50 rounded p-2 text-center">
                  <div className="text-lg font-mono font-bold text-white">12</div>
                  <div className="text-[9px] text-zinc-500 uppercase">Analyses</div>
                </div>
                <div className="bg-zinc-900/50 rounded p-2 text-center">
                  <div className="text-lg font-mono font-bold text-[hsl(var(--primary))]">78%</div>
                  <div className="text-[9px] text-zinc-500 uppercase">Win Rate</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content - 2 Column Grid */}
        <main className="flex-1 p-6">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-red-500" />
              <h2 className="text-sm font-mono text-zinc-300 uppercase tracking-wider">Matchs en Direct</h2>
              <Badge variant="outline" className="text-[10px] border-red-500/30 text-red-400">
                {liveMatches.length} LIVE
              </Badge>
            </div>
          </div>

          {/* Cards Grid - 2 columns on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {liveMatches.map((match, index) => (
              <motion.div
                key={`${match.teamA}-${match.teamB}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MatchCard {...match} />
              </motion.div>
            ))}
          </div>

          {/* Upcoming Section */}
          <div className="mt-10">
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="w-4 h-4 text-zinc-500" />
              <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-wider">À Venir</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { teams: "PSG vs Bayern", time: "20:45", league: "Champions League" },
                { teams: "Nadal vs Sinner", time: "21:00", league: "ATP Finals" },
                { teams: "Celtics vs Heat", time: "01:30", league: "NBA" },
              ].map((game, i) => (
                <div key={i} className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-4 hover:border-zinc-700 transition-colors">
                  <div className="text-xs text-zinc-500 font-mono mb-1">{game.league}</div>
                  <div className="text-sm text-white font-medium">{game.teams}</div>
                  <div className="text-xs text-zinc-400 font-mono mt-2">{game.time}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
