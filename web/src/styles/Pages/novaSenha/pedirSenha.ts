import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  gap: 1.5rem;
`;

export const Title = styled.strong``;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 25rem;
  height: fit-content;
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

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
`;

export const ReturnButton = styled.span`
  display: flex;
  gap: 0.25rem;

  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: none;

  filter: drop-shadow(2px 5px 6px rgba(0, 0, 0, 0.55));
  transition: opacity 0.2s;

  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;
