"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

/* =========================
   🎛 USER CONTROLS
========================= */

const FONT_TIME = "monospace"
const FONT_TEXT = "'Inter', sans-serif"

const TIME_FONT_SIZE = "20px"
const TIME_FONT_WEIGHT = "700"
const TIME_LETTER_SPACING = "1px"
const TIME_COLOR_DARK = "#ffffffff"
const TIME_COLOR_LIGHT = "#ffffffff"

const COLOR_ACCENT = "#4ade80"
const DARK_TEXT = "#aaa"
const LIGHT_TEXT = "#333"

const DARK_BG = "rgba(10,10,10,0.82)"
const LIGHT_BG = "rgba(245,245,245,0.9)"

const DARK_BORDER = "rgba(255,255,255,0.12)"
const LIGHT_BORDER = "#ddd"

/* =========================
   🕰 TIME QUOTES
========================= */

const TIME_QUOTES = {
    morning: [
        "A new day, new possibilities",
        "Early hours, clear minds",
        "Momentum starts quietly",
        "Focus before the noise arrives",
        "Clarity compounds early",
        "Fresh hours, cleaner decisions",
        "Foundations are laid early",
        "Start slow, think sharp",
        "The day is still unwritten",
        "Intent precedes outcome",
    ],
    afternoon: [
        "Execution beats intention",
        "Progress lives here",
        "Momentum compounds midday",
        "Small decisions add up",
        "This is where outcomes form",
        "Strategy meets action",
        "Consistency shows its value",
        "Stay deliberate, stay steady",
        "Movement matters now",
        "Focus sustains momentum",
    ],
    evening: [
        "Reflection sharpens strategy",
        "Evaluate, then adjust",
        "Today informs tomorrow",
        "Lessons settle in the evening",
        "Calm hours invite clarity",
        "Review before you refine",
        "Insight follows action",
        "The signal emerges late",
        "Decisions slow, quality rises",
        "Endings shape beginnings",
    ],
    night: [
        "Quiet hours, big ideas",
        "Late focus builds advantage",
        "Depth beats distraction",
        "Clarity finds the quiet",
        "Precision lives here",
        "Not everything needs daylight",
        "Silence sharpens thought",
        "Focus outlasts fatigue",
        "Night favors patience",
        "Still thinking — respect",
    ],
}

/* =========================
   🏛 FINANCE QUOTES
========================= */

const FINANCE_QUOTES = [
    "Price is what you pay. Value is what you get.",
    "Markets reward discipline, not emotion.",
    "Liquidity is oxygen for financial systems.",
    "Risk grows where understanding is thin.",
    "Time in the market beats timing the market.",
    "Volatility reveals behavior more than valuation.",
    "Cash is a position.",
    "Compounding favors consistency.",
    "Margin of safety is rarely obvious.",
    "The downside defines the strategy.",
    "Data informs; judgment decides.",
    "Unpriced risk eventually introduces itself.",
    "Diversification buys time to think.",
    "Returns follow patience, not urgency.",
    "Capital preserved today compounds tomorrow.",
    "Confidence without evidence is leverage.",
    "Markets punish narratives without numbers.",
    "Opportunity cost compounds silently.",
    "Discipline is the edge you control.",
    "Every cycle feels unique — until it isn’t.",
]

/* =========================
   FOOTER
========================= */

