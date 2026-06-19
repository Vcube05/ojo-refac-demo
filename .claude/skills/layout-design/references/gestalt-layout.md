# Gestalt Principles for Layout Design

Applied reference for layout design reviews. Each principle includes what to look for, common failures, and fixes.

---

## Proximity

**Rule**: Distance implies relationship. Closer = related; farther = separate.

### Good patterns

- Form label 4–8px above its input; 24px+ before the next field group
- Toolbar icon buttons 8px apart; 24px before unrelated toolbar clusters
- Card title 8–12px above card body; 32px+ before the next card

### Failure modes

| Symptom | Likely cause | Fix |
|---|---|---|
| User clicks wrong button | Action button too close to destructive/neutral action | Increase gap; add alignment separation |
| Label feels disconnected from field | Gap too large between label and input | Tighten label-to-input; widen field-group-to-field-group |
| Sidebar item looks like main content | Sidebar padding matches main content padding | Different surface or wider gutter between panes |

---

## Similarity

**Rule**: Elements that look alike (size, spacing, shape) read as the same category.

### Good patterns

- All list rows share identical height and left padding
- All metric tiles share the same padding and corner radius
- Section headings share one top margin value across the page

### Failure modes

- One card uses 16px padding while siblings use 24px — reads as "different kind" or broken
- Mixed border radii in the same row of tiles — reads as inconsistent, not playful
- Random icon sizes in a toolbar — breaks scanability

**Fix**: Normalize spacing and shape tokens before adding labels or colors to differentiate.

---

## Common region

**Rule**: Shared background or container boundary creates a group.

### Good patterns

- Alternating section backgrounds (white / subtle gray) for major page bands
- Muted fill behind a filter bar separating it from the data table
- Modal overlay isolating task-focused content

### Failure modes

- Region + border + shadow on the same group — triple encoding
- Background band only 8px taller than content — feels like a mistake, not a section
- Same background for nav, sidebar, and content — no figure/ground separation

**Fix**: One grouping cue per level. Prefer background band over border when the whole section is one idea.

---

## Continuity

**Rule**: The eye follows lines and aligned edges smoothly.

### Good patterns

- Left edges of heading, paragraph, and button align
- Table columns share vertical grid lines (real or implied)
- Timeline dots connected by a continuous vertical line

### Failure modes

- Heading indented 4px differently from body — subtle but reads as "off"
- Staggered card heights with no baseline alignment in a row
- Divider lines that stop short of container edges without intent

**Fix**: Pick one alignment anchor per section and snap all elements to it.

---

## Closure

**Rule**: The mind completes incomplete shapes. Layout can use this — or suffer from it.

### Good patterns

- Partial-width divider under a section title (60–80% width) as a deliberate accent
- Open-side containers in split layouts where the gutter provides the missing edge

### Failure modes

- Border on three sides of a box — looks accidental
- Column separator that doesn't reach header and footer — feels broken
- "Card" with only a bottom border — often better as a list row with divider

**Fix**: Either complete the enclosure or remove it entirely. Half-boxes need explicit design intent.

---

## Figure / ground

**Rule**: Foreground content must separate from background chrome.

### Good patterns

- Content area on white; app chrome on subtle gray
- Elevated modal on scrim
- Active nav item with fill; inactive items recede

### Failure modes

- Everything on `#FFFFFF` including sidebar, header, and cards — flat mosaic
- Low-contrast surface difference (1% gray difference) — grouping fails in practice
- Decorative background pattern behind dense text without sufficient overlay

**Fix**: Increase surface contrast between chrome and content, or use spacing/gutter instead of color if palette is limited.

---

## Review prompt cheat sheet

When auditing, ask:

1. **Proximity**: Are any unrelated items closer than related ones?
2. **Similarity**: Do peer elements share the same spatial tokens?
3. **Region**: Is grouping encoded more than once (fill + border + shadow)?
4. **Continuity**: Do edges align on a grid?
5. **Closure**: Any incomplete boxes that look accidental?
6. **Figure/ground**: Is primary content clearly on top?

If two or more fail, fix grouping and alignment before adjusting typography or color.
