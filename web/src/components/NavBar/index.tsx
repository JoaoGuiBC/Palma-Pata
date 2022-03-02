import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  FiAward, FiClipboard, FiLogOut, FiUsers,
} from 'react-icons/fi';

import {
  Container, NavContainer, Indicator, Button, LogOutButton,
} from './styles';

const variants = {
  listaPessoas: { top: '1.5rem' },
  melhoresContribuintes: { top: '6.5rem' },
  pedidosColetas: { top: '11.5rem' },
};

interface IPages {
  page: 'listaPessoas' | 'melhoresContribuintes' | 'pedidosColetas'
}

export const NavBar: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState('listaPessoas');

  const { push } = useRouter();

  const handleLogOut = async () => {
    await fetch('/api/auth/signOut', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    push('/');
  };

  const handleChangePageIndicator = ({ page }: IPages) => {
    setSelectedPage(page);
  };

  return (
    <Container>
      <NavContainer>
        <Indicator
          animate={selectedPage}
          variants={variants}
        />
        <Button onClick={() => handleChangePageIndicator({ page: 'listaPessoas' })}>
          <Link href="/interno/dashboard/listaPessoas">
            <div><FiUsers /></div>
          </Link>
        </Button>
        <Button onClick={() => handleChangePageIndicator({ page: 'melhoresContribuintes' })}>
          <Link href="/interno/dashboard/melhoresContribuintes">
            <div><FiAward /></div>
          </Link>
        </Button>
        <Button onClick={() => handleChangePageIndicator({ page: 'pedidosColetas' })}>
          <Link href="/interno/dashboard/pedidosColetas">
            <div><FiClipboard /></div>
          </Link>
        </Button>
      </NavContainer>

      <LogOutButton onClick={handleLogOut} type="button">
        <FiLogOut />
      </LogOutButton>
    </Container>
  );
};
