"use client"
import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function ParallaxImage(props) {
    // 1. CONFIGURATION
    // speed < 1 = Slower than scroll (Feels distant/Heavy)
    // speed > 1 = Faster than scroll (Feels close/Floating)
    const { image = "", speed = 0.5, height = 400, borderRadius = 20 } = props

    const ref = useRef(null)

    // Track when this specific image is visible on screen
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    // Calculate movement:
    // When scroll is at 0%, move image up 10%
    // When scroll is at 100%, move image down 10%
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

    return (
        // The "Window" (Masks the image)
        <div
            ref={ref}
            style={{
                height: height,
                width: "100%",
                overflow: "hidden", // Cuts off the edges
                borderRadius: borderRadius,
                position: "relative",
            }}
        >
            {/* The Moving Image */}
            <motion.div style={{ y, height: "120%", width: "100%" }}>
                <div
                    style={{
                        backgroundImage: `url('${image}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%",
                        height: "100%",
                    }}
                />
            </motion.div>
        </div>
    )
}
