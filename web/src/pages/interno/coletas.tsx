import Image from 'next/image';
import type { GetServerSideProps } from 'next';

import { verifyJWT } from '../../utils/verifyJWT';

interface ColetasProps {
  user: any;
}

const Coletas: React.FC<ColetasProps> = ({ user }) => (
  <div>
    <h1>
      Olá
      {' '}
      {user.username}
    </h1>
    <Image src="/infoTable.svg" width={370} height={530} />
  </div>
);

export default Coletas;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { PataEPalmaToken: token, PataEPalmaUser: user } = req.cookies;
  const secret = process.env.JWT_SECRET;

  if (!token) {
    await fetch('/api/auth/signOut', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const isTokenValid = await verifyJWT(token, secret || '', res);

  if (!isTokenValid) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  if (JSON.parse(user).adm) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: JSON.parse(user),
    }, // will be passed to the page component as props
  };
};
