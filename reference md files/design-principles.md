# Design Principles — Apple-Grade Craft for the Common Man

Two parts: the **philosophy** (Apple's principles translated for everyday SMB users) and the **craft checklist** (the concrete UI details that separate "made by a designer" from "made in a hurry").

---

## Part 1 — The philosophy

### What "Apple-grade" actually means (and what it doesn't)
Apple's enduring principles, stripped of the flagship gloss, are: **clarity** (the user always knows what's happening and what to do), **deference** (the interface gets out of the way of the content/task), **restraint** (nothing is there that doesn't earn its place), **honesty** (the UI tells the truth — no fakery, no dark patterns), and **"it just works"** (the complexity is absorbed by the design, not dumped on the user).

What it does **not** mean for your audience: ornate visuals, heavy animation, glassmorphism for its own sake, or "premium" as in expensive-looking. **For the common man, premium = fast, obvious, forgiving, and calm.** A clinic receptionist doesn't want a beautiful app; she wants to book the patient before the phone rings again. The highest craft is invisible.

### Design for the worst moment, not the demo
Your user is rarely calm and focused. Assume:
- **Interrupted** — they'll leave mid-task and return; don't lose their work, show them where they were.
- **Anxious** — it's their money, their customer, their reputation. Reduce the fear: confirm before destructive actions, make undo obvious, show clear success.
- **Hostile environment** — cheap or cracked phone, sunlight, gloves, one hand, weak signal. Big targets, high contrast, offline-tolerance.
- **Untrained** — they never onboarded and never will. The UI must teach itself in context.
- **Time-poor** — every extra tap is a tax on someone running a business alone.

### Who the SMB user really is
Not a tidy persona. Often the **owner is the buyer is the user** — no IT department, no admin, no training budget. They're price-sensitive and switching is real friction, so:
- **Time-to-first-value is everything.** They must do something useful within minutes or they're back to pen-and-paper, Excel, or WhatsApp — your true competitors.
- **Trust is the product.** You hold their money and their customers. One data-loss scare or one confusing charge and they're gone for good.
- **Breadth loses to obviousness.** They'd rather have five features that are dead-simple than fifty they can't find.

### The two goals, every time
Name the **user goal** and the **business goal** on every screen. For SMB software the business goal is usually one of: activate fast, build trust, prevent churn-to-spreadsheet, or earn the upsell *honestly*. If a design serves only one goal, that's a finding.

---

## Part 2 — The UI craft checklist

The amateur signal is almost always in the small things. Sweat these.

### Typography
- **≤4 type sizes** on a screen. More than that and hierarchy collapses into noise.
- Establish a scale with intent (e.g. 28/20/16/13) and *weight* doing as much work as size.
- **Body ≥16px** — your users' eyes are older and their screens are worse than yours.
- Set generous line-height (~1.5 for body); don't let lines run past ~70 characters.
- One typeface is usually plenty. A second only if it earns its keep.

### Spacing & layout
- **Snap everything to one spacing scale** (4px base → 4/8/12/16/24/32). Inconsistent spacing is the #1 amateur tell.
- Use whitespace as structure — grouping by proximity beats borders and boxes.
- **Left-align business/tabular data** for scannability; reserve center for short, symmetric, hero-type content only.
- Establish a clear grid; align optically, not just mathematically (icons and text often need a nudge).

### Color
- **One accent color.** It marks the primary action and nothing else, so it stays meaningful. A rainbow of accents means none of them lead the eye.
- Color *roles*: surface, text, muted text, border, accent, danger, success. That's usually all you need.
- **Gradients are a smell** in business UI — they read as decorative and dated. Default to flat surfaces.
- Don't carry meaning by color alone (color-blind users, sunlight); pair it with text/icon/shape.

### Contrast & real-world legibility
- Hit WCAG AA at minimum (4.5:1 body, 3:1 large) — but go further because of cheap screens and sunlight.
- Touch targets **≥44px**; spacing between them so a thumb doesn't mis-tap.
- Don't rely on hover for anything essential — half your users are on touch.

### States — the most-skipped, most-telling work
Every interactive surface needs the full set, designed deliberately, not as an afterthought:
- **Empty** — the most important and most neglected. Day-one users live here; it should *teach and invite the first action*, not show a sad blank.
- **Loading** — skeletons over spinners where possible; never freeze with no feedback.
- **Error** — say what happened *and what to do next*, in plain language, near where it happened.
- **Success** — confirm clearly; for an anxious SMB user this is reassurance, not decoration.
- **Disabled** — and say *why* it's disabled if it isn't obvious.

### Motion
- Motion must **explain** (where did this come from, where did it go) — never decorate.
- Keep it fast (≤200ms) and subtle. Heavy or constant animation reads as a toy, which is fatal for software handling someone's livelihood.
- Respect reduced-motion preferences.

### Forgiveness & feedback
- Confirm destructive/irreversible actions; offer undo wherever you can.
- Acknowledge every action immediately — the user should never wonder "did that work?"
- Preserve work across interruptions; autosave; remember where they were.

---

## Separating durable principles from fashion
Hierarchy, contrast, feedback, consistency, restraint, reducing cognitive load — **timeless.** A specific border-radius vibe, the blur-of-the-month, the trendy gradient — **fashion.** When asked "what's modern," web-search recent credible sources, then tell the person which of your advice is a durable law and which is a passing style choice tied to *their* user and goal. Never recommend a trend just because it's current — and for anxious, time-poor SMB users, trend-chasing usually costs more clarity than it buys.
