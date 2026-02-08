"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useSpring, useTransform, MotionValue } from "motion/react"

interface RollingNumberProps {
    value: number
    duration?: number
    className?: string
    prefix?: string
    suffix?: string
}

function AnimatedDigit({ digit, className }: { digit: string; className?: string }) {
    const isNumber = !isNaN(parseInt(digit))

    if (!isNumber) {
        return <span className={className}>{digit}</span>
    }

    return (
        <span className={`relative inline-block overflow-hidden h-[1em] ${className}`}>
            <motion.span
                className="inline-block"
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    duration: 0.8
                }}
                key={digit}
            >
                {digit}
            </motion.span>
        </span>
    )
}

export function RollingNumber({
    value,
    duration = 1.5,
    className,
    prefix = "",
    suffix = ""
}: RollingNumberProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [displayValue, setDisplayValue] = useState(0)

    const spring = useSpring(0, {
        stiffness: 50,
        damping: 20,
        restDelta: 0.001
    })

    useEffect(() => {
        if (isInView) {
            spring.set(value)
        }
    }, [value, spring, isInView])

    useEffect(() => {
        const unsubscribe = spring.on("change", (latest) => {
            setDisplayValue(Math.round(latest))
        })
        return () => unsubscribe()
    }, [spring])

    const digits = `${prefix}${displayValue}${suffix}`.split("")

    return (
        <motion.span
            ref={ref}
            className={`inline-flex font-mono tabular-nums ${className}`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
        >
            {digits.map((digit, index) => (
                <AnimatedDigit key={`${index}-${digit}`} digit={digit} className="font-mono" />
            ))}
        </motion.span>
    )
}
