"use client"

import React, { useState } from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"

// ==============================================
// 💼 YOUR EXPERIENCE DATA
// ==============================================
const jobs = [
    {
        title: "FINANCE INTERN",
        company: "MOJO Company",
        period: "June'2025 - Present",
        // Replace with actual logo URLs
        logo: "https://play-lh.googleusercontent.com/9YuvZFj6a7qgxex5P3zL8foju_RcZg1tIMbM4k-jr337JzAXIBUuFhzApR8tz5iY3wiK=w240-h480-rw",
        description: [
            "Processed & recorded student fee receipts, vendor invoices, & service-charge bills. Handled payment amounts totalling over ₹350 million.",

            "Tracked & classified expenses by assigning transactions to the right categories, such as utilities, maintenance, & insurance. This supported trial balances & monthly financial statements.",

            "Prepared & reconciled Bank Reconciliation Statements. Investigated discrepancies & adjusted unearned revenue & suspense accounts.",

            "Compiled historical occupancy & revenue data to support budget analysis, cash flow forecasting, & variance reporting against planned figures.",
,
            "Kept financial documentation organized and helped prepare for audits., which included trial balances, reconciliations, payment vouchers, and an audit tracker for statutory & internal audits.",

            "Worked with Operations teams to improve workflows and ensure smooth coordination between finance & administrative functions.",

            "Provided support to clients with hostel accommodation inquiries while clarifying financial obligations & helping coordinate payments.",

            "Used MS Excel, Google Sheets, and Zoho Books for bookkeeping, financial tracking, & data analysis.",

        ],
    },
]

export default function ActiveTimeline() {
    return (
        <div style={containerStyle}>
            {/* The Vertical Guide Line */}
            <div style={guideLine} />

            {jobs.map((job, i) => (
                <TimelineNode key={i} job={job} />
            ))}
        </div>
    )
}

function TimelineNode({ job }) {
    const [isHovered, setIsHovered] = useState(false)

    // MOUSE TRACKING FOR SPOTLIGHT
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <div
            style={nodeWrapper}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 1. THE CIRCUIT DOT */}
            <div style={dotTrack}>
                <motion.div
                    animate={{
                        scale: isHovered ? 1.5 : 1,
                        backgroundColor: isHovered ? "#4ad4deff" : "#000",
                        borderColor: isHovered ? "#4adedcff" : "#333",
                    }}
                    style={dotStyle}
                />
            </div>

            {/* 2. THE CARD */}
            <div style={cardOuter} onMouseMove={handleMouseMove}>
                {/* Spotlight Layer */}
                <motion.div
                    style={{
                        ...spotlightLayer,
                        opacity: isHovered ? 1 : 0,
                        background: useMotionTemplate`
                            radial-gradient(
                                300px circle at ${mouseX}px ${mouseY}px,
                                rgba(74, 222, 128, 0.15),
                                transparent 80%
                            )
                        `,
                    }}
                />

                {/* Border Glow Layer */}
                <motion.div
                    style={{
                        ...borderLayer,
                        opacity: isHovered ? 1 : 0,
                        background: useMotionTemplate`
                            radial-gradient(
                                200px circle at ${mouseX}px ${mouseY}px,
                                rgba(29, 173, 217, 0.6),
                                transparent 80%
                            )
                        `,
                    }}
                />

                {/* Content */}
                <div style={cardContent}>
                    <div style={headerRow}>
                        {/* LEFT: Logo + Text */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "15px",
                            }}
                        >
                            {/* THE LOGO BOX */}
                            <div style={logoBox}>
                                <img
                                    src={job.logo}
                                    alt={job.company}
                                    style={imgStyle}
                                />
                            </div>

                            <div>
                                <h3
                                    style={{
                                        ...titleStyle,
                                        color: isHovered ? "#0b85d1ff" : "#fff",
                                    }}
                                >
                                    {job.title}
                                </h3>
                                <h4 style={companyStyle}>{job.company}</h4>
                            </div>
                        </div>

                        {/* RIGHT: Date */}
                        <span style={dateBadge}>{job.period}</span>
                    </div>

                    {/* The "Accordion" Reveal with BULLET POINTS */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: isHovered ? "auto" : 0,
                            opacity: isHovered ? 1 : 0,
                        }}
                        style={{ overflow: "hidden" }}
                    >
                        <ul style={listContainer}>
                            {job.description.map((point, index) => (
                                <li key={index} style={listItem}>
                                    <span style={bulletPoint}>▹</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

// ==============================================
// 🎨 STYLES
// ==============================================

const containerStyle = {
    position: "relative",
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "60px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
}

const guideLine = {
    position: "absolute",
    left: "39px",
    top: "60px",
    bottom: "60px",
    width: "2px",
    background: "rgba(255,255,255,0.1)",
    zIndex: 0,
}

const nodeWrapper = {
    position: "relative",
    display: "flex",
    alignItems: "flex-start",
    zIndex: 1,
}

const dotTrack = {
    width: "40px",
    display: "flex",
    justifyContent: "center",
    paddingTop: "30px",
    marginRight: "25px",
}

const dotStyle = {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#000",
    border: "2px solid #333",
    zIndex: 2,
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
}

const cardOuter = {
    position: "relative",
    flex: 1,
    background: "rgba(255,255,255,0.02)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    overflow: "hidden",
    cursor: "default",
}

const spotlightLayer = {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
}

const borderLayer = {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 10,
    mixBlendMode: "overlay",
}

const cardContent = {
    position: "relative",
    zIndex: 2,
    padding: "20px",
}

const headerRow = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
    gap: "10px",
}

const logoBox = {
    width: "48px",
    height: "48px",
    background: "#fff",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px",
    flexShrink: 0,
}

const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
}

const titleStyle = {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    transition: "color 0.3s ease",
}

const companyStyle = {
    margin: "2px 0 0 0",
    color: "#888",
    fontSize: "13px",
    fontWeight: "400",
}

const dateBadge = {
    fontSize: "11px",
    fontFamily: "monospace",
    color: "#0cb4daff",
    background: "rgba(74, 222, 128, 0.1)",
    padding: "4px 8px",
    borderRadius: "4px",
    border: "1px solid rgba(74, 222, 128, 0.2)",
    whiteSpace: "nowrap",
}

/* LIST STYLES */
const listContainer = {
    marginTop: "15px",
    paddingTop: "15px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    paddingLeft: "0",
    margin: "15px 0 0 0",
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
}

const listItem = {
    color: "#ccc",
    fontSize: "14px",
    lineHeight: "1.6",
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
}

const bulletPoint = {
    color: "#4ad4deff",
    fontSize: "16px",
    lineHeight: "1.2",
    flexShrink: 0,
}
