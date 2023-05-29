import { createSlice, createSelector } from '@reduxjs/toolkit';
const initialState = { a: 10, b: 11, c: 12 };

const selectorsSlice = createSlice({
  name: 'selectors',
  initialState,
  reducers: {
    inc(state) {
      state.a += 1;
      state.b += 2;
      state.c += 3;
    },
    dec(state) {
        state.a -= 1;
        state.b -= 2;
        state.c -= 3;
    }
  }
})

export const selectA = (state) => 20; //state.a;
export const selectB = (state) => 30; //state.b;
export const selectC = (state) => 40; //state.c;
export const selectABC = createSelector([selectA, selectB, selectC], (a,b,c) => {
    return a + b + c;
});
export const { inc, dec } = selectorsSlice.actions;
export default selectorsSlice.reducer;