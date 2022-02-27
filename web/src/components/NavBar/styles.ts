import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 3.5rem;
  height: 100vh;
`;

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 4.5rem;
  background: ${({ theme }) => theme.colors.shape};

  box-shadow: 2px 4px 5px 2px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 42px 0px;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2rem;
  margin-bottom: 2.5rem;
  color: ${({ theme }) => theme.colors.text};

  background: transparent;
  border: none;

  &:first-child {
    margin-top: 2.5rem;
  }
`;

export const LogOutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2rem;
  width: 4.5rem;
  height: 4.5rem;

  background: #F34B60;
  color: ${({ theme }) => theme.colors.shape};

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
`;
