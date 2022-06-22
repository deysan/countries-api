import axios from 'axios';
import { useEffect } from 'react';

import { Card } from '../components/Card';
import { Controls } from '../components/Controls';
import { List } from '../components/List';
import { useNavigate } from 'react-router-dom';

import { ALL_COUNTRIES } from '../config';

export const HomePage = ({ countries, setCountries }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!countries.length)
      axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
  }, [countries, setCountries]);

  return (
    <>
      <Controls />
      <List>
        {countries.map((country) => {
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
    </>
  );
};
