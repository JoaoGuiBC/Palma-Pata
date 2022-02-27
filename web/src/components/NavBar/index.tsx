import Link from 'next/link';
import {
  FiAward, FiClipboard, FiLogOut, FiUsers,
} from 'react-icons/fi';

import {
  Container, NavContainer, Button, LogOutButton,
} from './styles';

export const NavBar: React.FC = () => (
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

    <LogOutButton>
      <FiLogOut />
    </LogOutButton>
  </Container>
);
