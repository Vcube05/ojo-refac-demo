# OJO · Demo

AI-native CRM/ERP demo — Home · Leads · Projects · HR · Accounts · Vendors · unified gamified Tasks.
Static app: one HTML shell + `ojo.css` + `ojo.js`. **No build step, no dependencies.** State is in-memory and resets on reload.

## Files

| File | What it is |
|---|---|
| `index.html` | App shell (markup + font + links to css/js) |
| `ojo.css` | All styles (design tokens at the top of the file) |
| `ojo.js` | All app logic (router, modules, detail cards, panels, email drawer, time tracking) |

## Run it

### Option A — VS Code (simplest)
1. `code .` in this folder (or File → Open Folder).
2. Install the **Live Server** extension (ritwickdey.LiveServer).
3. Right-click `index.html` → **Open with Live Server**. Auto-reloads on save.

### Option B — CLI (Node)
```bash
npm start          # serves on http://localhost:5173 (uses npx serve, no install needed)
# or with auto-reload:
npm run dev        # uses npx live-server
```

### Option C — CLI (Python, zero Node)
```bash
python3 -m http.server 5173
# open http://localhost:5173
```

### Option D — no server at all
Just double-click `index.html` — it works from `file://` too (everything is local except the Inter font from Google Fonts).

## Quick orientation (for editing)

- **Router:** `go(route)` in `ojo.js`; boots with `go('home')`.
- **Detail cards** (lead/task/employee/vendor): `.dwrap` wrapper → `.dbox` card → `.dmain` + `.dpanel`, with close + up/down controls in `.dside`. Keyboard: ↑/↓ navigate records, Esc closes (collapses an expanded panel first).
- **Right panel expansion:** expand (⤢) button or click an email — panel stretches to the right of the card (`pxSet()` keeps its layout slot fixed so the main never reflows). Drag either panel edge to resize.
- **Task detail:** time tracking (`trk*`), checklist, Acceptance & Review (criteria / proof of work / OJO Review), sticky action bar (timer + Mark Complete).
- **Design tokens:** `:root` at the top of `ojo.css` (coral `#F04D56`, navy `#0B1627`, warm pink background, Inter).
- **Verify JS after edits:** `node --check ojo.js`.

## Cell model (design philosophy)

Domain cell = what exists (Lead, Task, Project…). UI cell = how it's seen/controlled (table, board, detail, panel). Capability cell = what can be done (Mark Complete, OJO Review, New Mail). Views are lenses over the same cells; a module = data + schema.
