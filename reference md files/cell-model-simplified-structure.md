# Cell Model Simplified Structure

The model is simple:

```txt
Domain cell = what exists.
UI cell = how to see or control what exists.
Capability cell = what can be done.
```

Everything is still a cell. The difference is not that UI cells are special objects. The difference is what they are used for.

## Core Cell

A core cell is the base unit.

```js
{
  id: "lead-001",
  type: "Lead",
  owner: "workspace-001",
  values: {
    company: "Acme",
    stage: "Qualified",
    value: 12000
  },
  links: {}
}
```

The core cell stores state and relationships.

For domain data, a cell represents something in the world:

```txt
Lead
Customer
Invoice
Task
Project
User
```

The domain cell should not know how it is rendered. It only stores what it is.

## UI Cell

A UI cell is a normal cell that renders something.

Minimum shape:

```js
{
  id: "ui-leads-table",
  type: "UICell",
  owner: "ui-main",
  values: {
    name: "Leads",
    render: "table",
    bind: "collection:Lead",
    props: {
      columns: ["company", "stage", "value"]
    },
    click: "open",
    order: 10,
    visible: true
  },
  links: {
    target: "ui-lead-detail"
  }
}
```

A UI cell answers these questions:

```txt
render       how should this be drawn?
bind         what data or capability does it read?
owner        where does it live in the UI tree?
props        what configuration does this renderer need?
click        what interaction does it emit?
links.target where should the interaction go?
```

That is the useful core.

## Render

`render` is the visual shape.

Examples:

```txt
stack
row
button
text
table
form
detail
field
tabs
modal
```

Do not create separate primitive types for `Panel`, `NavItem`, `Sidebar`, `Page`, or `View`.

Those are all just UI cells with different `render`, `bind`, and `props`.

For example, a sidebar is not a special thing:

```js
{
  id: "ui-left-nav",
  type: "UICell",
  owner: "ui-workspace",
  values: {
    name: "Left Nav",
    render: "stack",
    bind: "none",
    props: {
      region: "left"
    }
  },
  links: {}
}
```

A nav item is also not special:

```js
{
  id: "ui-nav-leads",
  type: "UICell",
  owner: "ui-left-nav",
  values: {
    name: "Leads",
    render: "button",
    bind: "none",
    click: "goto"
  },
  links: {
    target: "ui-leads-table"
  }
}
```

## Bind

`bind` tells the UI cell what it reads.

Common bind forms:

```txt
none                 no data
self                 current cell in context
cell:lead-001        one specific cell
collection:Lead      all cells of a type
relation:tasks       related cells from the current context
capability:cap-id    a capability/action cell
```

Example table bound to a domain collection:

```js
{
  id: "ui-leads-table",
  type: "UICell",
  owner: "ui-main",
  values: {
    name: "Leads",
    render: "table",
    bind: "collection:Lead",
    props: {
      columns: ["company", "stage", "value"]
    },
    click: "open"
  },
  links: {
    target: "ui-lead-detail"
  }
}
```

Example detail view bound to the current selected cell:

```js
{
  id: "ui-lead-detail",
  type: "UICell",
  owner: "ui-main",
  values: {
    name: "Lead Detail",
    render: "detail",
    bind: "self",
    props: {
      fields: ["company", "stage", "value"]
    }
  },
  links: {}
}
```

## Owner

`owner` is how UI is composed.

Complex UI is just nested UI cells.

```txt
ui-workspace
  ui-left-nav
    ui-nav-leads
    ui-nav-tasks
  ui-main
    ui-leads-toolbar
      ui-create-lead-button
    ui-leads-table
  ui-right-nav
    ui-inspector
```

There is no separate layout engine concept needed at the model level. The renderer can draw children by reading ownership.

## Props

`props` is renderer-specific configuration.

For a table:

```js
props: {
  columns: ["company", "stage", "value"]
}
```

For a button:

