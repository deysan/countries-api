import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoMoon, IoMoonOutline } from 'react-icons/io5';

import { Container } from './Container';

const HeaderEl = styled.header`
  box-shadow: var(--shadow);
  background-color: (--color-ui-base);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
`;

const Title = styled.a.attrs({
  href: '/',
})`
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
  color: var(--colors-text);
  text-decoration: none;
`;

const Switcher = styled.div`
  font-size: var(--fs-sm);
  color: var(--colors-text);
  text-transform: capitalize;
  cursor: pointer;
`;

export const Header = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <HeaderEl>
      <Container>
        <Wrapper>
          <Title>Where is the world?</Title>
          <Switcher onClick={toggleTheme}>
            {theme === 'light' ? (
              <IoMoonOutline size="14px" />
            ) : (
              <IoMoon size="14px" />
            )}
            <span style={{ marginLeft: '0.75rem' }}>{theme} Theme</span>
          </Switcher>
        </Wrapper>
      </Container>
    </HeaderEl>
  );
};
