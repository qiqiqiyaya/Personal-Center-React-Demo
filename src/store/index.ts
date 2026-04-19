import { configureStore } from '@reduxjs/toolkit';
import modeReducer from './slices/modeSlice';
import templateReducer from './slices/templateSlice';
import editorReducer from './slices/editorSlice';
import mockUserProfileReducer from './slices/mockUserProfileSlice';

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    template: templateReducer,
    editor: editorReducer,
    mockUserProfile: mockUserProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
