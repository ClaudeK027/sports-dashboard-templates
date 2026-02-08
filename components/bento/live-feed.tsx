"use client"

import { motion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown, Zap, Trophy, AlertCircle, Radio } from "lucide-react"

interface FeedEvent {
    id: number
    type: "goal" | "odds_up" | "odds_down" | "alert" | "bet_won"
    text: string
    time: string
}

const eventPool = [
    { type: "goal" as const, text: "⚽ Haaland (MCY) 12'" },
    { type: "goal" as const, text: "⚽ Vinicius Jr (RMA) 67'" },
    { type: "goal" as const, text: "⚽ Salah (LIV) 34'" },
    { type: "odds_up" as const, text: "↗ Real Madrid 2.25" },
    { type: "odds_up" as const, text: "↗ Djokovic 1.60" },
    { type: "odds_down" as const, text: "↘ Barcelona 1.65" },
    { type: "odds_down" as const, text: "↘ Bayern 1.72" },
    { type: "alert" as const, text: "🔴 Casemiro expulsé" },
    { type: "alert" as const, text: "⚠️ Blessure De Bruyne" },
    { type: "bet_won" as const, text: "🎉 +€150 Lakers ML" },
    { type: "bet_won" as const, text: "🎉 Combo x4 validé" },
]

const initialEvents: FeedEvent[] = [
    { id: 1, type: "goal", text: "⚽ Haaland (MCY) 12'", time: "2m" },
    { id: 2, type: "odds_up", text: "↗ Real Madrid 2.25", time: "5m" },
    { id: 3, type: "bet_won", text: "🎉 +€150 Lakers ML", time: "8m" },
    { id: 4, type: "alert", text: "🔴 Casemiro expulsé", time: "12m" },
]

const typeStyles = {
    goal: { icon: Zap, color: "text-amber-400" },
    odds_up: { icon: TrendingUp, color: "text-lime-400" },
    odds_down: { icon: TrendingDown, color: "text-rose-400" },
    alert: { icon: AlertCircle, color: "text-orange-400" },
    bet_won: { icon: Trophy, color: "text-sky-400" },
}

export function LiveFeedFloating() {
    const [events, setEvents] = useState(initialEvents)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            const randomEvent = eventPool[Math.floor(Math.random() * eventPool.length)]
            const newEvent: FeedEvent = {
                id: Date.now(),
                type: randomEvent.type,
                text: randomEvent.text,
                time: "now",
            }
            setEvents(prev => [newEvent, ...prev.slice(0, 3)])
        }, 30000)

        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            className="bg-stone-900/90 backdrop-blur-md border border-stone-800 rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            {/* Header */}
            <div className="px-3 py-2 border-b border-stone-800/50 flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-lime-400 opacity-75" />
                    <span className="relative rounded-full h-1.5 w-1.5 bg-lime-500" />
                </span>
                <Radio className="w-3 h-3 text-stone-500" />
                <span className="text-[8px] font-mono text-stone-500 uppercase tracking-wider">Live</span>
            </div>

            {/* Events - Compact List */}
            <div className="max-h-[280px] overflow-y-auto">
                <AnimatePresence initial={false}>
                    {events.slice(0, isExpanded ? 6 : 4).map((event, index) => {
                        const style = typeStyles[event.type]
                        const Icon = style.icon

                        return (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="px-3 py-1.5 border-b border-stone-800/20 hover:bg-stone-800/30 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
                                    <Icon className={`w-2.5 h-2.5 ${style.color} shrink-0`} />
                                    <p className="text-[9px] text-stone-400 truncate flex-1">
                                        {event.text}
                                    </p>
                                    <span className="text-[7px] text-stone-600 font-mono shrink-0">
                                        {event.time}
                                    </span>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
