import { describe, it, expect } from 'vitest';
import modeReducer, { setMode, toggleMode } from '../store/slices/modeSlice';

describe('modeSlice', () => {
  it('has initial state runtime', () => {
    expect(modeReducer(undefined, { type: '@@INIT' })).toBe('runtime');
  });

  it('setMode sets mode', () => {
    expect(modeReducer('runtime', setMode('builder'))).toBe('builder');
    expect(modeReducer('builder', setMode('runtime'))).toBe('runtime');
  });

  it('toggleMode toggles', () => {
    expect(modeReducer('runtime', toggleMode())).toBe('builder');
    expect(modeReducer('builder', toggleMode())).toBe('runtime');
  });
});
