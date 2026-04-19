import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppTemplate, WidgetNode, ThemeConfig, VisibilityRule } from '../../types/template';
import { defaultTemplate } from '../../data/mockTemplate';

const templateSlice = createSlice({
  name: 'template',
  initialState: defaultTemplate as AppTemplate,
  reducers: {
    setTemplate: (_state, action: PayloadAction<AppTemplate>) => action.payload,
    updateTheme: (state, action: PayloadAction<Partial<ThemeConfig>>) => {
      state.theme = { ...state.theme, ...action.payload };
    },
    addWidget: (state, action: PayloadAction<{ pageId: string; widget: WidgetNode }>) => {
      const page = state.pages.find((p) => p.id === action.payload.pageId);
      if (page) page.grid.items.push(action.payload.widget);
    },
    updateWidgetLayout: (
      state,
      action: PayloadAction<{ pageId: string; widgetId: string; layout: WidgetNode['layout'] }>
    ) => {
      const page = state.pages.find((p) => p.id === action.payload.pageId);
      if (page) {
        const item = page.grid.items.find((w) => w.id === action.payload.widgetId);
        if (item) item.layout = action.payload.layout;
      }
    },
    updateWidgetProps: (
      state,
      action: PayloadAction<{ pageId: string; widgetId: string; props: Record<string, unknown> }>
    ) => {
      const page = state.pages.find((p) => p.id === action.payload.pageId);
      if (page) {
        const item = page.grid.items.find((w) => w.id === action.payload.widgetId);
        if (item) item.props = action.payload.props;
      }
    },
    updateWidgetVisibility: (
      state,
      action: PayloadAction<{
        pageId: string;
        widgetId: string;
        visible: VisibilityRule | undefined;
      }>
    ) => {
      const page = state.pages.find((p) => p.id === action.payload.pageId);
      if (page) {
        const item = page.grid.items.find((w) => w.id === action.payload.widgetId);
        if (item) item.visible = action.payload.visible;
      }
    },
    removeWidget: (
      state,
      action: PayloadAction<{ pageId: string; widgetId: string }>
    ) => {
      const page = state.pages.find((p) => p.id === action.payload.pageId);
      if (page) {
        page.grid.items = page.grid.items.filter((w) => w.id !== action.payload.widgetId);
      }
    },
    updateAllLayouts: (
      state,
      action: PayloadAction<{ pageId: string; layouts: WidgetNode['layout'][] }>
    ) => {
      const page = state.pages.find((p) => p.id === action.payload.pageId);
      if (page) {
        action.payload.layouts.forEach((l) => {
          const item = page.grid.items.find((w) => w.id === l.i);
          if (item) item.layout = l;
        });
      }
    },
  },
});

export const {
  setTemplate,
  updateTheme,
  addWidget,
  updateWidgetLayout,
  updateWidgetProps,
  updateWidgetVisibility,
  removeWidget,
  updateAllLayouts,
} = templateSlice.actions;
export default templateSlice.reducer;
