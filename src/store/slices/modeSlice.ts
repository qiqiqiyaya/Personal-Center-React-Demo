import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppMode } from '../../types/template';

const modeSlice = createSlice({
  name: 'mode',
  initialState: 'runtime' as AppMode,
  reducers: {
    setMode: (_state, action: PayloadAction<AppMode>) => action.payload,
    toggleMode: (state) => (state === 'runtime' ? 'builder' : 'runtime'),
  },
});

export const { setMode, toggleMode } = modeSlice.actions;
export default modeSlice.reducer;
