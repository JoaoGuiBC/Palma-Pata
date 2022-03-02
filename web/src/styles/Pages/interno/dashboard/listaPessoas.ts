import styled from 'styled-components';

export const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  padding: 4rem 0;
  overflow: auto;
`;

export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 1rem;
  width: 65rem;
`;

export const TableHead = styled.thead`
  text-align: left;
`;

export const TableBody = styled.tbody``;

export const TableHeadRow = styled.tr`
  & th:first-child {
    padding-left: 1.5rem;
  }
`;

export const TableRow = styled.tr`
  background: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.subject};
  height: 4rem;
  max-height: 4rem;

  & td.adm {
    text-align: center;
  }
  & td:last-child {
    border-bottom-right-radius: 42px;
    padding-right: 1rem;
  }
  & td:first-child {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
    padding-left: 1.5rem;
  }
`;

export const Head = styled.th`
  font-family: Roboto;
  font-weight: normal;
  font-size: 0.75rem;

  color: ${({ theme }) => theme.colors.subject};
`;

export const Data = styled.td`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  height: 4rem;
  max-height: 4rem;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const ButtonContainer = styled.div`
  position: fixed;
  right: 5rem;
  bottom: 2.5rem;
`;
