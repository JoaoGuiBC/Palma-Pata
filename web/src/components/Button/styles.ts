import styled from 'styled-components';

interface ButtonProps {
  colorScheme: 'green' | 'red'
}

export const Container = styled.button<ButtonProps>`
  height: 3rem;
  padding: 0 1rem;

  color: ${({ theme }) => theme.colors.shape};
  background: ${({ theme, colorScheme }) => (colorScheme === 'red'
    ? theme.colors.attention
    : theme.colors.main)};
  border: 2px solid ${({ theme, colorScheme }) => (colorScheme === 'red'
    ? theme.colors.attention
    : theme.colors.main)};

  border-radius: 0px 0px 48px 0px;
  box-shadow: 2px 4px 5px 2px rgba(0, 0, 0, 0.25);

  font-family: 'Roboto';
  font-weight: bold;
  font-size: 1rem;

  transition: color 0.2s, background 0.2s;

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
