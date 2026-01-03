"use client"

import React from "react"

// EFFECTS
import FinanceFloat from "@/components/FinanceFloat"

// HEADER
import Header from "@/components/Header"

// HERO
import HeroFutureHire from "@/components/HeroFutureHire"

// SECTIONS
import ToolsTicker from "@/components/ToolsTicker"
import QuadGridLens from "@/components/Skills"
import ActiveTimeline from "@/components/ActiveTimeline"
import CredentialInspector from "@/components/CredentialInspector"

// UI / FX
import LiquidGlass from "@/components/LiquidGlass"
import ParallaxImage from "@/components/ParallaxImage"

// FOOTER DATA
import FooterData from "@/components/FooterData"

export default function Page() {
    return (
        <div
            style={{
                background: "#050505",
                color: "#ffffff",
                minHeight: "100vh",
                fontFamily: "'Inter', sans-serif",
                overflowX: "hidden",
                position: "relative",
            }}
        >
            {/* BACKGROUND FLOAT */}
            <FinanceFloat />

            {/* FIXED HEADER */}
            <Header theme="dark" />

            {/* PAGE CONTENT */}
            <main style={{ paddingTop: "64px", position: "relative", zIndex: 2 }}>
                {/* HERO */}
                <HeroFutureHire />

                {/* TOOLS */}
                <ToolsTicker />

                {/* SKILLS */}
                <section id="about" style={{ padding: "80px 0" }}>
                    <SectionHeader title="SKILLS" />
                    <QuadGridLens />
                </section>

                {/* EXPERIENCE */}
                <section style={{ padding: "80px 0" }}>
                    <SectionHeader title="PROFESSIONAL TIMELINE" />
                    <ActiveTimeline />
                </section>

                {/* EDUCATION */}
                <section id="education" style={{ padding: "80px 0" }}>
                    <SectionHeader title="CREDENTIALS" />
                    <CredentialInspector />
                </section>

                {/* CONTACT / CTA */}
                <section
                    id="contact"
                    style={{
                        padding: "120px 20px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <LiquidGlass width="800px">
                        <h2 style={{ fontSize: "32px", marginBottom: "16px" }}>
                            Let’s Build Something Impactful
                        </h2>

                        <p style={{ color: "#ccc", marginBottom: "32px" }}>
                            Finance, strategy, and execution — ready when you are.
                        </p>

                        {/* ACTION ROW */}
                        <div
                            style={{
                                display: "flex",
                                gap: "20px",
                                alignItems: "center",
                                justifyContent: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            {/* CONTACT BUTTON */}
                            <a
                                href="mailto:sethu.j4300@gmail.com"
                                style={{ textDecoration: "none" }}
                            >
                                <button
                                    style={{
                                        padding: "14px 32px",
                                        borderRadius: "100px",
                                        border: "none",
                                        background: "#4ade80",
                                        color: "#000",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                    }}
                                >
                                    CONTACT ME
                                </button>
                            </a>

                            {/* LINKEDIN ICON */}
                            <a
                                href="https://www.linkedin.com/in/sethuj4300/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "rgba(255,255,255,0.08)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                                    cursor: "pointer",
                                }}
                            >
                                {/* LinkedIn SVG */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="#0e6dc7ff"
                                    width="22"
                                    height="22"
                                >
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.367-1.85 3.598 0 4.263 2.368 4.263 5.455v6.286zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM6.813 20.452H3.861V9h2.952v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0z" />
                                </svg>
                            </a>
                        </div>
                    </LiquidGlass>
                </section>

                {/* FOOTER TERMINAL */}
                <FooterData theme="dark" />
            </main>
        </div>
    )
}

/* --------------------------------------- */

function SectionHeader({ title }) {
    return (
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <p
                style={{
                    fontSize: "12px",
                    letterSpacing: "3px",
                    color: "#666",
                    marginBottom: "10px",
                }}
            >
                {title}
            </p>
            <div
                style={{
                    width: "60px",
                    height: "3px",
                    background: "#10701dff",
                    margin: "0 auto",
                }}
            />
        </div>
    )
}
