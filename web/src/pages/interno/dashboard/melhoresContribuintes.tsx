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

interface MelhoresContribuintesProps {
  user: IUser;
  token: string;
}

const MelhoresContribuintes: NextLayoutComponentType<MelhoresContribuintesProps> = ({
  user,
  token,
}) => {
  console.log(user, token);

  return (
    <div>Olá melhores contribuintes</div>
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
