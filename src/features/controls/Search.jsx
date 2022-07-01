import styled from 'styled-components';
import { IoSearch } from 'react-icons/io5';
import { useSearch } from './use-search';

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
  transition: all cubic-bezier(0.55, 0.085, 0.68, 0.53) 150ms;

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
  const [search, handleSearch] = useSearch();

  return (
    <InputContainer>
      <IoSearch size="16px" color="#7d7f81" />
      <Input onChange={handleSearch} value={search} />
    </InputContainer>
  );
};
