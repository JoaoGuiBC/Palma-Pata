import { GetServerSideProps, NextLayoutComponentType } from 'next';
import type { ReactElement } from 'react';

import Layout from '../../../components/DashboardLayout';

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

const PedidosColetas: NextLayoutComponentType<PedidosColetasProps> = ({ user, token }) => {
  console.log(user, token);

  return (
    <div>Olá pedidos de coletas</div>
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
