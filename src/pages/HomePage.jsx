import axios from 'axios';
import { useEffect, useState } from 'react';

import { Card } from '../components/Card';
import { Controls } from '../components/Controls';
import { List } from '../components/List';
import { useNavigate } from 'react-router-dom';

import { ALL_COUNTRIES } from '../config';

export const HomePage = ({ countries, setCountries }) => {
  const navigate = useNavigate();
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
    if (!countries.length) {
      axios.get(ALL_COUNTRIES).then(({ data }) => {
        setCountries(data);
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [countries]);

  return (
    <>
      <Controls onSearch={handleSearch} />
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
    </>
  );
};
