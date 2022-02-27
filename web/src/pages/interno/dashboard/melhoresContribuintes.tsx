import { GetServerSideProps } from 'next';

import { NavBar } from '../../../components/NavBar';

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

const MelhoresContribuintes: React.FC<MelhoresContribuintesProps> = ({ user, token }) => {
  console.log(user, token);

  return (
    <div>
      <NavBar />
      <div>Olá melhores contribuintes</div>
    </div>
  );
};

export default MelhoresContribuintes;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { PataEPalmaUser: user, PataEPalmaToken: token } = req.cookies;

  return {
    props: {
      user: JSON.parse(user),
      token,
    },
  };
};
