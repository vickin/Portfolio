"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

export default function MetricsGrid() {
  const reduceMotion = useReducedMotion();

  const metrics = useMemo(
    () => [
      { prefix: "$", value: "2.3", suffix: "M", label: "Tracked EBIT Impact" },
      { value: 100, suffix: "+", label: "Manufacturing Divisions" },
      { value: 19, suffix: "", label: "Sites Scaled in 9 Months" },
      { value: 10, suffix: "+", label: "Years in Industry 4.0" },
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
          whileHover={reduceMotion ? undefined : { y: -2 }}
          className="executive-card p-5 md:p-6"
        >
          <p className="mb-2 text-[2.65rem] font-semibold leading-none tracking-[-0.02em] text-[var(--accent)] md:text-5xl">
            <span className="tabular-nums">
              {metric.prefix}
              {metric.value}
              {metric.suffix}
            </span>
          </p>
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-600">{metric.label}</p>
        </motion.article>
      ))}
    </div>
  );
}
