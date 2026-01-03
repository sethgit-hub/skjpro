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

// FOOTER DATA (NEW)
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

            {/* BACKGROUND FLOAT (GLOBAL) */}
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
                        <p style={{ color: "#ccc", marginBottom: "24px" }}>
                            Finance, strategy, and execution — ready when you are.
                        </p>
                        <button
                            style={{
                                padding: "14px 32px",
                                borderRadius: "100px",
                                border: "none",
                                background: "#4ade80",
                                color: "#000",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }}
                        >
                            CONTACT ME
                        </button>
                    </LiquidGlass>
                </section>

                {/* FINAL FOOTER — INTELLIGENT TERMINAL */}
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
                    background: "#4ade80",
                    margin: "0 auto",
                }}
            />
        </div>
    )
}
    