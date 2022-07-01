import { IoMoon, IoMoonOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { useTheme } from './use-theme';

const Switcher = styled.div`
  font-size: var(--fs-sm);
  color: var(--colors-text);
  text-transform: capitalize;
  cursor: pointer;
`;

export const ThemeSwitcher = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <Switcher onClick={toggleTheme}>
      {theme === 'light' ? (
        <IoMoonOutline size="14px" />
      ) : (
        <IoMoon size="14px" />
      )}
      <span style={{ marginLeft: '0.75rem' }}>{theme} Theme</span>
    </Switcher>
  );
};
