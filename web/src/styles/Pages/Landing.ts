import styled from 'styled-components';

interface BackgroundProps {
  selectedForm: 'signUp' | 'signIn';
}

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
`;

export const Logo = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Background = styled.div<BackgroundProps>`
  position: fixed;
  width: 3000px;
  height: 3000px;
  right: -2100px;
  top: 0px;

  transform: rotate(30deg);
  z-index: -1;

  transition: all 0.2s;

  background: ${({ theme, selectedForm }) => (selectedForm === 'signIn'
    ? theme.colors.attention
    : theme.colors.main)};
`;
