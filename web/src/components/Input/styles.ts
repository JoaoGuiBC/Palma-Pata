import styled from 'styled-components';

interface InputProps {
  isErrored: boolean,
  isPassword: boolean,
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0.5rem 0;
`;

export const InputContainer = styled.div`
  display: flex;
  position: relative;
`;

export const ShowPasswordButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  
  border: none;
  border-left: 1px solid ${({ theme }) => theme.colors.subject};
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  
  height: 100%;
  border-radius: 0px 0px 42px 0px;
  padding: 0 1rem 0 0.75rem;

  position: absolute;
  right: 0;
`;

export const InputField = styled.input<InputProps>`
  flex: 1;
  width: 1rem;

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
