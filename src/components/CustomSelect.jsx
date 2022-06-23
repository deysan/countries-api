import styled from 'styled-components';
import Select from 'react-select';

export const CustomSelect = styled(Select).attrs({
  styles: {
    control: (provided) => ({
      ...provided,
      height: '50px',
      padding: '0.25rem',
      color: 'var(--colors-text)',
      backgroundColor: 'var(--colors-ui-base)',
      borderRadius: 'var(--radii)',
      border: 'none',
      boxShadow: 'var(--shadow)',
    }),
    option: (provided, state) => ({
      ...provided,
      color: 'var(--colors-text)',
      backgroundColor: state.isSelected
        ? 'var(--colors-bg)'
        : 'var(--colors-ui-base)',
      cursor: 'pointer',
    }),
  },
})`
  width: 200px;
  font-family: var(--family);
  font-size: var(--fs-sm);
  border-radius: var(--radii);
  border: none;

  & > * {
    box-shadow: var(--shadow);
  }

  & input {
    padding-left: 0.25rem;
  }

  & * {
    color: var(--colors-text) !important;
  }

  & > div[id] {
    background-color: var(--colors-ui-base);
  }
`;
