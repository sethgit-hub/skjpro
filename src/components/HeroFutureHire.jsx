"use client"

import React, { useEffect, useState, useRef } from "react"

export default function HeroFutureHire() {
    /* =========================
       🔧 USER CONTROLS
    ========================= */

    const HOVER_IN_SPEED = 15     // slower = smoother decrypt (hover IN)
    const HOVER_OUT_SPEED = 10    // faster = quick re-encrypt (hover OUT)
    const MOBILE_ROTATE_DELAY = 1500
    const ENCRYPT_LENGTH = 16

    /* ========================= */

    const roles = [
        "FINANCIAL ANALYST",
        "RISK ANALYST",
        "INVESTMENT ANALYST",
        "FP&A ANALYST",
        "DATA SCIENTIST",
        "COMPLIANCE ANALYST",
        "CREDIT ANALYST",
        "ACCOUNTANT",
        "ACCOUNTS EXECUTIVE",
        "TAX ANALYST",
        "RISK ANALYST",
        "AUDIT ASSOCIATE",
        "DATA ANALYST",
    ]

    const encryptChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]\|;'<>?/.,~`"

    const [roleIndex, setRoleIndex] = useState(0)
    const [displayText, setDisplayText] = useState("")
    const [canHover, setCanHover] = useState(false)

    const intervalRef = useRef(null)

    /* ---------------- DEVICE CHECK ---------------- */
    useEffect(() => {
        if (typeof window === "undefined") return
        const hoverCapable = window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches
        setCanHover(hoverCapable)
    }, [])

    /* ---------------- HELPERS ---------------- */
    const randomChar = () =>
        encryptChars[Math.floor(Math.random() * encryptChars.length)]

    const generateEncrypted = () =>
        Array.from({ length: ENCRYPT_LENGTH })
            .map(randomChar)
            .join("")

    const clearAnim = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    /* ---------------- DESKTOP DEFAULT ---------------- */
    useEffect(() => {
        if (!canHover) return
        setDisplayText(generateEncrypted())
    }, [canHover])

    /* ---------------- DECRYPT (HOVER IN) ---------------- */
    const decryptToRole = (role) => {
        clearAnim()
        let frame = 0

        intervalRef.current = setInterval(() => {
            const text = role
                .split("")
                .map((char, i) =>
                    i < frame ? char : randomChar()
                )
                .join("")

            setDisplayText(text)
            frame++

            if (frame > role.length) clearAnim()
        }, HOVER_IN_SPEED)
    }

    /* ---------------- ENCRYPT (HOVER OUT) ---------------- */
    const encryptAway = () => {
        clearAnim()
        let frame = 0
        const target = generateEncrypted()

        intervalRef.current = setInterval(() => {
            const text = target
                .split("")
                .map((char, i) =>
                    i < frame ? char : randomChar()
                )
                .join("")

            setDisplayText(text)
            frame++

            if (frame > target.length) clearAnim()
        }, HOVER_OUT_SPEED)
    }

    /* ---------------- MOBILE AUTO MODE ---------------- */
    useEffect(() => {
        if (canHover) return

        decryptToRole(roles[roleIndex])

        const timer = setTimeout(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length)
        }, MOBILE_ROTATE_DELAY)

        return () => {
            clearAnim()
            clearTimeout(timer)
        }
    }, [roleIndex, canHover])

    /* ---------------- HOVER EVENTS ---------------- */
    const handleMouseEnter = () => {
        if (!canHover) return
        decryptToRole(roles[roleIndex])
    }

    const handleMouseLeave = () => {
        if (!canHover) return
        encryptAway()
        setRoleIndex((prev) => (prev + 1) % roles.length)
    }

    return (
        <section style={container}>
            <div style={content}>
                <h1 style={name}>YOUR NAME</h1>

                <div style={badge}>
                    <span style={dot} />
                    CURRENTLY:
                    <span style={{ color: "#fff" }}> FINANCE INTERN</span>
                </div>

                <p style={label}>READY TO BECOME YOUR NEXT</p>

                <div
                    style={roleBox}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {displayText}
                </div>
            </div>
        </section>
    )
}

/* =========================
   STYLES
========================= */

const container = {
    minHeight: "90vh",
    background: "transparent",
    color: "#ffffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 20px",
}

const content = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "22px",
}

const name = {
    fontSize: "clamp(32px, 5vw, 52px)",
    fontWeight: "800",
}

const badge = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 14px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    fontSize: "11px",
    color: "#888",
}

const dot = {
    width: "6px",
    height: "6px",
    background: "#0b8da3ff",
    borderRadius: "50%",
}

const label = {
    fontSize: "12px",
    letterSpacing: "3px",
    color: "#666",
    marginTop: "30px",
}

const roleBox = {
    minWidth: "460px",
    height: "90px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(32px, 6vw, 64px)",
    fontWeight: "900",
    letterSpacing: "-1px",
    color: "#00edf1ff",
    whiteSpace: "nowrap",
    userSelect: "none",
    cursor: "default",
}
