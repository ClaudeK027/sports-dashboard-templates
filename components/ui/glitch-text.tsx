"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "motion/react"

const glyphChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>[]{}|"

interface GlitchTextProps {
    text: string
    className?: string
    speed?: number
    delay?: number
}

export function GlitchText({ text, className, speed = 30, delay = 0 }: GlitchTextProps) {
    const [displayText, setDisplayText] = useState("")
    const [isDecoding, setIsDecoding] = useState(false)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (!isInView) return

        const timeoutId = setTimeout(() => {
            setIsDecoding(true)
            let iterations = 0
            const finalText = text.toUpperCase()

            const interval = setInterval(() => {
                setDisplayText(
                    finalText
                        .split("")
                        .map((char, index) => {
                            if (char === " ") return " "
                            if (index < iterations) {
                                return finalText[index]
                            }
                            return glyphChars[Math.floor(Math.random() * glyphChars.length)]
                        })
                        .join("")
                )

                if (iterations >= finalText.length) {
                    clearInterval(interval)
                    setDisplayText(text) // Restore original casing
                    setIsDecoding(false)
                }

                iterations += 0.5
            }, speed)

            return () => clearInterval(interval)
        }, delay)

        return () => clearTimeout(timeoutId)
    }, [text, isInView, speed, delay])

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={isInView ? {
                opacity: 1,
                filter: "blur(0px)",
                textShadow: isDecoding ? "0 0 8px hsl(var(--primary))" : "none"
            } : {}}
            transition={{ duration: 0.3 }}
            style={{
                fontFamily: isDecoding ? "monospace" : "inherit",
                letterSpacing: isDecoding ? "0.05em" : "normal"
            }}
        >
            {displayText || text}
        </motion.span>
    )
}
