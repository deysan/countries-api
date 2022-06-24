import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Card } from '../components/Card';
import { Controls } from '../components/Controls';
import { List } from '../components/List';

import { selectControls } from '../store/controls/controlsSelectors';
import { loadCountries } from '../store/countries/countriesActions';
import {
  selectCountriesInfo,
  selectVisibleCountries,
} from '../store/countries/countriesSelectors';

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const controls = useSelector(selectControls);
  const countries = useSelector((state) =>
    selectVisibleCountries(state, controls)
  );
  const { status, error, qty } = useSelector(selectCountriesInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [dispatch, qty]);

  return (
    <>
      <Controls />
      {error && <h2>Can't fetch data</h2>}
      {status === 'loading' && <h2>Loading...</h2>}

      {status === 'received' && (
        <List>
          {countries.map((country) => {
            const countryInfo = {
              img: country.flags.png,
              name: country.name.official,
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
