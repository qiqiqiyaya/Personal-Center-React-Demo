import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import RuntimePage from '../components/runtime/RuntimePage';
import mockUserProfileReducer from '../store/slices/mockUserProfileSlice';
import { defaultMockUserProfile } from '../data/mockUserProfile';
import type { Page } from '../types/template';

const makeStore = () =>
  configureStore({
    reducer: { mockUserProfile: mockUserProfileReducer },
    preloadedState: { mockUserProfile: defaultMockUserProfile },
  });

const testPage: Page = {
  id: 'test-page',
  title: 'Test Page',
  path: '/test',
  grid: {
    cols: 12,
    rowHeight: 60,
    items: [
      {
        id: 'w-text-test',
        type: 'Text',
        props: { content: 'Hello Runtime' },
        layout: { i: 'w-text-test', x: 0, y: 0, w: 4, h: 2 },
      },
    ],
  },
};

describe('RuntimePage', () => {
  it('renders text widget content', () => {
    render(
      <Provider store={makeStore()}>
        <RuntimePage page={testPage} />
      </Provider>
    );
    expect(screen.getByText('Hello Runtime')).toBeInTheDocument();
  });

  it('hides widget when visibility rule evaluates to false', () => {
    const hiddenPage: Page = {
      ...testPage,
      grid: {
        ...testPage.grid,
        items: [
          {
            ...testPage.grid.items[0],
            visible: { op: '==', path: 'tier', value: 'enterprise' },
          },
        ],
      },
    };
    render(
      <Provider store={makeStore()}>
        <RuntimePage page={hiddenPage} />
      </Provider>
    );
    expect(screen.queryByText('Hello Runtime')).not.toBeInTheDocument();
  });
});
