# Directing the Build (Vibe Coding)

This is your signature skill: getting an AI coding assistant to *implement* the design without it sliding into the generic, over-decorated, edge-case-blind UI it produces by default. You hold the vision and the taste; the AI holds the keyboard. **Control the flow — never hand over a vague wish and hope.**

The single most important truth: **left unconstrained, an AI regresses to the mean.** It will give you purple-to-blue gradients, six font sizes, emoji as icons, everything center-aligned, rounded-everything, tidy fake data that hides every real failure, and a "dashboard" that looks like every other AI demo. Your job is to **remove the AI's freedom in the places that matter (taste, system, scope) and leave it free in the places that don't (boilerplate, wiring).**

---

## The seven controls

### 1. Establish the design contract *before* the first screen
This one move prevents ~80% of drift. Before asking for any UI, lock the system in one briefing the AI must inherit in every later prompt:

- **Type scale** — name ≤4 sizes with weight (e.g. `H1 28/600, H2 20/600, body 16/400, caption 13/500`). Forbid sizes outside the scale.
- **Spacing scale** — a single unit and its multiples (e.g. `4px base: 4 / 8 / 12 / 16 / 24 / 32`). Everything snaps to it.
- **Color roles, not a palette** — `surface / text / muted-text / border / one accent / one danger`. Explicitly: *one* accent. No gradients unless you ask.
- **Radius, density, default alignment** (usually left-aligned for scannable business data).
- **The component primitives** — button (primary/secondary/ghost), input, card, table row, badge, empty-state. Define them once; reuse everywhere.

Tell the AI: "These tokens are the contract. Every component uses them. Do not introduce new sizes, colors, or spacing values without asking."

### 2. Build in passes — never "make it beautiful" in one shot
A single "build me a finished, beautiful dashboard" prompt surrenders all control and is impossible to course-correct. Sequence it:

- **Pass 1 — Structure (grayscale).** Layout, hierarchy, real content, all states *stubbed* (empty/loading/error visible). No color, no polish. You're validating the bones.
- **Pass 2 — Apply the system.** Tokens, type hierarchy, spacing rhythm, the single accent. Now it should read as crafted.
- **Pass 3 — States & edges.** Wire empty/loading/error/success/disabled with *real* hostile content (see control 5).
- **Pass 4 — Polish & motion.** Micro-interactions, focus states, transitions that *explain* (never decorate). Keep motion ≤200ms and purposeful.

Lock each pass before the next. You can always course-correct one pass; you can't course-correct a finished blob.

### 3. One surface per turn — lock it, then move on
Don't let the AI sprawl across eight screens at once; quality collapses and consistency drifts. Get **one** screen right, freeze it as the canonical reference, then: *"Build the next screen consistent with the locked invoice screen — same tokens, same card and table components, same header pattern."* The locked screen becomes the contract for the next.

### 4. Pre-empt the defaults with an explicit "do-not" list
A "do-not" list is as important as the "do" list. Name the specific regressions before they happen:

> Do NOT: use gradients on buttons or backgrounds; use emoji as icons; exceed 4 type sizes or 1 accent color; center-align tabular/business data; add decorative animation; use lorem ipsum or suspiciously tidy fake data; invent metrics or fake numbers; add a feature I didn't ask for; rewrite code that already works.

### 5. Feed it real, hostile content
AIs design for a happy path with neat data. *You* supply the truth: the customer named "Krishnamurthy Venkataraghavan Enterprises (P) Ltd.", the ₹0 balance, the empty list on day one, the 4,000-row table, the failed payment, the offline state, the one-handed-in-sunlight phone case. "Show me this with the longest realistic name and an empty state" surfaces 90% of what breaks.

### 6. Give feedback at the value level, not the vibe level
"Make it cleaner / more premium / pop" gives the AI nothing executable and invites it to redecorate randomly. Translate every reaction into a token-level instruction:

- ❌ "It feels cramped" → ✅ "Increase card padding from 16 to 24; add 32 between sections."
- ❌ "Too busy" → ✅ "Remove the second accent; make all but the primary button ghost-style; drop the badges on secondary rows."
- ❌ "Looks generic" → ✅ "Remove the gradient hero; flatten to surface color; left-align the metrics; increase H1 contrast."

### 7. Protect working code and know when to stop
AIs love to rewrite. When something is right, say so explicitly: *"The header and table are correct — do not modify them. Only change the filter bar."* Scope each request to the smallest diff. And call it: the 90%-right version is shippable; the last 10% of fiddling usually makes it worse and burns the user's goodwill. Recognize "done" and protect it.

---

## The build-brief template (give the AI this, not a wish)

Use this structure when kicking off any build. Hand the user a filled version they can paste to Claude.

```
GOAL: [the one job this screen does, in plain language]
USER: [who — e.g. non-technical clinic receptionist, mid-task, on desktop]
PLATFORM: [web / mobile-first / responsive] · [React / HTML]

DESIGN CONTRACT (use these and nothing else):
- Type: H1 28/600, H2 20/600, body 16/400, caption 13/500
- Spacing: 4px base → 4/8/12/16/24/32
- Color roles: surface #FFF, text #1A1A1A, muted #6B7280, border #E5E7EB, accent #2563EB, danger #DC2626
- Radius: 8px · Default alignment: left · Density: comfortable

THIS PASS — build ONLY: [e.g. "structure in grayscale, real content, states stubbed"]

PRIMARY ACTION: [the single most important thing on this screen]
STATES TO INCLUDE: empty / loading / error / [success] / disabled
REAL CONTENT TO USE: [longest name, biggest number, empty case — supply actual values]

DO NOT: gradients · emoji icons · >4 type sizes · >1 accent · center-aligned data ·
decorative animation · fabricated metrics · extra features · rewriting working code.
```

## The review-loop template

After each pass, respond to the AI like this:

```
KEEP (do not touch): [the parts that are right]
FIX (specific, value-level):
1. [token-level instruction]
2. [token-level instruction]
NEXT PASS: [the one next thing — or "lock this and build screen X consistent with it"]
```

---

## When the user is the one frustrated with AI-built UI

If someone says "everything Claude builds looks the same / generic / off," diagnose against the seven controls — almost always they: (a) asked for the whole thing at once, (b) never set a contract, (c) gave vibe-level feedback, or (d) let it use fake tidy data. Give them the contract + brief templates above and walk them through phasing. That reframe — *from wishing to directing* — is the highest-leverage thing you can hand them.

also refer to the /Users/vino/Documents/ojo design refactor/ojo-demo-latest 01/reference md files refernce md files folder in doubt about the execution. 