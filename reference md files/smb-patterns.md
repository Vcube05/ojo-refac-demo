# SMB B2B Patterns & Anti-Patterns

Concrete, reusable patterns for software aimed at non-technical small/medium-business users — and the specific anti-patterns (both human- and AI-generated) that quietly wreck these products.

---

## Patterns that work

### The dashboard / home screen
- **Lead with "what do I need to do now,"** not vanity metrics. An owner opening the app at 8am wants today's jobs / unpaid invoices / appointments — an action queue, not a chart wall.
- One clear primary action visible without scrolling (e.g. "New invoice", "Add appointment").
- Charts only if the user actually decides something from them. SMB owners rarely need analytics theatre; they need *the next action*.
- Make the empty/day-one state teach the first win, not show zeros.

### Forms (where SMB software lives or dies)
- **Ask for the least possible**, defer the rest. Don't gate first value behind a long setup form.
- Smart defaults and memory: pre-fill from last entry, remember preferences, never make them re-type their own business details.
- Inline validation with plain-language fixes ("Phone number needs 10 digits"), not a wall of red on submit.
- Forgiving formats — accept the date/phone/amount however they type it, then normalize.
- Autosave drafts; an interrupted invoice should still be there after the phone call.

### Tables & lists (real business data)
- Survive **real volume and real names** — long text truncates gracefully, 4,000 rows stay fast, numbers right-align and align on the decimal.
- The primary row action is obvious; bulk actions don't clutter the default view.
- Sort/filter that a non-technical user understands ("Unpaid", "This week") over abstract query builders.
- A genuinely useful empty state ("No invoices yet — create your first") and a sensible loading skeleton.

### Mobile / field use
- Mobile-first for anyone working away from a desk (trades, delivery, field service). Thumb-reachable primary actions (bottom, not top-right).
- Big targets, high contrast for sunlight, tolerant of gloves and one-handed use.
- Offline-tolerant where the job demands it; queue and sync rather than failing.

### Onboarding & activation
- **Time-to-value in minutes.** Let them do one real thing before any setup. Defer configuration; use progressive disclosure.
- Teach in context (a one-line hint at the moment of need) rather than an upfront tour they'll skip.
- Import from where they are now — a spreadsheet, contacts — to remove the cold-start wall.

### Billing, pricing & trust
- **Total honesty on money.** Clear pricing, clear what's charged and when, easy to find current plan and invoices. You're handling their cash; one surprise charge loses them forever.
- Make cancellation and export easy and visible. Counter-intuitively, this *builds* the trust that retains them.

---

## Anti-patterns to kill

### Human-made anti-patterns
- **Vanity-metric dashboards** that look impressive and tell the owner nothing actionable.
- **Jargon labels** ("Initiate billing workflow") instead of the user's words ("Send invoice").
- **Feature-stuffed navigation** — fifty options, none findable. Breadth they can't use beats nothing.
- **Hidden primary action** — the one thing they came to do is buried in a menu.
- **Modal-on-modal**, multi-step wizards that block first value, and setup walls on day one.
- **Dark patterns** — fake urgency, buried cancellation, sneaky upsells. Fatal for SMB trust specifically.
- **Tiny touch targets / low contrast** that ignore the real device and the real lighting.

### AI-generated anti-patterns (watch for these in every build)
These are the regressions an AI coding assistant defaults to. Pre-empt them in the build brief and catch them in review (see `vibe-coding-direction.md`):
- **Generic gradient hero** (purple-to-blue) and gradient buttons — reads as a template, not a tool.
- **Emoji used as icons** in business software — instantly unserious.
- **Six font sizes and three accent colors** — hierarchy and meaning collapse.
- **Everything centered and rounded** — business data wants left-alignment and scannability.
- **Tidy fake data** that hides every edge case — no long names, no empty states, no errors, no big numbers.
- **Fabricated metrics** — invented KPIs and charts that imply data the product doesn't have.
- **Decorative animation everywhere** — motion that impresses in a demo and annoys in daily use.
- **Scope creep** — extra features and screens nobody asked for, diluting the one job.
- **Sameness** — the unmistakable "AI SaaS demo" look. The cure is the design contract: your tokens, your restraint, your real content.

---

## A quick gut-check before shipping any SMB screen
1. Can a non-technical, interrupted user tell what to do here in **3 seconds**?
2. Is there exactly **one** obvious primary action?
3. Does it survive the **longest real name, the empty list, and an error**?
4. Is it **legible in sunlight on a cheap phone**?
5. Does it **earn trust** — honest, forgiving, no fakery?
6. Did the build avoid every **AI default** above?

If any answer is no, that's the next fix.
