"use client"

import React, { useEffect, useRef, useState } from "react"

export default function CustomEyes({ theme = "dark" }) {
    /* =========================
       CONFIG
    ========================= */

    const eyeWidth = 16
    const eyeHeight = 20
    const pupilSize = 6
    const gap = 2
    const borderThickness = 1.5

    const BLINK_INTERVAL = 4000
    const BLINK_DURATION = 120

    /* =========================
       THEME
    ========================= */

    const isDark = theme === "dark"

    const eyeColor = isDark ? "#ffffff" : "#111111"
    const pupilColor = isDark ? "#000000" : "#ffffff"
    const borderColor = isDark ? "#000000" : "#ffffff"

    /* ========================= */

    const leftEyeRef = useRef(null)
    const rightEyeRef = useRef(null)

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [isBlinking, setIsBlinking] = useState(false)

    /* =========================
       Mouse tracking
    ========================= */

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    /* =========================
       Blink loop
    ========================= */

    useEffect(() => {
        const interval = setInterval(() => {
            setIsBlinking(true)
            setTimeout(() => setIsBlinking(false), BLINK_DURATION)
        }, BLINK_INTERVAL)

        return () => clearInterval(interval)
    }, [])

    /* =========================
       Pupil movement (FIXED)
    ========================= */

    const calculatePupilPos = (eyeRef) => {
        if (!eyeRef) return { x: 0, y: 0 }

        const rect = eyeRef.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2

        const angle = Math.atan2(mousePos.y - cy, mousePos.x - cx)

        // ✅ TRUE RADIUS LIMIT — allows edge contact
        const maxX = (eyeWidth - pupilSize) / 2
        const maxY = (eyeHeight - pupilSize) / 2

        return {
            x: Math.cos(angle) * maxX,
            y: Math.sin(angle) * maxY,
        }
    }

    const leftPupil = calculatePupilPos(leftEyeRef.current)
    const rightPupil = calculatePupilPos(rightEyeRef.current)

    /* =========================
       STYLES
    ========================= */

    const containerStyle = {
        display: "flex",
        gap,
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
    }

    const eyeStyle = {
        width: eyeWidth,
        height: eyeHeight,
        backgroundColor: eyeColor,
        borderRadius: "50%",
        border: `${borderThickness}px solid ${borderColor}`,
        position: "relative",
        overflow: "hidden",
    }

    const pupilStyle = (x, y) => ({
        width: pupilSize,
        height: pupilSize,
        backgroundColor: pupilColor,
        borderRadius: "50%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
        transition: "transform 0.05s linear",
        willChange: "transform",
    })

    const eyelidStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: isBlinking ? "100%" : "0%",
        backgroundColor: eyeColor,
        transition: `height ${BLINK_DURATION}ms ease-in-out`,
        zIndex: 5,
    }

    return (
        <div style={containerStyle}>
            <div ref={leftEyeRef} style={eyeStyle}>
                <div style={eyelidStyle} />
                <div style={pupilStyle(leftPupil.x, leftPupil.y)} />
            </div>

            <div ref={rightEyeRef} style={eyeStyle}>
                <div style={eyelidStyle} />
                <div style={pupilStyle(rightPupil.x, rightPupil.y)} />
            </div>
        </div>
    )
}
