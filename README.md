# Personal Center React Demo

A JSON-driven UI rendering engine built with React + TypeScript. Features two modes:
- **Runtime mode**: End users see a Personal Center page rendered from a JSON template.
- **Builder mode**: Admin drag/drops/resizes widgets on a grid, edits props, configures visibility rules, and exports JSON.

## Tech Stack

- **React 19** + **TypeScript** (Vite scaffold)
- **Ant Design v6** (antd@6) — UI component library
- **@reduxjs/toolkit** + **react-redux** — state management
- **react-grid-layout** — drag/resize grid for the builder
- **Vitest** + **@testing-library/react** — unit & component tests

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests (single pass)
npm test

# Run tests in watch mode
npm run test:watch

# Build for production
npm run build
```

## JSON Template Schema

The application is driven by an `AppTemplate` JSON object:

```json
{
  "version": "1.0.0",
  "theme": {
    "primaryColor": "#1677ff",
    "borderRadius": 6,
    "fontSize": 14
  },
  "mockUserProfile": {
    "name": "Alice Wang",
    "tier": "premium",
    "region": "us-west",
    "features": {
      "showCharts": true,
      "showTable": true,
      "betaAccess": false
    }
  },
  "pages": [
    {
      "id": "personal-center",
      "title": "Personal Center",
      "path": "/dashboard",
      "grid": {
        "cols": 12,
        "rowHeight": 60,
        "items": [...]
      }
    }
  ]
}
```

### WidgetNode Schema

```json
{
  "id": "unique-widget-id",
  "type": "Text | StatCard | UserInfo | TableMock | ChartMock",
  "props": {},
  "layout": { "i": "unique-widget-id", "x": 0, "y": 0, "w": 4, "h": 2 },
  "visible": {
    "op": "== | != | in | notIn | truthy | falsy",
    "path": "features.showCharts",
    "value": true
  }
}
```

## Widget Registry

Widgets are registered in `src/registry/index.ts`. Each entry defines:

| Field | Description |
|-------|-------------|
| `type` | Unique widget type identifier |
| `displayName` | Human-readable name shown in the palette |
| `component` | React component |
| `defaultProps` | Default props when added from the palette |
| `builderMeta` | Icon, default dimensions, min dimensions |

### Available Widgets

| Type | Description |
|------|-------------|
| `Text` | Simple text display |
| `StatCard` | Statistic card with title, value, prefix |
| `UserInfo` | User avatar, name, tier, and region |
| `TableMock` | Mock orders table |
| `ChartMock` | Chart placeholder |

## Builder Workflow

1. Switch to **Builder** mode using the toggle in the top bar.
2. The builder shows a 3-panel layout:
   - **Left**: Widget palette — click `+` to add a widget to the canvas.
   - **Center**: Canvas — drag to reposition, resize handles to resize.
   - **Right**: Inspector — edit widget props as JSON, configure visibility rules, or delete.
3. Click any widget on the canvas to select it (highlighted in blue).
4. Edit props in the Inspector's JSON textarea and click **Save Props**.
5. Configure visibility rules using the Visibility Rule section.
6. Theme customization (primary color, border radius, font size) is available in the Inspector when no widget is selected.

## Visibility Rules

Each widget can have an optional `visible` rule:

| Op | Description |
|----|-------------|
| `==` | Profile value equals `value` |
| `!=` | Profile value does not equal `value` |
| `in` | Profile value is in `value` array |
| `notIn` | Profile value is not in `value` array |
| `truthy` | Profile value is truthy |
| `falsy` | Profile value is falsy |

The `path` field uses dot notation to traverse the mock user profile (e.g., `features.showCharts`).

## Import/Export

- **Export**: Click **Export** in the Builder header to download `template.json`.
- **Import**: Click **Import** to upload a `template.json` file and replace the current template.

## Known Non-Goals

- No real backend or authentication
- No real chart library (ChartMock is a placeholder)
- No multi-user collaboration
- No undo/redo
- No page management (add/delete pages)
- No drag-from-palette onto canvas (palette uses click-to-add)
