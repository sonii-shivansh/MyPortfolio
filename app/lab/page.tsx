import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import LabConsole from "./LabConsole";
import "./lab.css";

export const metadata: Metadata = {
  title: "Systems Lab | Shivansh Soni",
  description: "Replay a fictional payment failure and test whether your consumer protects the ledger. An interactive backend engineering experiment by Shivansh Soni.",
};

export default function SystemsLabPage() {
  return (
    <div className="lab-page">
      <a className="lab-skip" href="#lab-main">Skip to experiment</a>
      <header className="lab-header lab-wrap">
        <Link href="/" className="lab-back"><ArrowLeft size={17} aria-hidden="true" /> Shivansh Soni</Link>
        <span className="lab-index"><span /> SYSTEMS LAB / 01</span>
      </header>
      <main id="lab-main" className="lab-wrap">
        <section className="lab-intro" aria-labelledby="lab-title">
          <div>
            <p className="lab-eyebrow">01 / PAYMENT DELIVERY</p>
            <h1 id="lab-title">One payment.<br /><em>Two deliveries.</em></h1>
          </div>
          <div className="lab-intro-copy">
            <p>The payment went through. The acknowledgement never arrived. Should the next attempt debit the account again?</p>
            <span>Interactive simulation · Fictional data</span>
          </div>
        </section>
        <LabConsole />
        <section className="lab-takeaway" aria-labelledby="lab-takeaway-title">
          <div>
            <p className="lab-eyebrow">THE ENGINEERING DECISION</p>
            <h2 id="lab-takeaway-title">Make the effect safe to repeat.</h2>
            <p>A broker retry solves delivery uncertainty. A stable event ID and an atomic ledger write protect the business outcome. A separate “already processed” check can still race with another consumer.</p>
          </div>
          <a href="https://github.com/sonii-shivansh/Vericore" className="lab-vericore">
            <span>OPEN SOURCE / VERICORE</span>
            <strong>Explore my work on evidence for software changes.</strong>
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </section>
      </main>
      <footer className="lab-wrap lab-footer"><Link href="/">Back to the portfolio</Link><span>Systems Lab / Experiment 01</span></footer>
    </div>
  );
}
