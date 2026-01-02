"use client"

import React from "react"
import { motion } from "framer-motion"

/* ==========================================
   👤 USER DATA (EDIT THIS)
   ========================================== */
const PROFILE = {
    name: "ALEXANDER VANCE", // Your Name
    tagline: "Bridging the gap between Quantitative Finance and Modern Web Technologies.",
    bio: [
        "I am a Financial Analyst turned Software Engineer with a passion for building high-performance financial applications. My background in risk management gives me a unique edge in understanding data precision.",
        "Currently building Algorithmic Trading bots and dashboarding tools to democratize market data.",
    ],
    stats: [
        { label: "LOCATION", value: "New York, USA" },
        { label: "STATUS", value: "Open for Work" },
        { label: "FOCUS", value: "FinTech / React" },
        { label: "EXPERIENCE", value: "3+ Years" },
    ],
    // Replace with your actual photo URL
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
}

/* ==========================================
   🎨 STYLES
   ========================================== */
const ACCENT = "#4ade80" // Neon Green
const BG_DARK = "#0a0a0a"

export default function AboutProfile() {
    return (
        <section style={containerStyle}>
            <div style={contentWrapper}>
                
                {/* LEFT: THE ID CARD VISUAL */}
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    style={imageColumn}
                >
                    <div style={frameStyle}>
                        {/* Corner Brackets */}
                        <div style={{ ...corner, top: 0, left: 0, borderTop: `2px solid ${ACCENT}`, borderLeft: `2px solid ${ACCENT}` }} />
                        <div style={{ ...corner, top: 0, right: 0, borderTop: `2px solid ${ACCENT}`, borderRight: `2px solid ${ACCENT}` }} />
                        <div style={{ ...corner, bottom: 0, left: 0, borderBottom: `2px solid ${ACCENT}`, borderLeft: `2px solid ${ACCENT}` }} />
                        <div style={{ ...corner, bottom: 0, right: 0, borderBottom: `2px solid ${ACCENT}`, borderRight: `2px solid ${ACCENT}` }} />
                        
                        {/* The Image */}
                        <img src={PROFILE.image} alt="Profile" style={imgStyle} />
                        
                        {/* Scanning Line Animation */}
                        <motion.div 
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            style={scanLine} 
                        />
                        
                        {/* Overlay Tint */}
                        <div style={overlayTint} />
                    </div>
                    
                    <div style={idBadge}>
                        <span style={{ fontSize: "10px", color: "#666" }}>ID_REF:</span>
                        <span style={{ fontSize: "12px", color: ACCENT }}>8492-TX</span>
                    </div>
                </motion.div>

                {/* RIGHT: THE BIO DATA */}
                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                    style={textColumn}
                >
                    <h3 style={headerLabel}>// PERSONNEL_FILE</h3>
                    <h2 style={nameTitle}>{PROFILE.name}</h2>
                    <h4 style={taglineStyle}>{PROFILE.tagline}</h4>
                    
                    <div style={divider} />

                    {PROFILE.bio.map((paragraph, i) => (
                        <p key={i} style={bioText}>{paragraph}</p>
                    ))}

                    {/* STATS GRID */}
                    <div style={statsGrid}>
                        {PROFILE.stats.map((stat, i) => (
                            <div key={i} style={statItem}>
                                <span style={statLabel}>{stat.label}</span>
                                <span style={statValue}>{stat.value}</span>
                            </div>
                        ))}
                    </div>

                </motion.div>
            </div>
        </section>
    )
}

/* ==========================================
   🖌️ CSS STYLES
   ========================================== */

const containerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "0 20px",
    overflow: "hidden"
}

const contentWrapper = {
    display: "flex",
    flexWrap: "wrap",
    gap: "60px",
    maxWidth: "1100px",
    width: "100%",
    alignItems: "center",
    justifyContent: "center" // Centers on mobile
}

/* --- LEFT COLUMN (IMAGE) --- */
const imageColumn = {
    flex: "1 1 350px", // Grow, Shrink, Basis
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
}

const frameStyle = {
    position: "relative",
    padding: "10px", // Space for brackets
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.02)"
}

const imgStyle = {
    width: "100%",
    height: "auto",
    display: "block",
    filter: "grayscale(100%) contrast(1.1)", // High-tech B&W look
    opacity: 0.9
}

const corner = {
    position: "absolute",
    width: "20px",
    height: "20px",
    zIndex: 2
}

const scanLine = {
    position: "absolute",
    left: 0,
    width: "100%",
    height: "2px",
    background: ACCENT,
    boxShadow: `0 0 10px ${ACCENT}`,
    opacity: 0.7,
    zIndex: 3,
    pointerEvents: "none"
}

const overlayTint = {
    position: "absolute",
    inset: 10, // Matches padding of frame
    background: `linear-gradient(180deg, ${ACCENT}11 0%, transparent 100%)`,
    pointerEvents: "none",
    zIndex: 2
}

const idBadge = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "monospace",
    borderTop: "1px solid #333",
    paddingTop: "10px"
}

/* --- RIGHT COLUMN (TEXT) --- */
const textColumn = {
    flex: "1 1 500px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
}

const headerLabel = {
    color: ACCENT,
    fontFamily: "monospace",
    fontSize: "14px",
    marginBottom: "10px",
    letterSpacing: "2px"
}

const nameTitle = {
    fontSize: "clamp(32px, 5vw, 48px)",
    color: "#fff",
    fontWeight: "900",
    margin: "0 0 10px 0",
    letterSpacing: "-1px"
}

const taglineStyle = {
    fontSize: "18px",
    color: "#aaa",
    fontWeight: "400",
    margin: "0 0 20px 0",
    lineHeight: "1.4"
}

const divider = {
    width: "60px",
    height: "4px",
    background: ACCENT,
    marginBottom: "30px"
}

const bioText = {
    color: "#ccc",
    lineHeight: "1.7",
    marginBottom: "20px",
    fontSize: "16px"
}

/* --- STATS GRID --- */
const statsGrid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "30px",
    borderTop: "1px solid #222",
    paddingTop: "30px"
}

const statItem = {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
}

const statLabel = {
    fontSize: "11px",
    color: "#666",
    fontFamily: "monospace",
    letterSpacing: "1px"
}

const statValue = {
    fontSize: "16px",
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "monospace"
}