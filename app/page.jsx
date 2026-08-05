import {
  BarChart3,
  Cloud,
  Cog,
  Cpu,
  Factory,
  Globe2,
  Network,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import IndustrialNetwork from "../components/illustrations/industrial-network";
import ContactSection from "../components/sections/contact-section";
import MetricsGrid from "../components/sections/metrics-grid";
import Reveal from "../components/ui/reveal";

const timeline = [
  {
    logo: "MI",
    company: "Magna International",
    years: "2024-Present",
    role: "IoT & Smart Factory Solutions Manager",
    impact:
      "Steering 3 AI/IoT use cases to $2.3M in tracked EBIT impact within a $19.7M programme independently validated by McKinsey; grew the India CoE from 3 to 17 people.",
    tags: ["Industrial AI", "IIoT", "CoE Leadership"],
    current: true,
  },
  {
    logo: "MI",
    company: "Magna International",
    years: "2023-24",
    role: "Regional Industry 4.0 Lead, Europe",
    impact:
      "Scaled IoT to 85% of European plants in 9 months across 19 Body & Chassis sites, standardising factory data models on MQTT and Unified Namespace.",
    tags: ["Industry 4.0", "MQTT/UNS", "Programme Lead"],
  },
  {
    logo: "AZ",
    company: "Amazon",
    years: "2021-23",
    role: "Systems Development Engineer II",
    impact:
      "Took robotics and automation from prototype to production across 5 European fulfilment sites - 40% cost savings, 20% faster deployment.",
    tags: ["Robotics", "Automation", "Systems"],
  },
  {
    logo: "AZ",
    company: "Amazon",
    years: "2020-21",
    role: "Automation Engineer / SME Control Systems",
    impact:
      "Delivered automation upgrades generating €800K+ in infrastructure savings while restoring peak-season throughput.",
    tags: ["Controls", "SCADA", "Automation"],
  },
  {
    logo: "EC",
    company: "Early Career, Italy",
    years: "2016-19",
    role: "MES, Automation & Controls Engineer",
    impact:
      "Built ISA-95 Level 0-4 foundations across Cannon Automata, Whirlpool, P&C Automation, and Autoware - PLC commissioning, SCADA, and MES rollouts in automotive and appliance manufacturing.",
    tags: ["MES", "SCADA", "PLC"],
    muted: true,
  },
];

const capabilities = [
  {
    icon: Factory,
    title: "Digital Manufacturing Strategy",
    description: "Turning plant-level pain points into funded, prioritised Industry 4.0 and AI roadmaps.",
  },
  {
    icon: Network,
    title: "OT/IT Integration",
    description: "Standardising factory data models on MQTT, Unified Namespace, and ISA-95 for consistent OT/IT data flow.",
  },
  {
    icon: Cpu,
    title: "Applied Industrial AI",
    description: "Condition-based monitoring, real-time SPC, and predictive maintenance use cases proven on the shop floor.",
  },
  {
    icon: Cloud,
    title: "Data & Visibility Platforms",
    description: "Grafana and Power BI observability giving plant teams real-time, self-serve production visibility.",
  },
  {
    icon: Users,
    title: "Centre of Excellence Leadership",
    description: "Built and scaled a delivery organisation from 3 to 17 across engineers, analysts, and partners.",
  },
  {
    icon: Workflow,
    title: "Executive Programme Delivery",
    description: "Engaging Directors and VPs to prioritise, fund, and scale programmes across 100+ divisions.",
  },
];

const nowItems = [
  {
    label: "Active · Magna Global",
    title: "Scaling to 200+ divisions",
    text: "Deploying real-time production observability across Magna's global manufacturing divisions, scaling toward 200+ by end of 2026.",
  },
  {
    label: "Building · India CoE",
    title: "Smart Factory Centre of Excellence",
    text: "Leading a 17-person Centre of Excellence - engineers, analysts, and partners - grown from 3 in two years.",
  },
  {
    label: "Learning · Certifications",
    title: "OT Cybersecurity & Cloud Architecture",
    text: "Pursuing ISA CSSA and Azure Industrial IoT credentials to complement operational depth.",
  },
  {
    label: "Thinking · Next chapter",
    title: "VP / Global DX Lead in Europe",
    text: "Actively exploring principal-level digital transformation advisory roles at multinationals.",
  },
];

const projects = [
  {
    title: "Global Plant Visibility Programme",
    teaser: "Grafana observability connecting machine-level data to plant and executive decisions across global factories.",
  },
  {
    title: "Smart Factory Rollout Playbook",
    teaser: "The MQTT/Unified Namespace data-standardisation model that scaled IoT to 85% of European plants in 9 months.",
  },
  {
    title: "Industrial AI to EBIT Impact",
    teaser: "Condition-based monitoring, SPC, and invoice automation use cases behind $2.3M in McKinsey-validated EBIT impact.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/88 backdrop-blur">
        <div className="section-shell flex h-16 items-center justify-between">
          <p className="font-[var(--font-display)] text-sm font-semibold tracking-[0.08em] text-slate-900">Vignesh Nagarajan</p>
          <nav aria-label="Primary" className="hidden gap-6 text-xs uppercase tracking-[0.12em] text-slate-600 md:flex">
            <a href="#metrics" className="transition hover:text-[var(--accent)]">Metrics</a>
            <a href="#journey" className="transition hover:text-[var(--accent)]">Experience</a>
            <a href="#capabilities" className="transition hover:text-[var(--accent)]">Capabilities</a>
            <a href="#connect" className="transition hover:text-[var(--accent)]">Connect</a>
          </nav>
        </div>
      </header>

      <section className="grid-blueprint border-b border-[var(--line)] py-16 md:py-24">
        <div className="section-shell grid items-start gap-12 lg:grid-cols-[1.04fr_0.96fr]">
          <Reveal>
            <div className="reading-width">
              <p className="mb-5 inline-flex items-center rounded-full border border-slate-200 bg-[var(--surface-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                Open to relocation · Europe preferred
              </p>
              <h1 className="text-balance mb-5 text-5xl font-semibold leading-[0.9] tracking-[-0.03em] text-slate-950 md:text-[4.8rem]">
                Vignesh Nagarajan
              </h1>
              <p className="mb-4 text-xs uppercase tracking-[0.17em] text-slate-500">Smart Factory & Digital Manufacturing Leader · Industry 4.0 · Industrial AI</p>
              <p className="text-pretty mb-8 max-w-[68ch] text-[1.03rem] leading-8 text-slate-600">
                I turn shop-floor pain points into funded, scalable Industry 4.0 and AI programmes - delivering $2.3M+ in tracked EBIT impact across 100+ manufacturing divisions in Europe, North America, and China.
              </p>
              <div className="mb-8 flex flex-wrap gap-3">
                <a href="#connect" className="rounded-xl border border-transparent bg-[var(--accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--accent-strong)]">
                  Let&apos;s connect
                </a>
                <a href="#projects" className="rounded-xl border border-[var(--accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)] transition hover:bg-[var(--accent-soft)]">
                  View my work
                </a>
              </div>
              <div className="mb-5 executive-card flex w-fit items-center gap-4 p-3 pr-4">
                <div className="h-14 w-14 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                  <Image src="/profile.png" alt="Vignesh Nagarajan" width={56} height={56} className="h-full w-full object-cover" priority />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Chennai, India</p>
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Available Globally</p>
                </div>
              </div>

              <div className="grid gap-2 text-[11px] uppercase tracking-[0.14em] text-slate-500 sm:grid-cols-3">
                <div className="executive-card flex items-center gap-2 px-3 py-2"><Target size={14} className="text-[var(--accent)]" /> Industry 4.0</div>
                <div className="executive-card flex items-center gap-2 px-3 py-2"><TrendingUp size={14} className="text-[var(--accent)]" /> Global Delivery</div>
                <div className="executive-card flex items-center gap-2 px-3 py-2"><Sparkles size={14} className="text-[var(--accent)]" /> AI + Operations</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <IndustrialNetwork />
          </Reveal>
        </div>
      </section>

      <section id="problem" className="section-band-white border-b border-[var(--line)] py-24">
        <div className="section-shell">
          <Reveal className="reading-width">
            <p className="section-kicker">Problem statement</p>
            <h2 className="section-title">
              Digital transformation stalls at the gap between the shop floor and the boardroom.
            </h2>
            <p className="section-body text-pretty">
              The barrier is rarely the technology itself. It is translating plant-level pain points - across decentralised, multi-process manufacturing environments - into funded, scalable programmes that both operators and executives trust. That translation is where I operate, adapting each solution to a facility's specific operational, data, and organisational realities rather than forcing a uniform approach.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="metrics" className="section-band-light border-b border-[var(--line)] py-24">
        <div className="section-shell">
          <Reveal className="mb-8 reading-width">
            <p className="section-kicker">Metrics</p>
            <h2 className="section-title">Executive scale in numbers</h2>
          </Reveal>
          <MetricsGrid />
        </div>
      </section>

      <section id="journey" className="section-band-white border-b border-[var(--line)] py-24">
        <div className="section-shell">
          <Reveal className="mb-8 reading-width">
            <p className="section-kicker">Experience timeline</p>
            <h2 className="section-title">Career path</h2>
          </Reveal>
          <div className="relative border-l border-slate-200/90 pl-1 md:pl-2">
            {timeline.map((item, index) => (
              <Reveal key={item.role} delay={index * 0.04} className="relative mb-4 pl-8 md:pl-9">
                <article
                  className={`executive-card p-5 md:p-6 ${item.current ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "bg-white"} ${item.muted ? "opacity-65" : ""}`}
                >
                  <div className="absolute -left-[1.22rem] top-6 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[11px] font-semibold tracking-wide text-slate-700 shadow-[0_2px_8px_rgba(15,23,42,0.08)]">
                    {item.logo}
                  </div>
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <h3 className="text-base font-semibold text-slate-900">{item.company}</h3>
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{item.years}</p>
                  </div>
                  <p className="mb-1 text-sm font-medium text-slate-800 md:text-[0.96rem]">{item.role}</p>
                  <p className="mb-4 text-sm leading-7 text-slate-600">{item.impact}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="section-band-dark border-b border-[#12284a] py-24">
        <div className="section-shell">
          <Reveal className="mb-8 reading-width">
            <p className="section-kicker">Capabilities</p>
            <h2 className="section-title">Where shop-floor operations, data, AI, and executive strategy meet</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.03}>
                  <article className="executive-card border-[#1d3e6f] bg-[#10254a] p-5 md:p-6 hover:border-[#325f9f] hover:bg-[#132c56]">
                    <Icon size={18} className="mb-3 text-[#8fb8ff]" aria-hidden="true" />
                    <h3 className="mb-2 text-base font-semibold text-[#edf3ff]">{item.title}</h3>
                    <p className="text-sm leading-7 text-[#b7c6df]">{item.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="now" className="section-band-white border-b border-[var(--line)] py-24">
        <div className="section-shell">
          <Reveal className="mb-8 reading-width">
            <p className="section-kicker">Current focus</p>
            <h2 className="section-title">Right now</h2>
            <p className="section-body text-sm">Live bets, active builds, and things occupying my thinking.</p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {nowItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <article className="executive-card p-5 md:p-6">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{item.label}</p>
                  <h3 className="mb-2 text-[1.03rem] font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section-band-light border-b border-[var(--line)] py-24">
        <div className="section-shell">
          <Reveal className="mb-8 reading-width">
            <p className="section-kicker">Projects teaser</p>
            <h2 className="section-title">Strategic workstreams</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.04}>
                <article className="executive-card p-5 md:p-6">
                  <div className="mb-3 flex items-center gap-2 text-[var(--accent)]">
                    <BarChart3 size={16} aria-hidden="true" />
                    <Cog size={16} aria-hidden="true" />
                    <Globe2 size={16} aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-[1.03rem] font-semibold text-slate-900">{project.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{project.teaser}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />

      <footer className="bg-[var(--bg)] py-8">
        <div className="section-shell flex flex-col items-center justify-between gap-2 border-t border-[var(--line)] pt-6 text-center text-sm text-slate-600 md:flex-row md:text-left">
          <p>
            <strong className="font-semibold text-slate-900">Vignesh Nagarajan</strong> · Smart Factory & Digital Manufacturing Leader
          </p>
          <p>Chennai, India · Open to Europe</p>
        </div>
      </footer>
    </main>
  );
}
