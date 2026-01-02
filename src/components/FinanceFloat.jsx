"use client"
import React, { useEffect, useRef } from "react"

export default function FinanceFloat() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        let animationFrameId
        let particles = []

        /* =========================
           CONFIG
        ========================= */

        const symbols = [
            "~","!","@","#","$","%","^","&","*","(",")","_","+","`","-","=",
            "{","}","[","]","|","\\",":",";","\"","'","<",">",",",".","?","/",
            "₿","Ξ","€","£","¥","₹","₽","₩","₺","↑","↓","‰",
        ]

        const desktopCount = 60
        const mobileCount = 30

        const colors = ["#ffffffff", "#ffffffff"]

        const baseSpeed = 0.4
        const speedVariance = 0.05
        const minSize = 14
        const maxSize = 30

        /* =========================
           INIT 
        ========================= */

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight

            const count =
                window.innerWidth < 768 ? mobileCount : desktopCount

            particles = Array.from({ length: count }).map(() => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speed: baseSpeed + Math.random() * speedVariance,
                size: minSize + Math.random() * (maxSize - minSize),
                char: symbols[Math.floor(Math.random() * symbols.length)],
            }))
        }

        resize()
        window.addEventListener("resize", resize)

        /* =========================
           ANIMATION LOOP
        ========================= */

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const isDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches

            ctx.fillStyle = isDark ? colors[1] : colors[0]
            ctx.globalAlpha = 0.4

            particles.forEach((p) => {
                ctx.font = `${p.size}px monospace`
                ctx.fillText(p.char, p.x, p.y)

                p.y += p.speed

                if (p.y > canvas.height) {
                    p.y = -50
                    p.x = Math.random() * canvas.width
                    p.char =
                        symbols[Math.floor(Math.random() * symbols.length)]
                }
            })

            animationFrameId = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener("resize", resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                inset: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,          // ✅ CRITICAL FIX
                pointerEvents: "none",
            }}
        />
    )
}
