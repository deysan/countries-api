import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { searchByCountry } from '../config';

import { Button } from '../components/Button';
import { Info } from '../components/Info';

export const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios.get(searchByCountry(name)).then(({ data }) => setCountry(data[0]));
  }, [name]);

  return (
    <div>
      <p>Details {name}</p>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      {country && <Info push={navigate} {...country} />}
    </div>
  );
};
