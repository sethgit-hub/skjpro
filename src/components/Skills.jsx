"use client"

import React, { useRef } from "react"
import {
    motion,
    useMotionValue,
    useSpring,
    useMotionTemplate,
} from "framer-motion"

/* ==============================================
   🎛️ THEME TOKENS
============================================== */

const COLORS = {
    tech: "#06b6d4",
    core: "#8b5cf6",
    ethic: "#f59e0b",
    soft: "#10b981",
    card: "rgba(10,10,10,0.55)", // GLASS CARD
    textPrimary: "#e5e7eb",
    textMuted: "#94a3b8",
}

/* ==============================================
   🧠 DATA
============================================== */

const DATA = [
    {
        title: "Technical Stack",
        color: COLORS.tech,
        items: [
            { name: "Accounting", icon: "📒", tag: "Intermediate" },
            { name: "Financial Analysis", icon: "📊", tag: "Intermediate" },
            { name: "Bank Reconciliation", icon: "🏦", tag: "Intermediate" },
            { name: "US GAAP", icon: "⚖️", tag: "Intermediate" },
            { name: "Accounts P&R", icon: "💻", tag: "Intermediate" },
        ],
    },
    {
        title: "Core Skills",
        color: COLORS.core,
        items: [
            { name: "Financial Reporting", icon: "📉", tag: "Core" },
            { name: "Strategic Planning", icon: "🎯", tag: "Core" },
            { name: "Risk Management", icon: "🛡️", tag: "Core" },
            { name: "Data Modeling", icon: "🔢", tag: "Tech" },
            { name: "Problem Solving", icon: "🧩", tag: "Cognitive" },
        ],
    },
    {
        title: "Work Ethic",
        color: COLORS.ethic,
        items: [
            { name: "Ownership", icon: "🔑", tag: "Mindset" },
            { name: "Adaptability", icon: "🌊", tag: "Mindset" },
            { name: "Resilience", icon: "🌵", tag: "Trait" },
            { name: "Integrity", icon: "🤝", tag: "Values" },
            { name: "Fast Learner", icon: "⚡", tag: "Trait" },
        ],
    },
    {
        title: "Interpersonal",
        color: COLORS.soft,
        items: [
            { name: "Collaboration", icon: "👥", tag: "Social" },
            { name: "Communication", icon: "💬", tag: "Social" },
            { name: "Leadership", icon: "👑", tag: "Growth" },
            { name: "Negotiation", icon: "🤝", tag: "Skill" },
            { name: "Empathy", icon: "❤️", tag: "Values" },
        ],
    },
]

/* ==============================================
   🌌 MAIN
============================================== */

export default function NextLevelGrid() {
    return (
        <section style={container}>
            <div style={grid}>
                {DATA.map((group, i) => (
                    <SkillGroup key={i} data={group} delay={i * 0.12} />
                ))}
            </div>
        </section>
    )
}

/* ==============================================
   🧱 GROUP
============================================== */

function SkillGroup({ data, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay, ease: "easeOut" }}
            style={column}
        >
            <div style={{ ...groupHeader, borderLeftColor: data.color }}>
                <h3 style={{ color: data.color }}>{data.title}</h3>
            </div>

            {data.items.map((item, i) => (
                <HolographicCard key={i} item={item} color={data.color} />
            ))}
        </motion.div>
    )
}

/* ==============================================
   💎 CARD
============================================== */

function HolographicCard({ item, color }) {
    const ref = useRef(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mx = useSpring(x, { stiffness: 120, damping: 20 })
    const my = useSpring(y, { stiffness: 120, damping: 20 })

    const spotlight = useMotionTemplate`
        radial-gradient(
            260px circle at ${mx}px ${my}px,
            rgba(255,255,255,0.06),
            transparent 75%
        )
    `

    const glow = useMotionTemplate`
        radial-gradient(
            140px circle at ${mx}px ${my}px,
            ${color},
            transparent 80%
        )
    `

    function onMove(e) {
        const rect = ref.current.getBoundingClientRect()
        x.set(e.clientX - rect.left)
        y.set(e.clientY - rect.top)
    }

    function onLeave() {
        x.set(0)
        y.set(0)
    }

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={cardOuter}
        >
            <motion.div style={{ ...cardGlow, background: glow }} />
            <motion.div
                style={{ ...cardInner, background: spotlight }}
                whileHover={{ scale: 1.015, x: 4 }}
                transition={{ duration: 0.2 }}
            >
                <div style={{ ...iconBox, color }}>{item.icon}</div>

                <div style={{ flex: 1 }}>
                    <div style={itemName}>{item.name}</div>
                    <span style={{ ...itemTag, borderColor: color, color }}>
                        {item.tag}
                    </span>
                </div>

                <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    style={{ color }}
                >
                    →
                </motion.span>
            </motion.div>
        </div>
    )
}

/* ==============================================
   🎨 STYLES
============================================== */

const container = {
    width: "100%",
    padding: "80px 20px",
    display: "flex",
    justifyContent: "center",
    position: "relative",
    background: "transparent", // IMPORTANT
}

const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "36px",
    maxWidth: "1400px",
    width: "100%",
    position: "relative",
    zIndex: 1,
}

const column = {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
}

const groupHeader = {
    borderLeft: "3px solid",
    paddingLeft: "12px",
    marginBottom: "6px",
    fontSize: "12px",
    letterSpacing: "2px",
    textTransform: "uppercase",
}

const cardOuter = {
    position: "relative",
    padding: "1px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.08)",
    overflow: "hidden",
}

const cardGlow = {
    position: "absolute",
    inset: 0,
    borderRadius: "14px",
    pointerEvents: "none",
}

const cardInner = {
    position: "relative",
    zIndex: 1,
    backgroundColor: COLORS.card,
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderRadius: "13px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
}

const iconBox = {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    border: "1px solid rgba(255,255,255,0.08)",
}

const itemName = {
    fontSize: "15px",
    fontWeight: 600,
    color: COLORS.textPrimary,
    marginBottom: "4px",
}

const itemTag = {
    fontSize: "10px",
    padding: "2px 8px",
    borderRadius: "999px",
    border: "1px solid",
    fontWeight: 500,
    opacity: 0.85,
}
