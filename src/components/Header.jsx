import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoMoon, IoMoonOutline } from 'react-icons/io5';

import { Container } from './Container';
import { setTheme } from '../store/theme/themeActions';
import { clearControls } from '../store/controls/controlsActions';

const HeaderEl = styled.header`
  background-color: (--color-ui-base);
  box-shadow: var(--shadow);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
`;

const Title = styled(Link).attrs({
  to: '/',
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
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const cleanUp = () => dispatch(clearControls());

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <HeaderEl>
      <Container>
        <Wrapper>
          <Title onClick={cleanUp}>Where is the world?</Title>
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
