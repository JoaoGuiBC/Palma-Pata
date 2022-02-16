import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;

  width: 25rem;
  padding: 0 2rem 1rem;
  border-radius: 0px 0px 42px 0px;
  margin-top: -5rem;

  box-shadow: 2px 4px 5px 2px rgba(0, 0, 0, 0.25);
  background: ${({ theme }) => theme.colors.shape};
`;

export const SectionTitle = styled.span`
  font-weight: 300;
  font-size: 0.75rem;
  line-height: 14px;

  margin-top: 1rem;
`;

export const Actions = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 4rem;

  position: absolute;
  bottom: 1rem;
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
