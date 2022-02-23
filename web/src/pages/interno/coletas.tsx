import Image from 'next/image';
import type { GetServerSideProps } from 'next';

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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { PataEPalmaUser: user } = req.cookies;

  return {
    props: {
      user: JSON.parse(user),
    }, // will be passed to the page component as props
  };
};
