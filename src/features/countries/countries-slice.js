import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadCountries = createAsyncThunk(
  '@@countries/loadCountries',
  async (_, { extra: { client, api } }) => {
    return client.get(api.ALL_COUNTRIES);
  }
);

const initialState = {
  status: 'idle', // loading | received | rejected
  error: null,
  list: [],
};

const countriesSlice = createSlice({
  name: '@@countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCountries.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loadCountries.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload || action.meta.error;
    });
    builder.addCase(loadCountries.fulfilled, (state, action) => {
      state.status = 'received';
      state.list = action.payload.data;
    });
  },
});

export const countriesReducer = countriesSlice.reducer;

export const selectCountriesInfo = (state) => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.list.length,
});

export const selectCountries = (state) => state.countries.list;

export const selectVisibleCountries = (state, { search = '', region = '' }) =>
  state.countries.list.filter(
    (country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase().trim()) &&
      country.region.includes(region)
  );
