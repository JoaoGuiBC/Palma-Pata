import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  width: 17.5rem;
  height: 19.5rem;
  padding: 0 2rem;

  background: ${({ theme }) => theme.colors.shape};
  border-radius: 0 0 42px 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 2.5rem;
`;

export const Title = styled.strong``;

export const Data = styled.span`
  line-height: 1.5rem;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`;
