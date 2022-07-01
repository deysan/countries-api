import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadCountryByName = createAsyncThunk(
  '@@details/loadCountryByName',
  (name, { extra: { client, api } }) => {
    return client.get(api.searchByCountry(name));
  }
);

const initialState = {
  country: null,
  neighbors: [],
  status: 'idle', // loading | received | rejected
  error: null,
};

const detailsSlice = createSlice({
  name: '@@details',
  initialState,
  reducers: {
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(loadCountryByName.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loadCountryByName.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload || action.meta.error;
    });
    builder.addCase(loadCountryByName.fulfilled, (state, action) => {
      state.status = 'received';
      state.country = action.payload.data[0];
    });
  },
});

export const { clearDetails } = detailsSlice.actions;

export const detailsReducer = detailsSlice.reducer;

export const selectCurrentCountry = (state) => state.details.country;

export const selectNeighbors = (state) => state.details.neighbors;

export const selectDetails = (state) => state.details;
