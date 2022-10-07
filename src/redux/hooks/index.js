import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibleFormModal: false,
};
const hookReducer = createSlice({
  name: "hooks",
  initialState: initialState,
  reducers: {
    setReduxVisibleFormModal: (state = 0, action) => {
      state.visibleFormModal = action.payload;
    },
  },
});

export const { setReduxVisibleFormModal } = hookReducer.actions;
export const getVisibleFormModal = (state) => state.hooks.visibleFormModal;

export default hookReducer.reducer;
