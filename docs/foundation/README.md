# Foundation — Build Setup

The bridge between the **strategy blueprint** (`/docs/00–08`) and the codebase.
Everything here is derived from those documents, which remain the source of truth.

> **Status:** Foundation only. Folder structure, stack, component contracts,
> tokens, naming and roadmap are defined. **No pages or feature code are built yet.**

## Read in this order

| # | Document | Answers |
|---|----------|---------|
| 01 | [Tech Stack](./01-tech-stack.md) | What we build with, and why |
| 02 | [Folder Structure](./02-folder-structure.md) | Where everything lives |
| 03 | [Component Library](./03-component-library.md) | The reusable components + their contracts |
| 04 | [Design Tokens](./04-design-tokens.md) | The single source of truth for style values |
| 05 | [Naming Conventions](./05-naming-conventions.md) | How we name files, components, props, tokens, branches |
| 06 | [Implementation Roadmap](./06-implementation-roadmap.md) | The build order, phase by phase |

## Traceability to the blueprint

| Foundation doc | Derived from |
|----------------|--------------|
| Tech Stack | `07-implementation-plan.md` §1 |
| Folder Structure | `01-information-architecture.md`, `03-component-hierarchy.md` |
| Component Library | `03-component-hierarchy.md` |
| Design Tokens | `02-design-system.md`, `04-animation-plan.md` |
| Naming Conventions | new (build standard) |
| Roadmap | `07-implementation-plan.md` §3 |

## Companion artifacts created alongside these docs

- The physical folder tree under `/src`, `/public`, `/tests`, `/.storybook`.
- `src/styles/tokens/tokens.json` — the machine-readable token source (data, not code).
- `.gitkeep` files preserving empty scaffold directories.
- `README.md` manifests inside key folders listing what belongs there.
