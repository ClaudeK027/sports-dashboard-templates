"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"

interface TiltCardProps {
    children: React.ReactNode
    className?: string
    glareEnabled?: boolean
}

export function TiltCard({ children, className = "", glareEnabled = true }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"])

    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"])
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative ${className}`}
        >
            {/* Glass Card */}
            <div
                className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden"
                style={{ transform: "translateZ(0)" }}
            >
                {/* Glare Effect */}
                {glareEnabled && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{
                            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.08) 0%, transparent 50%)`,
                            opacity: isHovered ? 1 : 0,
                        }}
                    />
                )}

                {/* Content */}
                <div style={{ transform: "translateZ(50px)" }}>
                    {children}
                </div>
            </div>

            {/* Soft Shadow */}
            <motion.div
                className="absolute -inset-1 bg-gradient-to-br from-slate-700/10 via-transparent to-slate-600/10 rounded-2xl blur-xl -z-10"
                animate={{ opacity: isHovered ? 0.6 : 0.2 }}
            />
        </motion.div>
    )
}
