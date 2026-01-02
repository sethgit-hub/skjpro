"use client"
import React from "react"
import { motion } from "framer-motion"

export default function ProjectCardAlt({
    title = "Tesla (TSLA) Scenario Analysis",
    description = "Bull, base, and bear case valuation models assessing margin expansion, capex cycles, and macro sensitivity.",
    tags = ["Valuation", "Scenario Modeling", "Equities"],
    image = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2600&auto=format&fit=crop",
    link = "#",
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={outerWrap}
        >
            <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={card}
            >
                {/* LEFT ACCENT BAR */}
                <div style={accentBar} />

                {/* CONTENT */}
                <div style={contentWrap}>
                    {/* META */}
                    <div style={metaRow}>
                        {tags.map((tag, i) => (
                            <span key={i} style={tagStyle}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* TITLE */}
                    <h3 style={titleStyle}>{title}</h3>

                    {/* DESCRIPTION */}
                    <p style={descStyle}>{description}</p>

                    {/* CTA */}
                    <a href={link} style={{ textDecoration: "none" }}>
                        <motion.span
                            whileHover={{ x: 6 }}
                            transition={{ duration: 0.25 }}
                            style={ctaStyle}
                        >
                            View Case →
                        </motion.span>
                    </a>
                </div>

                {/* IMAGE FRAME */}
                <div style={imageFrame}>
                    <img
                        src={image}
                        alt={title}
                        style={imageStyle}
                    />
                </div>
            </motion.div>
        </motion.div>
    )
}

/* =========================
   STYLES
========================= */

const outerWrap = {
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "50px 20px",
}

const card = {
    display: "grid",
    gridTemplateColumns: "6px 1.2fr 1fr",
    gap: "32px",
    background: "rgba(15,15,15,0.55)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "26px",
    boxShadow: "0 30px 70px rgba(0,0,0,0.55)",
    overflow: "hidden",
    position: "relative",
}

const accentBar = {
    background: "linear-gradient(180deg, #4ade80, transparent)",
}

const contentWrap = {
    padding: "42px 10px 42px 36px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "18px",
}

const metaRow = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
}

const tagStyle = {
    fontSize: "11px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "#4ade80",
    padding: "5px 10px",
    borderRadius: "999px",
    background: "rgba(74,222,128,0.08)",
    border: "1px solid rgba(74,222,128,0.25)",
}

const titleStyle = {
    fontSize: "28px",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
    lineHeight: "1.2",
}

const descStyle = {
    fontSize: "15px",
    color: "#aaa",
    lineHeight: "1.6",
    maxWidth: "420px",
}

const ctaStyle = {
    marginTop: "10px",
    display: "inline-block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#4ade80",
    letterSpacing: "0.5px",
}

const imageFrame = {
    padding: "24px",
    display: "flex",
    alignItems: "center",
}

const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "18px",
    opacity: 0.85,
}
