import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { loadNeighborsByBorder } from '../store/details/detailsActions';
import { selectNeighbors } from '../store/details/detailsSelectors';

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 100%;
  gap: 2rem;
  width: 100%;
  margin-top: 3rem;

  @media (min-width: 767px) {
    grid-template-columns: minmax(100px, 400px) 1fr;
    align-items: center;
    gap: 5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: minmax(400px, 600px) 1fr;
  }
`;

const InfoImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const InfoTitle = styled.h1`
  margin: 0;
  font-weight: var(--fw-normal);
`;

const ListGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 4rem;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  line-height: 1.8;

  & > b {
    font-weight: var(--fw-bold);
  }
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  margin-top: 3rem;

  & > b {
    font-weight: var(--fw-bold);
  }

  @media (min-width: 767px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Tag = styled.span`
  padding: 0 1rem;
  line-height: 1.5;
  background-color: var(--colors-ui-base);
  box-shadow: var(--shadow);
  cursor: pointer;
`;

export const Info = (props) => {
  const {
    name,
    flags,
    capital,
    population,
    region,
    subregion,
    tld,
    currencies = [],
    languages = [],
    borders = [],
    push,
  } = props;

  const dispatch = useDispatch();
  const neighbors = useSelector(selectNeighbors);

  useEffect(() => {
    if (borders.length) {
      dispatch(loadNeighborsByBorder(borders));
    }
  }, [borders, dispatch]);

  return (
    <Wrapper>
      <InfoImage src={flags.png} alt={name.common} />
      <div>
        <InfoTitle></InfoTitle>
        <ListGroup>
          <List>
            <ListItem>
              <b>Native Name:</b> {Object.values(name.nativeName)[0].common}
            </ListItem>
            <ListItem>
              <b>Population</b> {population.toLocaleString()}
            </ListItem>
            <ListItem>
              <b>Region:</b> {region}
            </ListItem>
            <ListItem>
              <b>Sub Region:</b> {subregion}
            </ListItem>
            <ListItem>
              <b>Capital:</b> {capital}
            </ListItem>
          </List>
          <List>
            <ListItem>
              <b>Top Level Domain:</b> {tld?.join(', ')}
            </ListItem>
            <ListItem>
              <b>Currency:</b>{' '}
              {Object.keys(currencies)
                .map((key) => currencies[key].name)
                .join(', ')}
            </ListItem>
            <ListItem>
              <b>Language:</b> {Object.values(languages).join(', ')}
            </ListItem>
          </List>
        </ListGroup>
        <Meta>
          <b>Border Countries</b>
          {!borders.length ? (
            <span>There is no border countries</span>
          ) : (
            <TagGroup>
              {neighbors.map((countryName) => (
                <Tag
                  key={countryName.official}
                  onClick={() => push(`/country/${countryName.official}`)}
                >
                  {countryName.common}
                </Tag>
              ))}
            </TagGroup>
          )}
        </Meta>
      </div>
    </Wrapper>
  );
};
