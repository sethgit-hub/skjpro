"use client"
import React, { useEffect, useState, useRef } from "react"
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useTransform,
    animate,
} from "framer-motion"

// ==============================================
// 🛠️ YOUR TOOLS LIST
// ==============================================
const tools = [
    {
        name: "Excel",
        url: "https://upload.wikimedia.org/wikipedia/commons/6/60/Microsoft_Office_Excel_%282025%E2%80%93present%29.svg",
    },
    { name: "Google Sheets", url: "https://cdn.simpleicons.org/googlesheets" },
    {
        name: "Power BI",
        url: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
    },
    { name: "SQL", url: "https://cdn.simpleicons.org/mysql" },
    {
        name: "Python",
        url: "https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg",
    },
    {
        name: "Zoho Books",
        url: "https://upload.wikimedia.org/wikipedia/commons/3/30/ZOHO_logo_2023.svg",
    },
    {
        name: "Tally Prime",
        url: "https://upload.wikimedia.org/wikipedia/commons/0/01/TallyPrime_Logo.jpg",
    },
    {
        name: "Photoshop",
        url: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
    },
    {
        name: "DaVinci Resolve",
        url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png",
    },
]

export default function ToolsTicker() {
    // 1. SETUP
    // Duplicate list 4 times to ensure we never run out of scroll space before resetting
    const duplicatedTools = [...tools, ...tools, ...tools, ...tools]

    // 2. ANIMATION STATE
    // This tracks if ANY icon is currently being hovered
    const [isHovered, setIsHovered] = useState(false)

    // 3. MOTION VALUES
    // 'baseX' tracks the total distance traveled
    const baseX = useMotionValue(0)
    // 'speedFactor' acts like a gas pedal (1 = Go, 0 = Stop)
    const speedFactor = useMotionValue(1)

    // 4. THE PHYSICS LOOP
    // This runs every single frame (60fps) to move the ticker
    useAnimationFrame((time, delta) => {
        // Calculate movement: (Base Speed * Smooth Factor * Time Passed)
        // Adjust "0.005" to change the base scrolling speed
        let moveBy = 0.005 * delta * speedFactor.get()

        // Update position
        baseX.set(baseX.get() - moveBy)
    })

    // 5. SMOOTH BRAKING LOGIC
    useEffect(() => {
        if (isHovered) {
            // SLOW DOWN: Animate speed from 1 to 0 over 0.5 seconds
            animate(speedFactor, 0, { ease: "easeOut", duration: 0.5 })
        } else {
            // SPEED UP: Animate speed from 0 to 1 over 0.5 seconds
            animate(speedFactor, 0.15, { ease: "easeIn", duration: 0.5 })
        }
    }, [isHovered])

    // 6. INFINITE LOOP MATH
    // This transform wraps the position so it loops infinitely.
    // "% 25" means: Once we scroll past 25% (width of 1 set), snap back to 0.
    const x = useTransform(baseX, (v) => `${v % 25}%`)

    return (
        <div style={containerStyle}>
            {/* Edges Fade */}
            <div
                style={{
                    ...maskStyle,
                    left: 0,
                    background:
                        "linear-gradient(to right, #050505, transparent)",
                }}
            />
            <div
                style={{
                    ...maskStyle,
                    right: 0,
                    background:
                        "linear-gradient(to left, #050505, transparent)",
                }}
            />

            {/* The Moving Track */}
            <motion.div
                style={{
                    ...trackStyle,
                    x, // Connect our motion value here
                }}
            >
                {duplicatedTools.map((tool, index) => (
                    <ToolItem
                        key={index}
                        tool={tool}
                        // Connect Hover State to Parent
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                    />
                ))}
            </motion.div>
        </div>
    )
}

// Individual Logo Component
function ToolItem({ tool, onHoverStart, onHoverEnd }) {
    return (
        <div
            className="tool-item"
            style={itemWrapperStyle}
            onMouseEnter={onHoverStart} // Trigger smooth brake
            onMouseLeave={onHoverEnd} // Trigger smooth resume
        >
            <img src={tool.url} alt={tool.name} style={imgStyle} />
            <span style={tooltipStyle}>{tool.name}</span>

            {/* CSS for Color/Scale Effects */}
            <style>
                {`
                .tool-item img {
                    filter: grayscale(100%) brightness(0.7);
                    transition: all 0.4s ease; /* Smooth Color Fade */
                    opacity: 0.6;
                    transform: scale(1);
                    pointer-events: auto; 
                }
                .tool-item:hover img {
                    filter: grayscale(0%) brightness(1);
                    opacity: 1;
                    transform: scale(1.5); /* Big Zoom */
                    cursor: pointer;
                }
                .tool-item:hover span {
                    opacity: 1 !important;
                    bottom: -35px !important;
                }
                `}
            </style>
        </div>
    )
}

// --- STYLES -----------------------------

const containerStyle = {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    padding: "60px 0",
    background: "transparent",
    display: "flex",
    alignItems: "center",
}

const trackStyle = {
    display: "flex",
    gap: "80px", // Spacing between logos
    width: "max-content",
    willChange: "transform",
}

const maskStyle = {
    position: "absolute",
    top: 0,
    width: "150px",
    height: "100%",
    zIndex: 2,
    pointerEvents: "none",
}

const itemWrapperStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px", // Increased hit area for smoother hover detection
}

const imgStyle = {
    height: "55px",
    width: "auto",
    display: "block",
    objectFit: "contain",
}

const tooltipStyle = {
    position: "absolute",
    bottom: "-20px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    opacity: 0,
    transition: "all 0.3s ease",
    fontFamily: "sans-serif",
    whiteSpace: "nowrap",
    pointerEvents: "none",
    textShadow: "0 2px 4px rgba(0,0,0,0.5)",
}
