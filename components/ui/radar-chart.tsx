"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "motion/react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart as RechartsRadar, ResponsiveContainer } from "recharts"

interface RadarChartProps {
    className?: string
    data?: { subject: string; value: number; fullMark: number }[]
}

const defaultData = [
    { subject: "Forme", value: 120, fullMark: 150 },
    { subject: "Historique", value: 98, fullMark: 150 },
    { subject: "Attaque", value: 86, fullMark: 150 },
    { subject: "Défense", value: 99, fullMark: 150 },
    { subject: "Motivation", value: 85, fullMark: 150 },
    { subject: "Météo", value: 65, fullMark: 150 },
]

export function RadarChart({ className, data = defaultData }: RadarChartProps) {
    const controls = useAnimation()
    const [currentData, setCurrentData] = useState(data)

    // Pulsing effect - simulates real-time data updates
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentData(prevData =>
                prevData.map(item => ({
                    ...item,
                    value: item.value + (Math.random() * 10 - 5) // Random fluctuation ±5
                }))
            )
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    // Pulse animation on mount and on data change
    useEffect(() => {
        controls.start({
            scale: [1, 1.02, 1],
            opacity: [0.8, 1, 0.8],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        })
    }, [controls])

    return (
        <motion.div
            className={className}
            animate={controls}
        >
            <ResponsiveContainer width="100%" height="100%">
                <RechartsRadar cx="50%" cy="50%" outerRadius="70%" data={currentData}>
                    <PolarGrid stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 8 }}
                    />
                    <Radar
                        name="AI Confidence"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fill="hsl(var(--primary))"
                        fillOpacity={0.4}
                        animationDuration={500}
                    />
                </RechartsRadar>
            </ResponsiveContainer>
        </motion.div>
    )
}
