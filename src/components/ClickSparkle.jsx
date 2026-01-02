"use client"

import { useEffect } from "react"

/* ==========================================
   🎛️ USER CONTROLS (EDIT THESE)
========================================== */

// Number of sparkles per click
const SPARKLE_COUNT = 12

// How far sparkles travel from cursor (px)
const SPREAD_RADIUS = 100 // ← increase/decrease this

// Sparkle size range (px)
const MIN_SIZE = 40
const MAX_SIZE = 70

// Animation duration (ms)
const LIFE_TIME = 70000

// Color
const SPARKLE_COLOR = "#1ab6bbff"

/* ========================================== */

export default function ClickSparkle() {
    useEffect(() => {
        const handleClick = (e) => {
            const x = e.clientX ?? e.touches?.[0]?.clientX
            const y = e.clientY ?? e.touches?.[0]?.clientY
            if (x == null || y == null) return

            for (let i = 0; i < SPARKLE_COUNT; i++) {
                createSparkle(x, y)
            }
        }

        window.addEventListener("click", handleClick)
        window.addEventListener("touchstart", handleClick)

        return () => {
            window.removeEventListener("click", handleClick)
            window.removeEventListener("touchstart", handleClick)
        }
    }, [])

    return null
}

/* ==========================================
   ✨ SPARKLE CREATION
========================================== */

function createSparkle(x, y) {
    const sparkle = document.createElement("div")

    const size =
        MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE)

    const angle = Math.random() * Math.PI * 2
    const distance = Math.random() * SPREAD_RADIUS

    const translateX = Math.cos(angle) * distance
    const translateY = Math.sin(angle) * distance

    sparkle.style.position = "fixed"
    sparkle.style.left = `${x}px`
    sparkle.style.top = `${y}px`
    sparkle.style.width = `${size}px`
    sparkle.style.height = `${size}px`
    sparkle.style.pointerEvents = "none"
    sparkle.style.zIndex = 9999

    /* STAR SHAPE */
    sparkle.style.background = SPARKLE_COLOR
    sparkle.style.clipPath =
        "polygon(50% 0%, 61% 38%, 100% 50%, 61% 62%, 50% 100%, 39% 62%, 0% 50%, 39% 38%)"

    sparkle.style.transform = "translate(-50%, -50%) scale(1)"
    sparkle.style.opacity = "1"

    sparkle.style.transition = `
        transform ${LIFE_TIME}ms ease-out,
        opacity ${LIFE_TIME}ms ease-out
    `

    document.body.appendChild(sparkle)

    requestAnimationFrame(() => {
        sparkle.style.transform = `
            translate(-50%, -50%)
            translate(${translateX}px, ${translateY}px)
            rotate(${Math.random() * 180}deg)
            scale(0)
        `
        sparkle.style.opacity = "0"
    })

    setTimeout(() => {
        sparkle.remove()
    }, LIFE_TIME)
}
