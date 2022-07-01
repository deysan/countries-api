import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card';
import { List } from '../../components/List';
import { useCountries } from './use-countries';

export const CountriesList = () => {
  const navigate = useNavigate();

  const [countries, status, error] = useCountries();

  return (
    <>
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
