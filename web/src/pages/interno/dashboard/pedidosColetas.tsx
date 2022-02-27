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

interface PedidosColetasProps {
  user: IUser;
  token: string;
}

const PedidosColetas: React.FC<PedidosColetasProps> = ({ user, token }) => {
  console.log(user, token);

  return (
    <div>
      <NavBar />
      <div>Olá pedidos de coletas</div>
    </div>
  );
};

export default PedidosColetas;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { PataEPalmaUser: user, PataEPalmaToken: token } = req.cookies;

  return {
    props: {
      user: JSON.parse(user),
      token,
    },
  };
};
