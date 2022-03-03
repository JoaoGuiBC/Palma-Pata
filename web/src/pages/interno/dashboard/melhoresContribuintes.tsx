import { NextLayoutComponentType } from 'next';
import type { ReactElement } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useQuery } from 'react-query';

import Layout from '../../../components/DashboardLayout';
import { api } from '../../../services/api';

import {
  Content,
  Table,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  Head,
  Data,
  LoadingContainer,
} from '../../../styles/Pages/interno/dashboard/melhoresContribuintes';
import theme from '../../../styles/theme';

interface IBestContributorAddress {
  id: string,
  city: string,
  district: string,
  quantity: number,
}

interface IBestContributors {
  username: string,
  quantity: number,
}

interface IContributorsData {
  bestContributorAddress: IBestContributorAddress[],
  bestContributors: IBestContributors[],
}

const MelhoresContribuintes: NextLayoutComponentType = () => {
  const { data, isFetching } = useQuery(
    'listContributors',
    () => api.get<IContributorsData>('/requests/bestContributors'),
    {
      staleTime: 1000 * 60 * 30, // 30 minutes
    },
  );

  return (
    <Content>
      {isFetching ? (
        <LoadingContainer>
          <TailSpin width={70} height={70} color={theme.colors.subject} />
        </LoadingContainer>
      ) : (
        <>
          <Table>
            <caption>Melhores bairros</caption>
            <TableHead>
              <TableHeadRow>
                <Head>CIDADE</Head>
                <Head>BAIRRO</Head>
                <Head>BOLSAS</Head>
              </TableHeadRow>
            </TableHead>
            <TableBody>
              {data?.data.bestContributorAddress.map((address) => (
                <TableRow key={address.id}>
                  <Data>{address.city}</Data>
                  <Data>{address.district}</Data>
                  <Data>{address.quantity}</Data>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Table>
            <caption>Melhores Pessoas</caption>
            <TableHead>
              <TableHeadRow>
                <Head>NOME</Head>
                <Head>BOLSAS</Head>
              </TableHeadRow>
            </TableHead>
            <TableBody>
              {data?.data.bestContributors.map((users) => (
                <TableRow key={users.username}>
                  <Data>{users.username}</Data>
                  <Data>{users.quantity}</Data>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Content>
  );
};

export default MelhoresContribuintes;

MelhoresContribuintes.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
