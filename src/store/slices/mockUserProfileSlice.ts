import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { MockUserProfile } from '../../types/template';
import { defaultMockUserProfile } from '../../data/mockUserProfile';

const mockUserProfileSlice = createSlice({
  name: 'mockUserProfile',
  initialState: defaultMockUserProfile as MockUserProfile,
  reducers: {
    setMockUserProfile: (_state, action: PayloadAction<MockUserProfile>) => action.payload,
    updateMockUserProfile: (state, action: PayloadAction<Partial<MockUserProfile>>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setMockUserProfile, updateMockUserProfile } = mockUserProfileSlice.actions;
export default mockUserProfileSlice.reducer;
