import styled from 'styled-components';

import { IoSearch } from 'react-icons/io5';

const InputContainer = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5rem;
  padding: 1rem 2rem;
  background-color: var(--colors-ui-base);
  border-radius: var(--radii);
  box-shadow: var(--shadow);

  @media (min-width: 767px) {
    width: 280px;
    margin-bottom: 0;
  }
`;

const Input = styled.input.attrs({
  type: 'search',
  placeholder: 'Search for a country...',
})`
  margin-left: 2rem;
  color: var(--color-text);
  background-color: transparent;
  border: none;
  outline: none;
`;

export const Search = ({ search, setSearch }) => {
  return (
    <InputContainer>
      <IoSearch />
      <Input onChange={(e) => setSearch(e.target.value)} value={search} />
    </InputContainer>
  );
};
