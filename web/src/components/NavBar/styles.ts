import { motion } from 'framer-motion';
import styled from 'styled-components';

import theme from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 3.5rem;
  height: 100vh;

  z-index: 10;
`;

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  width: 4.5rem;
  background: ${theme.colors.shape};

  box-shadow: 2px 4px 5px 2px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 42px 0px;
`;

export const Indicator = styled(motion.div)`
  position: absolute;
  width: 4rem;
  height: 4rem;
  background: ${theme.colors.main};

  border-radius: 42px;
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2rem;
  margin-bottom: 2.5rem;
  color: ${theme.colors.text};

  background: transparent;
  border: none;
  z-index: 10;

  &:nth-child(2) {
    margin-top: 2.5rem;
  }
  & svg {
    stroke-width: 1.25px;
  }
`;

export const LogOutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2rem;
  width: 4.5rem;
  height: 4.5rem;

  background: ${theme.colors.attention};
  color: ${theme.colors.shape};

  box-shadow: 2px 4px 5px 2px rgba(0, 0, 0, 0.25);
  border-radius: 42px;
  border: none;

  transition: filter 0.2s;

  &:first-child {
    margin-top: 3rem;
  }
  &:hover {
    filter: brightness(0.8);
  }
  & svg {
    stroke-width: 1.25px;
  }
`;
