import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import BuilderCanvas from '../components/builder/BuilderCanvas';

describe('BuilderCanvas', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <BuilderCanvas />
      </Provider>
    );
    // The canvas renders the grid layout wrapper
    expect(document.querySelector('.layout')).toBeInTheDocument();
  });
});
