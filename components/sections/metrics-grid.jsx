"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

function MetricValue({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 900;
    const start = performance.now();
    let frame = 0;

    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setDisplay(Math.round(value * progress));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function MetricsGrid() {
  const metrics = useMemo(
    () => [
      { value: 10, suffix: "+", label: "Years in Industry" },
      { value: 100, suffix: "+", label: "Sites Transformed" },
      { value: 5, suffix: "", label: "Countries" },
      { value: 3, suffix: "", label: "Continents of Delivery" },
    ],
    []
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <motion.article
          key={metric.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.45, delay: index * 0.07 }}
          whileHover={{ y: -2 }}
          className="executive-card p-5"
        >
          <p className="mb-2 text-4xl font-semibold leading-none text-[var(--accent)]">
            <MetricValue value={metric.value} suffix={metric.suffix} />
          </p>
          <p className="text-xs uppercase tracking-[0.14em] text-slate-600">{metric.label}</p>
        </motion.article>
      ))}
    </div>
  );
}
