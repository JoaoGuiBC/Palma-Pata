import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 5rem;

  justify-content: center;
  align-items: flex-start;
  
  height: 100%;
  padding: 4rem 0;
  overflow: auto;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
