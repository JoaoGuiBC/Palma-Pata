import { GetServerSideProps, NextLayoutComponentType } from 'next';
import { ReactElement, useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import Layout from '../../../components/DashboardLayout';
import { RequestCard } from '../../../components/RequestCard';

import { api } from '../../../services/api';
import { queryClient } from '../../../services/queryClient';

import {
  Container,
  LoadingContainer,
} from '../../../styles/Pages/interno/dashboard/pedidosColetas';
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

interface PedidosColetasProps {
  user: IUser;
  token: string;
}

interface IRequest {
  id: string,
  username: string,
  phone_number: string,
  quantity: number,
  street: string,
  street_number: number,
  district: string,
  city: string,
}

const PedidosColetas: NextLayoutComponentType<PedidosColetasProps> = ({ token, user }) => {
  const [numberOfRequests, setNumberOfRequests] = useState(0);
  const { data, isFetching } = useQuery(
    'listRequests',
    () => api.get<IRequest[]>('/requests'),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
      refetchInterval: 1000 * 60 * 20, // 20 minutes
      refetchIntervalInBackground: true,

      onSuccess: (response) => {
        if (response.data.length > numberOfRequests) {
          new Notification('NOVO PEDIDO DE COLETA', {
            body: `Pedido feito por: ${response.data[0].username}`,
          });
        }
        setNumberOfRequests(response.data.length);
      },
    },
  );

  const handleCollect = async (request_id: string) => {
    try {
      await api.put(
        '/requests/complete',
        { request_id },
        { headers: { authorization: token } },
      );

      const updatedData = data?.data.filter((request) => request.id !== request_id);

      queryClient.setQueryData('listRequests', { data: updatedData });

      toast.success('Pedido coletado');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  });

  return (
    <Container>
      {isFetching ? (
        <LoadingContainer>
          <TailSpin width={70} height={70} color={theme.colors.subject} />
        </LoadingContainer>
      ) : (
        data?.data.map((request) => (
          <RequestCard
            key={request.id}
            id={request.id}
            username={request.username}
            phone_number={request.phone_number}
            quantity={request.quantity}
            street={request.street}
            street_number={request.street_number}
            district={request.district}
            city={request.city}
            handleCollect={handleCollect}
          />
        ))
      )}
    </Container>
  );
};

export default PedidosColetas;

PedidosColetas.getLayout = function getLayout(page: ReactElement) {
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
