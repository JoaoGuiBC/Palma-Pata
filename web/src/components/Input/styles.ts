import styled from 'styled-components';

interface InputProps {
  isErrored: boolean,
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0.5rem 0;
`;

export const InputField = styled.input<InputProps>`
  border: none;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 0px 0px 42px 0px;

  height: ${({ isErrored }) => (isErrored ? '2rem' : '3rem')};
  padding: 0 1rem;

  ${({ theme, isErrored }) => (isErrored
    ? (`outline: 1px solid ${theme.colors.attention};`)
    : (
      `&:focus {
        outline: 1px solid ${theme.colors.main};
      }
      &:not(:placeholder-shown) {
        outline: 1px solid ${theme.colors.main};
      }`
    ))}
`;

export const Error = styled.span`
  font-weight: 500;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.attention};
  margin-top: 2px;
`;
