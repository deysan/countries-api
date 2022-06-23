export const selectCountriesInfo = (state) => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.list.length,
});

export const selectCountries = (state) => state.countries.list;

export const selectVisibleCountries = (state, { search = '' }) =>
  state.countries.list.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase().trim())
  );
