"use client";

/**
 * CloudTopology — users → applications → API → services → database, with the
 * API tier and everything behind it enclosed in a cloud region boundary, and a
 * primary/standby service pair joined by a failover link. The redundancy is the
 * point: a topology without a second node is a diagram of a prototype.
 *
 * Non-obvious decision: every edge is a straight segment, and packets are
 * <circle>s whose cx/cy sit at the edge origin while only `x`/`y` (CSS
 * transform, compositor-only) are animated to the delta. That avoids
 * `offset-path`, which Safari still renders inconsistently on SVG children, and
 * keeps the whole thing on the compositor rather than re-laying-out attributes.
 */

import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE, staggerDelay } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

const NODES = [
  { id: "users", label: "USERS", note: "WEB / MOBILE", cx: 62, cy: 150, above: false },
  { id: "apps", label: "APPS", note: "STOREFRONT", cx: 190, cy: 150, above: false },
  { id: "api", label: "API", note: "GATEWAY", cx: 318, cy: 150, above: false, hub: true },
  { id: "svc-a", label: "SERVICE", note: "PRIMARY", cx: 452, cy: 92, above: true },
  { id: "svc-b", label: "SERVICE", note: "STANDBY", cx: 452, cy: 208, above: false },
  { id: "db", label: "DATABASE", note: "MANAGED", cx: 588, cy: 150, above: false },
] as const;

/** x1, y1, x2, y2 */
const EDGES: [number, number, number, number][] = [
  [110, 150, 142, 150],
  [238, 150, 270, 150],
  [366, 150, 404, 92],
  [366, 150, 404, 208],
  [500, 92, 540, 150],
  [500, 208, 540, 150],
];

const CW = 96;
const CH = 40;

export function CloudTopology({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 660 300" className={cn("h-auto w-full", className)} role="img"
      aria-labelledby="topology-title">
      <title id="topology-title">
        Cloud topology: users reach the applications, which call an API gateway
        inside a cloud region. The gateway routes to a primary service with a
        standby replica for failover, and both read from a managed database.
      </title>

      {/* cloud region boundary */}
      <g aria-hidden="true">
        <rect x={266} y={36} width={378} height={244} rx={14} fill="none"
          stroke="var(--color-border-strong)" strokeWidth={1} strokeDasharray="4 6" />
        <text x={274} y={26} className="font-mono" fontSize={9} letterSpacing="0.16em"
          fill="var(--color-faint)">
          CLOUD REGION
        </text>
      </g>

      {/* edges + direction marks */}
      <g aria-hidden="true">
        {EDGES.map(([x1, y1, x2, y2], i) => {
          const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-border-strong)" strokeWidth={1} />
              <polygon
                points="0,-2.6 5.5,0 0,2.6"
                fill="var(--color-border-strong)"
                transform={`translate(${x1 + (x2 - x1) * 0.84},${y1 + (y2 - y1) * 0.84}) rotate(${a})`}
              />
            </g>
          );
        })}
      </g>

      {/* failover link between the paired services */}
      <g aria-hidden="true">
        <line x1={452} y1={112} x2={452} y2={188} stroke="var(--color-brand-2)" strokeWidth={1}
          strokeDasharray="3 4" opacity={0.75} />
        <text x={462} y={153} className="font-mono" fontSize={9} letterSpacing="0.14em"
          fill="var(--color-faint)">
          FAILOVER
        </text>
      </g>

      {/* packets */}
      {!reduce && (
        <g aria-hidden="true">
          {EDGES.map(([x1, y1, x2, y2], i) => (
            <motion.circle
              key={i}
              cx={x1} cy={y1} r={2.5} fill="var(--color-brand)"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: [0, x2 - x1], y: [0, y2 - y1], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1.5,
                ease: EASE.inOut,
                repeat: Infinity,
                repeatDelay: 1.3,
                delay: staggerDelay(i, EDGES.length) * 4,
              }}
            />
          ))}
        </g>
      )}

      {/* nodes */}
      {NODES.map((n, i) => (
        <motion.g
          key={n.id}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.reveal, ease: EASE.out, delay: staggerDelay(i, NODES.length) }}
        >
          <rect
            x={n.cx - CW / 2} y={n.cy - CH / 2} width={CW} height={CH} rx={8}
            fill="var(--color-surface-1)"
            stroke={"hub" in n && n.hub ? "var(--color-brand)" : "var(--color-border-strong)"}
            strokeWidth={"hub" in n && n.hub ? 1.4 : 1}
          />
          <text
            x={n.cx} y={n.cy + 4} textAnchor="middle" className="font-mono"
            fontSize={11} letterSpacing="0.06em" fill="var(--color-fg)"
          >
            {n.label}
          </text>
          <text
            x={n.cx} y={n.above ? n.cy - 28 : n.cy + 32} textAnchor="middle" className="font-mono"
            fontSize={9} letterSpacing="0.1em" fill="var(--color-faint)"
          >
            {n.note}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
