export const SET_COUNTRY = '@@details/SET_COUNTRY';
export const SET_LOADING = '@@details/SET_LOADING';
export const SET_ERROR = '@@details/SET_ERROR';
export const CLEAR_DETAILS = '@@details/CLEAR_DETAILS';

const setCountry = (country) => ({
  type: SET_COUNTRY,
  payload: country,
});

const setLoading = () => ({
  type: SET_LOADING,
});

const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const clearDetails = () => ({
  type: CLEAR_DETAILS,
});

export const loadCurrentCountry =
  (countryName) =>
  (dispatch, _, { client, api }) => {
    dispatch(setLoading());

    client
      .get(api.searchByCountry(countryName))
      .then(({ data }) => dispatch(setCountry(data[0])))
      .catch((error) => dispatch(setError(error.message)));
  };
