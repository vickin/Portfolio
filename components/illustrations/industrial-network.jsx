"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { id: "factory", x: 44, y: 196, label: "Factory" },
  { id: "machines", x: 120, y: 156, label: "Machines" },
  { id: "sensors", x: 196, y: 120, label: "Sensors" },
  { id: "edge", x: 274, y: 98, label: "Edge" },
  { id: "cloud", x: 354, y: 116, label: "Cloud" },
  { id: "ai", x: 436, y: 144, label: "AI" },
  { id: "insights", x: 522, y: 102, label: "Business Insights" },
];

const links = [
  [nodes[0], nodes[1]],
  [nodes[1], nodes[2]],
  [nodes[2], nodes[3]],
  [nodes[3], nodes[4]],
  [nodes[4], nodes[5]],
  [nodes[5], nodes[6]],
  [nodes[2], nodes[4]],
];

export default function IndustrialNetwork() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="executive-card hero-network-glow relative overflow-hidden p-4 md:p-6">
      <svg
        viewBox="0 0 580 240"
        role="img"
        aria-label="Industrial network from factory sensors to cloud AI and business insights"
        className="h-[230px] w-full"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1f5ecf" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#1f5ecf" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1f5ecf" stopOpacity="0.18" />
          </linearGradient>
        </defs>

        <rect x="14" y="20" width="552" height="200" rx="14" fill="rgba(255,255,255,0.38)" stroke="rgba(31,94,207,0.08)" />

        {links.map(([from, to], index) => (
          <motion.line
            key={`${from.id}-${to.id}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="url(#lineGradient)"
            strokeWidth="1.25"
            strokeDasharray="5 12"
            initial={{ strokeDashoffset: 180 }}
            animate={{ strokeDashoffset: reduceMotion ? 180 : 0 }}
            transition={{ duration: 3.4, repeat: reduceMotion ? 0 : Infinity, ease: "linear", delay: index * 0.18 }}
          />
        ))}

        {nodes.map((node, index) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="8"
              fill="#ffffff"
              stroke="#1f5ecf"
              strokeWidth="1.4"
              initial={{ opacity: 0.82, scale: 1 }}
              animate={{ opacity: reduceMotion ? 0.9 : [0.82, 1, 0.82], scale: reduceMotion ? 1 : [1, 1.08, 1] }}
              transition={{ duration: 2.6, repeat: reduceMotion ? 0 : Infinity, delay: index * 0.16 }}
            />
            <text x={node.x + 13} y={node.y + 4} fill="#10203e" fontSize="11" fontFamily="var(--font-display)">
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
