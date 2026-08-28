"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion/tokens";
import { MessageCircle, Sparkles, X, ArrowRight } from "lucide-react";

/** Single global floating widget: AI audit + WhatsApp handoff. */
export function FloatingAssistant() {
  const [open, setOpen] = React.useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="fixed bottom-5 right-5 z-[200] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ duration: 0.22, ease: EASE.out }}
            className="glass w-[300px] origin-bottom-right overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border bg-surface-2/60 p-4">
              <span className="grid size-9 place-items-center rounded-full aurora-gradient text-white">
                <Sparkles className="size-4" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-medium text-fg">Vinayak</div>
                <div className="text-xs text-profit">● Typically replies in ~1 hour</div>
              </div>
            </div>
            <div className="space-y-3 p-4">
              <p className="text-sm text-muted">
                Want a fast read on where your brand should grow next?
              </p>
              <Link
                href="/ai-audit"
                className="flex items-center justify-between rounded-xl border border-border bg-surface-1 p-3 transition-colors hover:border-brand/50"
              >
                <span className="text-sm font-medium text-fg">Start the AI Growth Audit</span>
                <ArrowRight className="size-4 text-brand" />
              </Link>
              <a
                href="#"
                className="flex items-center justify-between rounded-xl border border-border bg-surface-1 p-3 transition-colors hover:border-profit/50"
              >
                <span className="text-sm font-medium text-fg">Chat on WhatsApp</span>
                <MessageCircle className="size-4 text-profit" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        aria-expanded={open}
        className={`grid size-14 place-items-center rounded-full aurora-gradient text-white shadow-xl transition-transform hover:scale-105 ${
          !open && !reduce ? "animate-float" : ""
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "chat"}
            initial={{ opacity: 0, rotate: -30 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 30 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
