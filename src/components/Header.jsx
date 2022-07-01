import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container } from './Container';
import { clearControls } from '../store/controls/controlsActions';
import { ThemeSwitcher } from '../store/features/theme/ThemeSwitcher';

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

export const Header = () => {
  const dispatch = useDispatch();

  const cleanUp = () => dispatch(clearControls());

  return (
    <HeaderEl>
      <Container>
        <Wrapper>
          <Title onClick={cleanUp}>Where is the world?</Title>
          <ThemeSwitcher />
        </Wrapper>
      </Container>
    </HeaderEl>
  );
};
