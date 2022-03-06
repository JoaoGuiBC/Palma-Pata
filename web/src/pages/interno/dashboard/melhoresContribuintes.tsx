import { GetServerSideProps, NextLayoutComponentType } from 'next';
import { ReactElement, useEffect } from 'react';
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

interface IUser {
  adm: boolean
  city: string
  district: string
  email: string
  id: string
  master: boolean
  phone_number: string
  street: string
  street_number: number
  username: string
}

interface MelhoresContribuintesProps {
  user: IUser;
  token: string;
}

const MelhoresContribuintes: NextLayoutComponentType<MelhoresContribuintesProps> = ({
  token,
  user,
}) => {
  const { data, isFetching } = useQuery(
    'listContributors',
    () => api.get<IContributorsData>('/requests/bestContributors'),
    {
      staleTime: 1000 * 60 * 30, // 30 minutes
    },
  );

  useEffect(() => {
    api.post('/sessions/revalidate', {}, {
      headers: { authorization: token },
    }).then((response) => {
      token = response.data;

      fetch('/api/auth/signIn', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, user: JSON.stringify(user) }),
      });
    });
  });

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
                <TableRow key={`${users.username}-${users.quantity}`}>
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { PataEPalmaUser: user, PataEPalmaToken: token } = req.cookies;

  return {
    props: {
      user: JSON.parse(user),
      token,
    },
  };
};
