import { describe, it, expect } from 'vitest';
import templateReducer, {
  addWidget,
  updateWidgetProps,
  updateWidgetVisibility,
  removeWidget,
  updateTheme,
  updateAllLayouts,
} from '../store/slices/templateSlice';
import { defaultTemplate } from '../data/mockTemplate';

const pageId = 'personal-center';

describe('templateSlice', () => {
  it('addWidget adds to page grid', () => {
    const widget = {
      id: 'test-w', type: 'Text', props: {}, layout: { i: 'test-w', x: 0, y: 0, w: 2, h: 2 },
    };
    const next = templateReducer(defaultTemplate, addWidget({ pageId, widget }));
    const page = next.pages.find((p) => p.id === pageId)!;
    expect(page.grid.items.some((w) => w.id === 'test-w')).toBe(true);
  });

  it('removeWidget removes from page grid', () => {
    const state = templateReducer(defaultTemplate, addWidget({
      pageId,
      widget: { id: 'del-w', type: 'Text', props: {}, layout: { i: 'del-w', x: 0, y: 0, w: 2, h: 2 } },
    }));
    const next = templateReducer(state, removeWidget({ pageId, widgetId: 'del-w' }));
    const page = next.pages.find((p) => p.id === pageId)!;
    expect(page.grid.items.some((w) => w.id === 'del-w')).toBe(false);
  });

  it('updateWidgetProps updates props', () => {
    const widgetId = defaultTemplate.pages[0].grid.items[0].id;
    const next = templateReducer(defaultTemplate, updateWidgetProps({
      pageId, widgetId, props: { title: 'Updated' },
    }));
    const page = next.pages.find((p) => p.id === pageId)!;
    const item = page.grid.items.find((w) => w.id === widgetId)!;
    expect(item.props.title).toBe('Updated');
  });

  it('updateWidgetVisibility sets rule', () => {
    const widgetId = defaultTemplate.pages[0].grid.items[0].id;
    const next = templateReducer(defaultTemplate, updateWidgetVisibility({
      pageId, widgetId, visible: { op: '==', path: 'tier', value: 'premium' },
    }));
    const page = next.pages.find((p) => p.id === pageId)!;
    const item = page.grid.items.find((w) => w.id === widgetId)!;
    expect(item.visible?.op).toBe('==');
  });

  it('updateTheme merges theme', () => {
    const next = templateReducer(defaultTemplate, updateTheme({ primaryColor: '#ff0000' }));
    expect(next.theme.primaryColor).toBe('#ff0000');
  });

  it('updateAllLayouts updates all layouts in one pass', () => {
    const items = defaultTemplate.pages[0].grid.items;
    const updated = items.map((w) => ({ ...w.layout, w: 99 }));
    const next = templateReducer(defaultTemplate, updateAllLayouts({ pageId, layouts: updated }));
    const page = next.pages.find((p) => p.id === pageId)!;
    page.grid.items.forEach((item) => {
      expect(item.layout.w).toBe(99);
    });
  });
});
