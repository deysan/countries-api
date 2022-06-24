import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

import { Button } from '../components/Button';
import { Info } from '../components/Info';

import {
  clearDetails,
  loadCurrentCountry,
} from '../store/details/detailsActions';
import { selectDetails } from '../store/details/detailsSelectors';

export const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { country, status, error } = useSelector(selectDetails);

  useEffect(() => {
    dispatch(loadCurrentCountry(name));

    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, name]);

  return (
    <div>
      <p>Details {name}</p>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {country && <Info push={navigate} {...country} />}
    </div>
  );
};
