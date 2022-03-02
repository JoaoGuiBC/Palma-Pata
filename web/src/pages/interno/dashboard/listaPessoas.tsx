import { GetServerSideProps, NextLayoutComponentType } from 'next';
import { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import type { ReactElement } from 'react';

import { api } from '../../../services/api';
import { Button } from '../../../components/Button';
import { Checkbox } from '../../../components/Checkbox';
import { queryClient } from '../../../services/queryClient';
import Layout from '../../../components/DashboardLayout';

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
  ButtonContainer,
} from '../../../styles/Pages/interno/dashboard/listaPessoas';
import theme from '../../../styles/theme';

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

interface ListaPessoasProps {
  user: IUser;
  token: string;
}

const ListaPessoas: NextLayoutComponentType<ListaPessoasProps> = ({ user, token }) => {
  const [isPatching, setIsPatching] = useState(false);

  const { data, isFetching } = useQuery('listUsers', () => api.get<IUser[]>('/users'), {
    staleTime: 1000 * 60 * 10, // minutes
  });

  const handleUpdateCheck = (listedUser: IUser) => {
    if (data?.data) {
      const updatedData = data.data.map((fetchedUser: IUser) => {
        if (fetchedUser.id !== listedUser.id) {
          return fetchedUser;
        }

        const newData = fetchedUser;
        newData.adm = !listedUser.adm;

        return newData;
      });

      queryClient.setQueryData('listUsers', { data: updatedData });
    }
  };

  const handleSaveChange = async () => {
    if (data?.data) {
      setIsPatching(true);

      try {
        api.patch(
          '/users/updatePermission',
          { users: data.data },
          { headers: { authorization: token } },
        ).then(() => {
          toast.success('Permissões atualizadas com sucesso');
          setIsPatching(false);
        });
      } catch (error: any) {
        toast.error(error.message);

        setIsPatching(false);
      }
    }
  };

  return (
    <Content>
      {isFetching ? (
        <LoadingContainer>
          <TailSpin width={70} height={70} color={theme.colors.subject} />
        </LoadingContainer>
      ) : (
        <Table>
          <TableHead>
            <TableHeadRow>
              <Head>NOME</Head>
              <Head>TELEFONE</Head>
              <Head>RUA</Head>
              <Head>NÚMERO</Head>
              <Head>BAIRRO</Head>
              <Head>CIDADE</Head>
              {user.master && <Head>ADM</Head>}
            </TableHeadRow>
          </TableHead>
          <TableBody>
            {data?.data.map((listedUser) => (
              <TableRow key={listedUser.id}>
                <Data>{listedUser.username}</Data>
                <Data>{listedUser.phone_number}</Data>
                <Data>{listedUser.street}</Data>
                <Data>{listedUser.street_number}</Data>
                <Data>{listedUser.district}</Data>
                <Data>{listedUser.city}</Data>
                {user.master && (
                  <Data className="adm">
                    <Checkbox
                      checked={listedUser.adm}
                      onChange={() => handleUpdateCheck(listedUser)}
                    />
                  </Data>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {user.master && (
      <ButtonContainer>
        <Button
          colorScheme="green"
          title="Salvar"
          isLoading={isPatching}
          onClick={handleSaveChange}
          type="button"
        />
      </ButtonContainer>
      )}
    </Content>
  );
};

export default ListaPessoas;

ListaPessoas.getLayout = function getLayout(page: ReactElement) {
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
