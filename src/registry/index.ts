import React from 'react';
import TextWidget from './widgets/Text';
import StatCard from './widgets/StatCard';
import UserInfo from './widgets/UserInfo';
import TableMock from './widgets/TableMock';
import ChartMock from './widgets/ChartMock';

export interface RegistryEntry {
  type: string;
  displayName: string;
  component: React.ComponentType<Record<string, unknown>>;
  defaultProps: Record<string, unknown>;
  builderMeta: {
    icon?: string;
    defaultW: number;
    defaultH: number;
    minW?: number;
    minH?: number;
  };
}

const registry: Record<string, RegistryEntry> = {
  Text: {
    type: 'Text',
    displayName: 'Text',
    component: TextWidget as React.ComponentType<Record<string, unknown>>,
    defaultProps: { content: 'New text widget' },
    builderMeta: { icon: '📝', defaultW: 4, defaultH: 2, minW: 2, minH: 1 },
  },
  StatCard: {
    type: 'StatCard',
    displayName: 'Stat Card',
    component: StatCard as React.ComponentType<Record<string, unknown>>,
    defaultProps: { title: 'Stat', value: '0' },
    builderMeta: { icon: '📊', defaultW: 3, defaultH: 2, minW: 2, minH: 2 },
  },
  UserInfo: {
    type: 'UserInfo',
    displayName: 'User Info',
    component: UserInfo as React.ComponentType<Record<string, unknown>>,
    defaultProps: {},
    builderMeta: { icon: '👤', defaultW: 4, defaultH: 3, minW: 3, minH: 2 },
  },
  TableMock: {
    type: 'TableMock',
    displayName: 'Table',
    component: TableMock as React.ComponentType<Record<string, unknown>>,
    defaultProps: { title: 'Table' },
    builderMeta: { icon: '📋', defaultW: 6, defaultH: 4, minW: 4, minH: 3 },
  },
  ChartMock: {
    type: 'ChartMock',
    displayName: 'Chart',
    component: ChartMock as React.ComponentType<Record<string, unknown>>,
    defaultProps: { title: 'Chart' },
    builderMeta: { icon: '📈', defaultW: 6, defaultH: 4, minW: 3, minH: 3 },
  },
};

export default registry;

export function getRegistryEntry(type: string): RegistryEntry | undefined {
  return registry[type];
}

export function getAllRegistryEntries(): RegistryEntry[] {
  return Object.values(registry);
}
