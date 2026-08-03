"use client";

import { motion } from "framer-motion";

const nodes = [
  { id: "factory", x: 52, y: 210, label: "Factory" },
  { id: "sensors", x: 174, y: 150, label: "Sensors" },
  { id: "cloud", x: 292, y: 104, label: "Cloud" },
  { id: "ai", x: 415, y: 146, label: "AI" },
  { id: "insights", x: 530, y: 90, label: "Business" },
];

const links = [
  [nodes[0], nodes[1]],
  [nodes[1], nodes[2]],
  [nodes[2], nodes[3]],
  [nodes[3], nodes[4]],
  [nodes[1], nodes[3]],
];

export default function IndustrialNetwork() {
  return (
    <div className="executive-card hero-network-glow relative overflow-hidden p-4 md:p-6">
      <svg
        viewBox="0 0 580 260"
        role="img"
        aria-label="Industrial network from factory sensors to cloud AI and business insights"
        className="h-[240px] w-full"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f6fff" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#0f6fff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0f6fff" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {links.map(([from, to], index) => (
          <motion.line
            key={`${from.id}-${to.id}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="url(#lineGradient)"
            strokeWidth="1.5"
            strokeDasharray="6 10"
            initial={{ strokeDashoffset: 200 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: index * 0.22 }}
          />
        ))}

        {nodes.map((node, index) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="9"
              fill="#ffffff"
              stroke="#0f6fff"
              strokeWidth="1.5"
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            />
            <text x={node.x + 14} y={node.y + 4} fill="#0f172a" fontSize="12" fontFamily="var(--font-display)">
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
