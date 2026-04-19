import type { AppTemplate } from '../types/template';
import { defaultMockUserProfile } from './mockUserProfile';

export const defaultTemplate: AppTemplate = {
  version: '1.0.0',
  theme: {
    primaryColor: '#1677ff',
    borderRadius: 6,
    fontSize: 14,
  },
  mockUserProfile: defaultMockUserProfile,
  pages: [
    {
      id: 'personal-center',
      title: 'Personal Center',
      path: '/dashboard',
      grid: {
        cols: 12,
        rowHeight: 60,
        items: [
          {
            id: 'w-userinfo',
            type: 'UserInfo',
            props: {},
            layout: { i: 'w-userinfo', x: 0, y: 0, w: 4, h: 3 },
          },
          {
            id: 'w-statcard-1',
            type: 'StatCard',
            props: { title: 'Total Orders', value: '128', prefix: '📦' },
            layout: { i: 'w-statcard-1', x: 4, y: 0, w: 2, h: 2 },
          },
          {
            id: 'w-statcard-2',
            type: 'StatCard',
            props: { title: 'Balance', value: '$1,240', prefix: '💰' },
            layout: { i: 'w-statcard-2', x: 6, y: 0, w: 2, h: 2 },
          },
          {
            id: 'w-statcard-3',
            type: 'StatCard',
            props: { title: 'Points', value: '3,200', prefix: '⭐' },
            layout: { i: 'w-statcard-3', x: 8, y: 0, w: 2, h: 2 },
          },
          {
            id: 'w-chart-1',
            type: 'ChartMock',
            props: { title: 'Activity Overview' },
            layout: { i: 'w-chart-1', x: 0, y: 3, w: 6, h: 4 },
            visible: { op: '==', path: 'features.showCharts', value: true },
          },
          {
            id: 'w-text-1',
            type: 'Text',
            props: { content: 'Welcome to your Personal Center! Manage your account, track orders, and explore your activity.' },
            layout: { i: 'w-text-1', x: 6, y: 3, w: 6, h: 2 },
          },
          {
            id: 'w-table-1',
            type: 'TableMock',
            props: { title: 'Recent Orders' },
            layout: { i: 'w-table-1', x: 0, y: 7, w: 12, h: 4 },
            visible: { op: '==', path: 'features.showTable', value: true },
          },
        ],
      },
    },
  ],
};
