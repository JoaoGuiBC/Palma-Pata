import styled from 'styled-components';

interface ButtonProps {
  colorScheme: 'green' | 'red';
  isLoading: boolean;
  hideShadow: boolean;
}

export const Container = styled.button<ButtonProps>`
  height: 3rem;
  padding: 0 1.5rem 0 1rem;

  color: ${({ theme }) => theme.colors.shape};
  background: ${({ theme, colorScheme }) => (colorScheme === 'red'
    ? theme.colors.attention
    : theme.colors.main)};
  border: 2px solid ${({ theme, colorScheme }) => (colorScheme === 'red'
    ? theme.colors.attention
    : theme.colors.main)};

  border-radius: 0px 0px 48px 0px;
  ${({ hideShadow }) => !hideShadow && 'box-shadow: 2px 4px 5px 2px rgba(0, 0, 0, 0.25);'};

  font-family: 'Roboto';
  font-weight: bold;
  font-size: 1rem;

  transition: color 0.2s, background 0.2s;
  user-select: none;

  ${({ isLoading }) => isLoading && `
  pointer-events: none;
  padding-right: 1.5rem;
  `}

  &:hover {
    background: ${({ theme, colorScheme }) => (colorScheme === 'red'
    ? theme.colors.attention_soft
    : theme.colors.main_soft)};
    color: ${({ theme, colorScheme }) => (colorScheme === 'red'
    ? theme.colors.attention
    : theme.colors.main)};
  }
  &:active {
    filter: brightness(90%);
  }
`;
