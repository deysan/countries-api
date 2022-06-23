import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Card } from '../components/Card';
import { Controls } from '../components/Controls';
import { List } from '../components/List';

import { selectSearch } from '../store/controls/controlsSelectors';
import { loadCountries } from '../store/countries/countriesActions';
import {
  selectCountriesInfo,
  selectVisibleCountries,
} from '../store/countries/countriesSelectors';

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const search = useSelector(selectSearch);
  const countries = useSelector((state) =>
    selectVisibleCountries(state, { search })
  );
  const { status, error, qty } = useSelector(selectCountriesInfo);

  const [filteredCountries, setFilteredCountries] = useState(countries);

  const handleSearch = (search, region) => {
    let data = [...countries];

    if (region) {
      data = data.filter((country) => country.region.includes(region));
    }

    if (search) {
      data = data.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredCountries(data);
  };

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [dispatch, qty]);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [countries]);

  return (
    <>
      <Controls onSearch={handleSearch} />
      {error && <h2>Can't fetch data</h2>}
      {status === 'loading' && <h2>Loading...</h2>}

      {status === 'received' && (
        <List>
          {filteredCountries.map((country) => {
            const countryInfo = {
              img: country.flags.png,
              name: country.name.common,
              info: [
                {
                  title: 'Population',
                  description: country.population.toLocaleString(),
                },
                {
                  title: 'Region',
                  description: country.region,
                },
                {
                  title: 'Capital',
                  description: country.capital[0],
                },
              ],
            };

            return (
              <Card
                key={countryInfo.name}
                onClick={() => navigate(`/country/${countryInfo.name}`)}
                {...countryInfo}
              />
            );
          })}
        </List>
      )}
    </>
  );
};