export default function FooterData({ theme = "dark" }) {
    const [time, setTime] = useState("")
    const [leftQuote, setLeftQuote] = useState("")
    const [rightQuote, setRightQuote] = useState("")

    const isDark = theme === "dark"

    /* -------- INIT QUOTES -------- */
    useEffect(() => {
        const now = new Date()
        const hour = now.getHours()

        let period = "morning"
        if (hour >= 12 && hour < 17) period = "afternoon"
        else if (hour >= 17 && hour < 21) period = "evening"
        else if (hour >= 21 || hour < 5) period = "night"

        setLeftQuote(
            TIME_QUOTES[period][
                Math.floor(Math.random() * TIME_QUOTES[period].length)
            ]
        )

        setRightQuote(
            FINANCE_QUOTES[
                Math.floor(Math.random() * FINANCE_QUOTES.length)
            ]
        )
    }, [])

    /* -------- CLOCK -------- */
    useEffect(() => {
        const tick = () => {
            const now = new Date()
            let h = now.getHours() % 12 || 12
            const m = String(now.getMinutes()).padStart(2, "0")
            const s = String(now.getSeconds()).padStart(2, "0")
            setTime(`${h}:${m}:${s}`)
        }

        tick()
        const i = setInterval(tick, 1000)
        return () => clearInterval(i)
    }, [])

    /* -------- RESPONSIVE CSS (ONCE) -------- */
    useEffect(() => {
        const style = document.createElement("style")
        style.innerHTML = `
            @media (max-width: 640px) {
                .footer-container {
                    grid-template-columns: auto 1fr;
                    gap: 16px;
                }
                .footer-left {
                    display: none;
                }
                .footer-time {
                    justify-content: flex-start;
                }
                .footer-quote {
                    justify-content: flex-end;
                    text-align: right;
                }
            }
        `
        document.head.appendChild(style)
        return () => document.head.removeChild(style)
    }, [])

    return (
        <div style={outerWrap}>
            <motion.div
                className="footer-container"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                    ...terminalContainer,
                    background: isDark ? DARK_BG : LIGHT_BG,
                    border: `1px solid ${isDark ? DARK_BORDER : LIGHT_BORDER}`,
                }}
            >
                <div style={scanLine} />

                {/* LEFT */}
                <div className="footer-left" style={leftSection}>
                    <span style={{ ...leftText, color: isDark ? "#fff" : "#111" }}>
                        {leftQuote}
                        <span style={{ color: COLOR_ACCENT }}>.</span>
                    </span>
                </div>

                {/* CENTER */}
                <div className="footer-time" style={centerSection}>
                    <span
                        style={{
                            ...timeStyle,
                            color: isDark
                                ? TIME_COLOR_DARK
                                : TIME_COLOR_LIGHT,
                        }}
                    >
                        {time}
                    </span>
                </div>

                {/* RIGHT */}
                <div className="footer-quote" style={rightSection}>
                    <span
                        style={{
                            ...quoteStyle,
                            color: isDark ? DARK_TEXT : LIGHT_TEXT,
                        }}
                    >
                        “{rightQuote}”
                        <BlinkingCursor />
                    </span>
                </div>
            </motion.div>
        </div>
    )
}

/* =========================
   CURSOR
========================= */

function BlinkingCursor() {
    return (
        <motion.span
            style={{ color: COLOR_ACCENT, marginLeft: "4px" }}
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
        >
            _
        </motion.span>
    )
}

/* =========================
   STYLES
========================= */

const outerWrap = {
    width: "100%",
    padding: "60px 16px",
    display: "flex",
    justifyContent: "center",
}

const terminalContainer = {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",

    width: "100%",
    maxWidth: "1400px",
    minHeight: "90px",
    padding: "0 24px",

    backdropFilter: "blur(14px)",
    borderTop: `2px solid ${COLOR_ACCENT}`,
    borderRadius: "22px",

    boxShadow: "0 18px 40px rgba(0,0,0,0.4)",
    position: "relative",
    overflow: "hidden",
}

const scanLine = {
    position: "absolute",
    inset: 0,
    background:
        "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.35) 50%)",
    backgroundSize: "100% 4px",
    opacity: 0.25,
    pointerEvents: "none",
}

const leftSection = { zIndex: 2 }
const centerSection = { display: "flex", justifyContent: "center", zIndex: 2 }
const rightSection = { display: "flex", justifyContent: "flex-end", zIndex: 2 }

const leftText = {
    fontSize: "14px",
    fontFamily: FONT_TEXT,
    letterSpacing: "0.4px",
}

const timeStyle = {
    fontSize: TIME_FONT_SIZE,
    fontFamily: FONT_TIME,
    fontWeight: TIME_FONT_WEIGHT,
    letterSpacing: TIME_LETTER_SPACING,
}

const quoteStyle = {
    fontSize: "12px",
    fontFamily: FONT_TEXT,
    fontStyle: "italic",
    maxWidth: "380px",
    lineHeight: "1.45",
    textAlign: "right",
}
