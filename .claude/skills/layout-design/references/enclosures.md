# Enclosures, Borders & Cards — Decision Guide

When to box content, and when whitespace is enough.

---

## Decision tree

```
Need to group content?
├─ No → Use alignment + whitespace only
└─ Yes → Is the group interactive (clickable/selectable)?
    ├─ No → Can a background fill or section band suffice?
    │   ├─ Yes → Use surface fill; skip border
    │   └─ No → Is the background busy or low-contrast?
    │       ├─ Yes → Use subtle border OR elevated card
    │       └─ No → Use whitespace + heading; skip border
    └─ Yes → Use card with clear hit area
        └─ Is it floating (popover/modal/dropdown)?
            └─ Yes → Add elevation (shadow); border optional
```

---

## Pattern catalog

### Whitespace only

**Use for**: article body, simple settings lists, sequential form fields, marketing copy blocks.

**Signals**: heading + gap + content + larger gap + next section.

**Avoid when**: items are peer tiles users compare (metrics, pricing) or background is noisy.

---

### Background fill (no border)

**Use for**: page sections, filter bars, sidebar panels, inset callouts.

**Guidelines**:
- Fill should be visibly different from adjacent surfaces (not 1–2% gray delta)
- Padding inside fill: 24–32px desktop, 16–24px mobile
- No border unless fill alone fails contrast on busy backgrounds

---

### Hairline divider

**Use for**: list row separation, toolbar sections, table rows, "or" splits in forms.

**Guidelines**:
- 1px at full or intentional partial width
- Prefer divider over card when items are **sequential**, not **parallel**
- Combine with vertical padding (12–16px) — divider alone without padding feels tight

**Avoid**: divider + card border on same element.

---

### Bordered card

**Use for**: clickable tiles, dashboard widgets, selectable options, content on varied backgrounds.

**Guidelines**:
- One border weight per view (typically 1px)
- Internal padding ≥ 16px (24px for marketing cards)
- Corner radius consistent with design system
- Hover/focus states change border or shadow — not both dramatically

**Avoid**:
- Bordered card inside bordered card
- Border color competing with input borders in the same view

---

### Elevated surface (shadow)

**Use for**: dropdowns, popovers, modals, FAB menus, drag overlays.

**Guidelines**:
- One elevation step above parent surface
- Shadow implies **temporary or floating** — not for static page sections
- Pair with scrim for modals

**Avoid**: shadow on every dashboard tile when a border or fill suffices — creates muddy depth.

---

## Context-specific guidance

### Dashboards

- **Peer metrics**: light fill or hairline cards in a grid; equal padding in every cell
- **Primary chart**: larger cell or isolation via whitespace — not the heaviest border
- **Dense tables**: row dividers, not row cards

### Forms

- Inputs already have borders — don't wrap the whole form in another bordered card unless it's a distinct wizard step
- Group related fields with heading + 16px gap, not a box
- Error summaries: fill + border acceptable (semantic emphasis)

### Marketing / landing

- Alternate full-bleed bands (fill) with contained white sections
- Pricing tiers: bordered cards OK — parallel comparison is the use case
- Testimonials: quote card OR avatar + text with whitespace — not both boxed heavily

### Modals & drawers

- Always enclosed — they're a separate spatial layer
- Content inside modal: minimize nested cards; modal edge is already the enclosure

### Navigation

- Sidebar: region fill, not bordered box floating on page
- Active item: fill pill or left accent bar — not a full bordered rectangle per item

---

## Anti-patterns

| Pattern | Why it fails | Remedy |
|---|---|---|
| Card soup | Every element boxed; no hierarchy | Remove boxes from secondary content; keep for primary tiles only |
| Border as spacing substitute | Box added because padding wasn't increased | Increase gap; remove border |
| Double enclosure | Section has fill AND each child has border | Pick one level |
| Orphan divider | Line between unrelated sections with uneven padding | Match padding above/below divider |
| Dashed placeholder boxes | Wireframe aesthetic in final UI | Whitespace + label text |

---

## Quick reference

| Need | Recommended treatment |
|---|---|
| Separate page sections | Background band or 48px+ vertical gap |
| List of homogeneous items | Dividers + padding |
| Comparable peer items | Equal cards or equal fills in grid |
| Single callout | Left accent bar or inset fill |
| Floating action | Shadow + optional border |
| Form field group | Heading + proximity |
| Busy photo background | Solid card behind text |
