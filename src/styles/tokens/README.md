# styles/tokens/

**`tokens.json`** is the single source of truth for every style value
(color, type, space, radius, elevation, motion, z, breakpoints).

Pipeline (built in roadmap Phase 1):
```
tokens.json ──► tokens.css (:root CSS variables) ──► Tailwind theme ──► components
```

Rules: edit values here only; no raw hex/px/ms in components; emerald = profit/positive
only; aurora gradient is an accent, never a text background. Full spec:
`docs/foundation/04-design-tokens.md` and `docs/02-design-system.md`.
