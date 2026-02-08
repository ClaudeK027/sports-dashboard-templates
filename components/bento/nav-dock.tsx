"use client"

import { motion } from "motion/react"
import { Home, BarChart3, Wallet, History, Settings } from "lucide-react"
import { useState } from "react"

const navItems = [
    { icon: Home, label: "Accueil", active: true },
    { icon: BarChart3, label: "Analyse", active: false },
    { icon: Wallet, label: "Portefeuille", active: false },
    { icon: History, label: "Historique", active: false },
    { icon: Settings, label: "Paramètres", active: false },
]

export function NavDock() {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)

    return (
        <div className="fixed left-0 top-0 h-full w-12 bg-stone-950/90 backdrop-blur-md border-r border-stone-800/50 z-30 flex flex-col items-center justify-center">
            <nav className="flex flex-col items-center gap-1">
                {navItems.map((item) => (
                    <motion.button
                        key={item.label}
                        onMouseEnter={() => setHoveredItem(item.label)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${item.active
                                ? "bg-amber-500/10 text-amber-400"
                                : "text-stone-600 hover:text-stone-300 hover:bg-stone-800/50"
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <item.icon className="w-4 h-4" />

                        {item.active && (
                            <div className="absolute left-0 w-0.5 h-4 bg-amber-400 rounded-r" />
                        )}

                        {hoveredItem === item.label && (
                            <motion.div
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="absolute left-12 px-2 py-1 bg-stone-800 rounded text-[9px] text-stone-300 font-mono whitespace-nowrap border border-stone-700/50 z-50"
                            >
                                {item.label}
                            </motion.div>
                        )}
                    </motion.button>
                ))}
            </nav>
        </div>
    )
}
