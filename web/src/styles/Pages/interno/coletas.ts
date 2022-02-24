import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;

  align-items: center;
`;

export const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const Background = styled.div`
  position: fixed;
  width: 3000px;
  height: 3000px;
  left: -2100px;
  top: 0px;

  transform: rotate(-30deg);
  z-index: -1;

  background: #F34B60;
  border-radius: 0px;
`;

export const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;

  width: 25rem;
  padding: 0 2rem 1rem;
  border-radius: 0px 0px 42px 0px;

  box-shadow: 2px 4px 5px 2px rgba(0, 0, 0, 0.25);
  background: ${({ theme }) => theme.colors.shape};
`;

export const SectionTitle = styled.span`
  font-weight: 300;
  font-size: 0.75rem;
  line-height: 14px;

  margin-top: 1rem;
`;

export const DualInputs = styled.div`
  display: flex;
  gap: 1rem;

  & > div:first-child {
    width: 30%;
  }
  & > div:last-child {
    flex: 1;
  }
`;

export const Actions = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 4rem;
`;

export const LogInButton = styled.button`
  display: flex;
  gap: 0.25rem;

  color: ${({ theme }) => theme.colors.shape};
  background: transparent;
  border: none;

  filter: drop-shadow(2px 5px 6px rgba(0, 0, 0, 0.55));
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.5;
  }
`;

export const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
