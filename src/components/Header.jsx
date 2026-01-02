"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import CustomEyes from "@/components/CustomEyes"

/* =========================
   NAV CONFIG
========================= */

const SECTIONS = [
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Education", id: "education" },
    { label: "Contact", id: "contact" },
]

export default function Header({ theme = "dark" }) {
    const [active, setActive] = useState("")
    const isDark = theme === "dark"

    /* =========================
       ACTIVE SECTION TRACKING
    ========================= */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id)
                    }
                })
            },
            { threshold: 0.6 }
        )

        SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <header
            style={{
                ...headerBase,
                background: isDark
                    ? "rgba(10,10,10,0.7)"
                    : "rgba(255,255,255,0.75)",
                borderBottom: isDark
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(0,0,0,0.08)",
            }}
        >
            {/* LEFT — HOME (Glass Pill) */}
            <GlassPill
                label="HOME"
                active={false}
                onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                }
                theme={theme}
            />

            {/* RIGHT — NAV + EYES */}
            <div style={rightGroup}>
                {/* NAV ITEMS */}
                <nav style={nav}>
                    {SECTIONS.map(({ label, id }) => (
                        <GlassPill
                            key={id}
                            label={label}
                            active={active === id}
                            onClick={() =>
                                document
                                    .getElementById(id)
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                            theme={theme}
                        />
                    ))}
                </nav>

                {/* EYES (NO GLASS) */}
                <div style={eyesWrapper}>
                    <CustomEyes theme={theme} />
                </div>
            </div>
        </header>
    )
}

/* =========================
   GLASS PILL COMPONENT
========================= */

function GlassPill({ label, onClick, active, theme }) {
    const isDark = theme === "dark"

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
                ...pillBase,
                background: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.6)",
                border: active
                    ? "1px solid #4ade80"
                    : isDark
                    ? "1px solid rgba(255,255,255,0.15)"
                    : "1px solid rgba(0,0,0,0.1)",
                color: active
                    ? "#4ade80"
                    : isDark
                    ? "#ddd"
                    : "#222",
            }}
        >
            {label}
        </motion.button>
    )
}

/* =========================
   STYLES
========================= */

const headerBase = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    zIndex: 1000,
}

/* Right side */
const rightGroup = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
}

const nav = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
}

/* Glass pill */
const pillBase = {
    fontFamily: "monospace",
    fontSize: "12px",
    letterSpacing: "1px",
    padding: "8px 14px",
    borderRadius: "999px",
    cursor: "pointer",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
    transition: "all 0.2s ease",
    backgroundClip: "padding-box",
}

/* Eyes */
const eyesWrapper = {
    display: "flex",
    alignItems: "center",
    marginLeft: "6px",
}
