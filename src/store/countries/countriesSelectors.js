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
