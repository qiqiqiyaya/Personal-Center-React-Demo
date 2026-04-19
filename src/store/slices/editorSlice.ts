import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface EditorState {
  selectedPageId: string;
  selectedWidgetId: string | null;
}

const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    selectedPageId: 'personal-center',
    selectedWidgetId: null,
  } as EditorState,
  reducers: {
    setSelectedPageId: (state, action: PayloadAction<string>) => {
      state.selectedPageId = action.payload;
      state.selectedWidgetId = null;
    },
    setSelectedWidgetId: (state, action: PayloadAction<string | null>) => {
      state.selectedWidgetId = action.payload;
    },
  },
});

export const { setSelectedPageId, setSelectedWidgetId } = editorSlice.actions;
export default editorSlice.reducer;
