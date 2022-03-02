import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FiAward, FiClipboard, FiLogOut, FiUsers,
} from 'react-icons/fi';

import {
  Container, NavContainer, Button, LogOutButton,
} from './styles';

export const NavBar: React.FC = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    await fetch('/api/auth/signOut', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    router.push('/');
  };

  return (
    <Container>
      <NavContainer>
        <Button>
          <Link href="/interno/dashboard/listaPessoas">
            <FiUsers />
          </Link>
        </Button>
        <Button>
          <Link href="/interno/dashboard/melhoresContribuintes">
            <FiAward />
          </Link>
        </Button>
        <Button>
          <Link href="/interno/dashboard/pedidosColetas">
            <FiClipboard />
          </Link>
        </Button>
      </NavContainer>

      <LogOutButton onClick={handleLogOut}>
        <FiLogOut />
      </LogOutButton>
    </Container>
  );
};
