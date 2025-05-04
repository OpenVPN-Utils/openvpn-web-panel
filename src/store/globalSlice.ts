import {createSlice, PayloadAction} from "@reduxjs/toolkit";

let initialState = {
  test: "123"
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setTest: (state, action: PayloadAction<string>) => {
      state.test = action.payload;
    }
  }
});

export const {
  setTest,
} = globalSlice.actions;
export default globalSlice.reducer;