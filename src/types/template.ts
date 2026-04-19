export type AppMode = 'runtime' | 'builder';

export type VisibilityOp = '==' | '!=' | 'in' | 'notIn' | 'truthy' | 'falsy';

export interface VisibilityRule {
  op: VisibilityOp;
  path: string;       // dot-path into mockUserProfile, e.g. "features.showCharts"
  value?: unknown;    // only needed for == != in notIn
}

export interface WidgetLayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}

export interface WidgetNode {
  id: string;
  type: string;
  props: Record<string, unknown>;
  layout: WidgetLayout;
  visible?: VisibilityRule;
}

export interface GridConfig {
  cols?: number;
  rowHeight?: number;
  items: WidgetNode[];
}

export interface Page {
  id: string;
  title: string;
  path: string;
  grid: GridConfig;
}

export interface ThemeConfig {
  primaryColor?: string;
  borderRadius?: number;
  fontSize?: number;
}

export interface MockUserProfile {
  name: string;
  tier: string;
  region: string;
  features: Record<string, boolean | string | number>;
}

export interface AppTemplate {
  version: string;
  theme: ThemeConfig;
  mockUserProfile: MockUserProfile;
  pages: Page[];
}
