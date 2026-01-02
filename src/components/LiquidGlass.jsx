"use client"
import React from "react"
import { motion } from "framer-motion"

export default function LiquidGlass({
    children,
    width = "100%",
    height = "auto",
    blur = 20, // How "frosted" is the glass?
    opacity = 0.1, // How see-through is it?
    borderRadius = 24,
}) {
    return (
        <div
            style={{
                width: width,
                height: height,
                position: "relative",
                borderRadius: borderRadius,
                // The "Glass" Magic:
                background: `rgba(255, 255, 255, ${opacity})`,
                backdropFilter: `blur(${blur}px)`, // Blurs the Matrix Rain behind it
                WebkitBackdropFilter: `blur(${blur}px)`, // Safari support
                border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle edge
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)", // Depth
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* The "Liquid" Shimmer Effect */}
            <motion.div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "200%", // Double width to slide across
                    height: "100%",
                    background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                    transform: "skewX(-20deg)",
                }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                    repeat: Infinity,
                    duration: 8, // Slow, elegant liquid movement
                    ease: "linear",
                }}
            />

            {/* Your Content (Text/Buttons) goes here */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    padding: 30,
                    width: "100%",
                }}
            >
                {children}
            </div>
        </div>
    )
}
