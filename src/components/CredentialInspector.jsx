"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ==============================================
// 🎓 DATA: Education & Certs
// ==============================================
const credentials = [
    {
        id: "EDU-01",
        title: "Master of Business Admin",
        org: "Symbiosis Institute",
        year: "2021 - 2023",
        cat: "DEGREE",
        color: "#a78bfa", // Purple
        desc: "Specialized in Financial Strategy & Risk Management. Graduated with Distinction.",
    },
    {
        id: "CERT-01",
        title: "CFA Level 1 Candidate",
        org: "CFA Institute",
        year: "In Progress",
        cat: "LICENSE",
        color: "#facc15", // Yellow
        desc: "Preparing for the rigorous Level 1 exam. Focus on Ethics, Quant, and Portfolio Mgmt.",
    },
    {
        id: "CERT-02",
        title: "Google Data Analytics",
        org: "Google Career Certs",
        year: "2023",
        cat: "CERTIFICATE",
        color: "#4ade80", // Green
        desc: "Professional certificate covering R, SQL, Tableau, and Data Cleaning methodologies.",
    },
    {
        id: "CERT-03",
        title: "Microsoft Excel Expert",
        org: "MO-200 Exam",
        year: "2022",
        cat: "SKILL",
        color: "#4ade80",
        desc: "Certified expert in advanced formulas, VBA automation, and complex data modeling.",
    },
    {
        id: "CERT-04",
        title: "Microsoft Excel Expert",
        org: "MO-300 Exam",
        year: "2023",
        cat: "SKILL",
        color: "#4ade80",
        desc: "Certified expert in advanced formulas, VBA automation, and complex data modeling.",
    },
]

export default function CredentialInspector() {
    const [activeId, setActiveId] = useState(credentials[0].id)

    // Find the currently active data object
    const activeItem = credentials.find((c) => c.id === activeId)

    return (
        <div style={containerStyle}>
            {/* LEFT COLUMN: THE LIST */}
            <div style={listColumn}>
                <h3 style={headerStyle}>EDUCATIONAL_DATABASE</h3>
                <div style={listWrapper}>
                    {credentials.map((item) => (
                        <ListItem
                            key={item.id}
                            item={item}
                            isActive={activeId === item.id}
                            onHover={() => setActiveId(item.id)}
                        />
                    ))}
                </div>
            </div>

            {/* RIGHT COLUMN: THE PREVIEW WINDOW */}
            <div style={previewColumn}>
                <div style={previewWindow}>
                    {/* Background Grid */}
                    <div style={gridBg} />

                    {/* The Changing Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeItem.id}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{
                                opacity: 0,
                                scale: 1.1,
                                filter: "blur(10px)",
                            }}
                            transition={{ duration: 0.3 }}
                            style={contentWrapper}
                        >
                            {/* Top Badge */}
                            <div
                                style={{
                                    ...catBadge,
                                    borderColor: activeItem.color,
                                    color: activeItem.color,
                                }}
                            >
                                {activeItem.cat} :: {activeItem.id}
                            </div>

                            {/* Big Title */}
                            <h2 style={previewTitle}>{activeItem.title}</h2>
                            <h3 style={previewOrg}>{activeItem.org}</h3>

                            {/* Divider Line */}
                            <div
                                style={{
                                    ...divider,
                                    background: activeItem.color,
                                }}
                            />

                            {/* Description */}
                            <p style={previewDesc}>{activeItem.desc}</p>

                            {/* Year/Status */}
                            <div style={statusBox}>
                                <span
                                    style={{ color: "#888", fontSize: "12px" }}
                                >
                                    STATUS / YEAR
                                </span>
                                <span
                                    style={{
                                        color: activeItem.color,
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {activeItem.year}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Decorative Scan Lines overlay */}
                    <div style={scanOverlay} />
                </div>
            </div>
        </div>
    )
}

// ------------------------------------------------
// 📄 LIST ITEM COMPONENT
// ------------------------------------------------
function ListItem({ item, isActive, onHover }) {
    return (
        <motion.div
            onMouseEnter={onHover}
            animate={{
                backgroundColor: isActive
                    ? "rgba(255,255,255,0.1)"
                    : "transparent",
                borderLeftWidth: isActive ? "4px" : "1px",
                borderColor: isActive ? item.color : "rgba(255,255,255,0.1)",
                paddingLeft: isActive ? "25px" : "20px",
            }}
            style={itemStyle}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <span
                    style={{
                        color: isActive ? "#fff" : "#888",
                        fontWeight: isActive ? "700" : "400",
                        fontSize: "16px",
                    }}
                >
                    {item.title}
                </span>

                {/* Arrow Icon only visible when active */}
                <motion.span
                    animate={{
                        opacity: isActive ? 1 : 0,
                        x: isActive ? 0 : -10,
                    }}
                    style={{ color: item.color }}
                >
                    →
                </motion.span>
            </div>
            <span
                style={{
                    fontSize: "12px",
                    color: "#555",
                    marginTop: "4px",
                    display: "block",
                }}
            >
                {item.org}
            </span>
        </motion.div>
    )
}

// --- STYLES ---

const containerStyle = {
    display: "flex",
    flexWrap: "wrap", // Allows stacking on mobile
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "60px 20px",
    gap: "40px",
    minHeight: "500px",
}

// -- LEFT COLUMN --
const listColumn = {
    flex: "1 1 300px", // Grow, Shrink, Basis
    display: "flex",
    flexDirection: "column",
}

const headerStyle = {
    color: "#666",
    fontSize: "12px",
    letterSpacing: "2px",
    marginBottom: "20px",
    borderBottom: "1px solid #333",
    paddingBottom: "10px",
}

const listWrapper = {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
}

const itemStyle = {
    padding: "20px",
    borderLeft: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    borderRadius: "0 8px 8px 0",
}

// -- RIGHT COLUMN --
const previewColumn = {
    flex: "1 1 400px", // Takes slightly more space
    position: "relative",
}

const previewWindow = {
    position: "sticky",
    top: "40px", // Stays fixed while you scroll if list is long
    width: "100%",
    height: "400px",
    background: "#0a0a0a",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
}

const gridBg = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage:
        "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize: "20px 20px",
    zIndex: 0,
}

const contentWrapper = {
    position: "relative",
    zIndex: 2,
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
}

const catBadge = {
    fontSize: "10px",
    fontFamily: "monospace",
    border: "1px solid",
    padding: "4px 8px",
    borderRadius: "4px",
    marginBottom: "20px",
    background: "rgba(0,0,0,0.5)",
}

const previewTitle = {
    margin: 0,
    fontSize: "32px",
    color: "#fff",
    lineHeight: "1.1",
    marginBottom: "5px",
}

const previewOrg = {
    margin: 0,
    fontSize: "18px",
    color: "#888",
    fontWeight: "400",
    marginBottom: "20px",
}

const divider = {
    width: "50px",
    height: "4px",
    borderRadius: "2px",
    marginBottom: "20px",
}

const previewDesc = {
    color: "#ccc",
    fontSize: "14px",
    lineHeight: "1.6",
    marginBottom: "30px",
}

const statusBox = {
    display: "flex",
    flexDirection: "column",
    borderLeft: "2px solid #333",
    paddingLeft: "15px",
}

const scanOverlay = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
        "linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.02) 50%)",
    backgroundSize: "100% 4px",
    pointerEvents: "none",
    zIndex: 10,
}
