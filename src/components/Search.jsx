import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { IoSearch } from 'react-icons/io5';

import { selectSearch } from '../store/controls/controlsSelectors';
import { setSearch } from '../store/controls/controlsActions';

const InputContainer = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5rem;
  padding: 1rem 1.5rem;
  background-color: var(--colors-ui-base);
  border-radius: var(--radii);
  box-shadow: var(--shadow);
  overflow: hidden;

  @media (min-width: 767px) {
    width: 280px;
    margin-bottom: 0;
  }
`;

const Input = styled.input.attrs({
  type: 'search',
  placeholder: 'Search for a country...',
})`
  width: 100%;
  margin-left: 1rem;
  color: var(--color-text);
  background-color: transparent;
  border: none;
  outline: none;
`;

export const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);

  const handleSearch = (event) => {
    dispatch(setSearch(event.target.value));
  };

  return (
    <InputContainer>
      <IoSearch size="16px" color="#7d7f81" />
      <Input onChange={handleSearch} value={search} />
    </InputContainer>
  );
};
