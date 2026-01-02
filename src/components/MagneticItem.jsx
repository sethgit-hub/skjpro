"use client"

import React, { useRef } from "react"
import { motion } from "framer-motion"

export default function MagneticItem({
    children,
    strength = 0.25, // how strong the pull is
    disabled = false,
}) {
    const ref = useRef(null)

    function handleMouseMove(e) {
        if (disabled || !ref.current) return

        const rect = ref.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        ref.current.style.transform = `translate(${x * strength}px, ${
            y * strength
        }px)`
    }

    function handleMouseLeave() {
        if (!ref.current) return
        ref.current.style.transform = "translate(0px, 0px)"
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                display: "inline-flex",
                transition: "transform 0.15s ease-out",
                willChange: "transform",
            }}
        >
            {children}
        </motion.div>
    )
}
