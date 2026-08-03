"use client";

import { motion } from "framer-motion";
import { Calendar, Link2, Mail, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ContactSection() {
  const [problem, setProblem] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [kudoCount, setKudoCount] = useState(0);
  const [kudoDone, setKudoDone] = useState(false);

  useEffect(() => {
    fetch("/api/thumbsup")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && data.count > 0) setKudoCount(data.count);
      })
      .catch(() => {});
  }, []);

  const submitProblem = async (e) => {
    e.preventDefault();
    if (!problem.trim() || !email.trim()) {
      setStatus("Please fill in both fields.");
      return;
    }

    setSending(true);
    setStatus("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem, email }),
      });
      const data = await response.json();
      if (data.success) {
        setStatus("Got it - I will be in touch. Thank you.");
        setProblem("");
        setEmail("");
      } else {
        setStatus("Something went wrong. Please email nvignesh20@gmail.com directly.");
      }
    } catch {
      setStatus("Something went wrong. Please email nvignesh20@gmail.com directly.");
    } finally {
      setSending(false);
    }
  };

  const handleKudo = async () => {
    if (kudoDone) return;
    try {
      const response = await fetch("/api/thumbsup", { method: "POST" });
      const data = await response.json();
      setKudoCount(data.count || 0);
      setKudoDone(true);
    } catch {
      setKudoDone(true);
    }
  };

  return (
    <section id="connect" className="bg-white py-20">
      <div className="section-shell grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="executive-card p-6 md:p-8"
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Bring me your hard problems</p>
          <h2 className="mb-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">Describe the challenge</h2>
          <p className="mb-6 max-w-[66ch] text-sm leading-7 text-slate-600">
            Struggling with factory connectivity, OT/IT integration, or scaling IoT? Tell me what you are up against.
          </p>
          <form onSubmit={submitProblem} className="space-y-4">
            <textarea
              aria-label="Describe your challenge"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="e.g. We have 40 plants with no standardised data model..."
              className="h-32 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 outline-none transition focus:border-[var(--accent)]"
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                aria-label="Your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[var(--accent)]"
              />
              <button
                type="submit"
                disabled={sending}
                className="rounded-xl border border-transparent bg-[var(--accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--navy)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send it"}
              </button>
            </div>
          </form>
          <p className="mt-3 text-xs text-slate-500">No spam. Just a real conversation.</p>
          {status ? <p className="mt-3 text-sm text-slate-700">{status}</p> : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="space-y-3"
        >
          <a href="mailto:nvignesh20@gmail.com" className="executive-card flex items-start gap-3 p-4">
            <Mail size={18} className="mt-0.5 text-[var(--accent)]" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Send an email</h3>
              <p className="text-sm text-slate-600">nvignesh20@gmail.com</p>
            </div>
          </a>

          <a href="https://linkedin.com/in/vignesh-nagarajan" target="_blank" rel="noreferrer" className="executive-card flex items-start gap-3 p-4">
            <Link2 size={18} className="mt-0.5 text-[var(--accent)]" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-semibold text-slate-900">LinkedIn</h3>
              <p className="text-sm text-slate-600">Connect and endorse</p>
            </div>
          </a>

          <a href="https://cal.com/vignesh-nagarajan-pwlq2z" target="_blank" rel="noreferrer" className="executive-card flex items-start gap-3 p-4">
            <Calendar size={18} className="mt-0.5 text-[var(--accent)]" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Book a coffee chat</h3>
              <p className="text-sm text-slate-600">30 min - no agenda needed</p>
            </div>
          </a>

          <button
            type="button"
            onClick={handleKudo}
            className="executive-card w-full cursor-pointer text-left p-4"
            aria-label="Give a thumbs up"
          >
            <div className="flex items-start gap-3">
              <ThumbsUp size={18} className="mt-0.5 text-[var(--accent)]" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Give a thumbs up</h3>
                <p className="text-sm text-slate-600">
                  {kudoCount > 0
                    ? `${kudoCount} ${kudoCount === 1 ? "person appreciates" : "people appreciate"} this.`
                    : "Appreciate the work? Let me know."}
                </p>
              </div>
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
