import { GetServerSideProps } from 'next';

import { NavBar } from '../../../components/NavBar';

import { Container, Content } from '../../../styles/Pages/interno/dashboard/listaPessoas';

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

const ListaPessoas: React.FC<ListaPessoasProps> = ({ user, token }) => {
  console.log(user, token);

  return (
    <Container>
      <NavBar />
      <Content>Olá lista de pessoas</Content>
    </Container>
  );
};

export default ListaPessoas;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { PataEPalmaUser: user, PataEPalmaToken: token } = req.cookies;

  return {
    props: {
      user: JSON.parse(user),
      token,
    },
  };
};