```js
props: {
  icon: "plus",
  variant: "primary"
}
```

For a stack:

```js
props: {
  gap: 8,
  region: "left"
}
```

For the first version, `props` can be a simple object. Later, if needed, each prop can become a cell too.

## Click

`click` should be a closed vocabulary, not arbitrary code.

Useful actions:

```txt
none
select
open
goto
create
update
run
close
toggle
```

The UI cell says what should happen. The runtime decides how to do it.

Example:

```js
{
  id: "ui-nav-leads",
  type: "UICell",
  owner: "ui-left-nav",
  values: {
    name: "Leads",
    render: "button",
    bind: "none",
    click: "goto"
  },
  links: {
    target: "ui-leads-table"
  }
}
```

This means:

```txt
draw a button called Leads
when clicked, go to ui-leads-table
```

## Capability Cell

A capability cell describes something that can be done.

```js
{
  id: "cap-create-lead",
  type: "Capability",
  values: {
    name: "Create Lead",
    action: "create",
    inputType: "Lead",
    inputs: ["company", "stage", "value"]
  },
  links: {}
}
```

The capability is not the button. The capability is the action.

The UI chooses where and how to expose it.

## Showing A Capability In UI

Show a capability by creating a UI cell that binds to it.

As a button:

```js
{
  id: "ui-create-lead-button",
  type: "UICell",
  owner: "ui-leads-toolbar",
  values: {
    name: "Create Lead",
    render: "button",
    bind: "capability:cap-create-lead",
    click: "run"
  },
  links: {
    target: "cap-create-lead"
  }
}
```

As a form:

```js
{
  id: "ui-create-lead-form",
  type: "UICell",
  owner: "ui-main",
  values: {
    name: "Create Lead",
    render: "form",
    bind: "capability:cap-create-lead",
    click: "run"
  },
  links: {
    target: "cap-create-lead"
  }
}
```

The same capability can be shown in many places:

```txt
button        quick action
form          action with inputs
menu item     command in a nav/menu
toolbar item  page action
inline action row-level action
```

The rule is:

```txt
Capability cell = what can be done.
UI cell = where and how the user can do it.
Context = which domain cell it applies to.
```

## Complete Example

Domain cell:

```js
{
  id: "lead-001",
  type: "Lead",
  values: {
    company: "Acme",
    stage: "Qualified",
    value: 12000
  },
  links: {}
}
```

UI table:

```js
{
  id: "ui-leads-table",
  type: "UICell",
  owner: "ui-main",
  values: {
    name: "Leads",
    render: "table",
    bind: "collection:Lead",
    props: {
      columns: ["company", "stage", "value"]
    },
    click: "open"
  },
  links: {
    target: "ui-lead-detail"
  }
}
```

UI detail:

```js
{
  id: "ui-lead-detail",
  type: "UICell",
  owner: "ui-main",
  values: {
    name: "Lead Detail",
    render: "detail",
    bind: "self",
    props: {
      fields: ["company", "stage", "value"]
    }
  },
  links: {}
}
```

Capability:

```js
{
  id: "cap-convert-lead",
  type: "Capability",
  values: {
    name: "Convert Lead",
    action: "convert",
    inputType: "Lead"
  },
  links: {}
}
```

UI action:

```js
{
  id: "ui-convert-lead-button",
  type: "UICell",
  owner: "ui-lead-detail",
  values: {
    name: "Convert",
    render: "button",
    bind: "capability:cap-convert-lead",
    click: "run"
  },
  links: {
    target: "cap-convert-lead"
  }
}
```

This creates a usable UI from four ideas:

```txt
domain data
UI rendering
capability/action
context
```

## Final Rule

Build UI by nesting UI cells.

Configure UI by editing UI cell values.

Connect UI to domain data with `bind`.

Connect UI to actions with capability cells.

Keep the primitive small:

```txt
UICell = render + bind + owner + props + click + target
```
