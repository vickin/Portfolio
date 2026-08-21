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
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const syncOwnerMode = async () => {
      const params = new URLSearchParams(window.location.search);
      const ownerToken = params.get("owner");

      if (ownerToken) {
        try {
          const response = await fetch("/api/owner-mode", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: ownerToken }),
          });

          if (response.ok) {
            params.delete("owner");
            const nextQuery = params.toString();
            const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}${window.location.hash}`;
            window.history.replaceState({}, "", nextUrl);
          }
        } catch {
        }
      }

      try {
        const response = await fetch("/api/thumbsup");
        const data = response.ok ? await response.json() : null;

        if (data && data.count > 0) setKudoCount(data.count);
        if (data && data.isOwner) {
          setIsOwner(true);
          setKudoDone(true);
        }
      } catch {
      }
    };

    syncOwnerMode();
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
        setStatus(data.error || "Something went wrong. Please email nvignesh20@gmail.com directly.");
      }
    } catch {
      setStatus("Something went wrong. Please email nvignesh20@gmail.com directly.");
    } finally {
      setSending(false);
    }
  };

  const handleKudo = async () => {
    if (kudoDone || isOwner) return;
    try {
      const response = await fetch("/api/thumbsup", { method: "POST" });
      const data = await response.json();
      setKudoCount(data.count || 0);
      if (data.isOwner) setIsOwner(true);
      setKudoDone(true);
    } catch {
      setKudoDone(true);
    }
  };

  return (
    <section id="connect" className="section-band-white py-24">
      <div className="section-shell grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="executive-card p-6 md:p-8"
        >
          <p className="section-kicker">Bring me your hard problems</p>
          <h2 className="section-title max-w-[16ch] text-slate-900">Describe the challenge</h2>
          <p className="mb-6 max-w-[66ch] text-sm leading-7 text-slate-600 md:text-[0.96rem]">
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
          <p className="mt-3 text-xs uppercase tracking-[0.11em] text-slate-500">No spam. Just a real conversation.</p>
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

          <a href="https://www.linkedin.com/in/nvignesh20" target="_blank" rel="noreferrer" className="executive-card flex items-start gap-3 p-4">
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
            className="executive-card w-full cursor-pointer text-left p-4 disabled:cursor-not-allowed disabled:opacity-70"
            aria-label="Give a thumbs up"
            disabled={isOwner}
          >
            <div className="flex items-start gap-3">
              <ThumbsUp size={18} className="mt-0.5 text-[var(--accent)]" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Give a thumbs up</h3>
                <p className="text-sm text-slate-600">
                  {isOwner
                    ? "Owner mode is active on this browser. Your likes are excluded from the count."
                    : kudoCount > 0
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
