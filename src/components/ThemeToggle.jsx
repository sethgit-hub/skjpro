"use client"

import React from "react"
import { motion } from "framer-motion"

export default function ThemeToggle({ theme, setTheme }) {
    const isDark = theme === "dark"

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark")
    }

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={container}
        >
            {/* SUN */}
            <motion.div
                initial={false}
                animate={{
                    y: isDark ? 28 : 0,
                    opacity: isDark ? 0 : 1,
                }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                style={sun}
            />

            {/* MOON */}
            <motion.div
                initial={false}
                animate={{
                    y: isDark ? 0 : -28,
                    opacity: isDark ? 1 : 0,
                }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                style={moon}
            />
        </button>
    )
}

/* =========================
   STYLES
========================= */

const container = {
    position: "relative",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    cursor: "pointer",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

const sun = {
    position: "absolute",
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#facc15",
    boxShadow: "0 0 12px rgba(250,204,21,0.6)",
}

const moon = {
    position: "absolute",
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#e5e7eb",
    boxShadow: "inset -3px -3px 0 rgba(0,0,0,0.15)",
}
